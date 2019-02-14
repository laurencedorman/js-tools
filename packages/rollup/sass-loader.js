const path = require('path');
const pify = require('pify');
const resolve = require('resolve');
const PQueue = require('p-queue');
const { alias } = require('@manomano/project-settings');

// This queue makes sure node-sass leaves one thread available for executing fs tasks
// See: https://github.com/sass/node-sass/issues/857
const threadPoolSize = process.env.UV_THREADPOOL_SIZE || 4;
const workQueue = new PQueue({ concurrency: threadPoolSize - 1 });

const getUrlOfPartial = url => {
  const parsedUrl = path.parse(url);
  return `${parsedUrl.dir}${path.sep}_${parsedUrl.base}`;
};

const resolvePromise = pify(resolve);

module.exports = {
  name: 'sass',
  test: /\.s[ac]ss$/,
  process({ code }) {
    return new Promise((resolve, reject) => {
      const sass = require('node-sass');
      const render = pify(sass.render.bind(sass));
      return workQueue.add(() =>
        render({
          ...this.options,
          file: this.id,
          data: code,
          indentedSyntax: /\.sass$/.test(this.id),
          sourceMap: this.sourceMap,
          importer: [
            (url, importer, done) => {
              if (/^[a-z0-9]/i.test(url)) {
                let newUrl = url;
                let aliases = Object.entries(alias);
                for (const [key, value] of aliases) {
                  if (newUrl.startsWith(key)) {
                    newUrl = newUrl.replace(key, value);
                  }
                }

                return done({ file: newUrl });
              }

              const moduleUrl = url.slice(1);
              const partialUrl = getUrlOfPartial(moduleUrl);

              const options = {
                basedir: path.dirname(importer),
                extensions: ['.scss', '.sass', '.css'],
              };
              const finishImport = id => {
                done({
                  // Do not add `.css` extension in order to inline the file
                  file: id.endsWith('.css') ? id.replace(/\.css$/, '') : id,
                });
              };

              const next = () => {
                // Catch all resolving errors, return the original file and pass responsibility back to other custom importers
                done({ file: url });
              };

              // Give precedence to importing a partial
              resolvePromise(partialUrl, options)
                .then(finishImport)
                .catch(err => {
                  if (
                    err.code === 'MODULE_NOT_FOUND' ||
                    err.code === 'ENOENT'
                  ) {
                    resolvePromise(moduleUrl, options)
                      .then(finishImport)
                      .catch(next);
                  } else {
                    next();
                  }
                });
            },
          ].concat(this.options.importer || []),
        })
          .then(res => {
            for (const file of res.stats.includedFiles) {
              this.dependencies.add(file);
            }
            resolve({
              code: res.css.toString(),
              map: res.map && res.map.toString(),
            });
          })
          .catch(reject)
      );
    });
  },
};
