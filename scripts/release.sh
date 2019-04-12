# configure git to push changes
git remote set-url origin https://${GITLAB_CI_USER}:${GITLAB_CI_TOKEN}@git.manomano.tech/core-utils/js-tools.git
git config user.email "$GIT_AUTHOR_EMAIL"
git config user.name "$GIT_AUTHOR_NAME"

# checkout last master version
# TODO use master
git checkout 140-sr-rebase
git pull

# lerna will dumb version without committing
npm run version

# upgrade yarn.lock
npm run install
git add .
git commit -m "chore(release): [skip ci] %v"

# push
git push

# add tag
# TODO

# push tag
# TODO

# publish on npm
npm run publish --dry-run

# configure npm credentials to publish packages
#for package in packages/*; do echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $package/.npmrc; done

# release!
#lerna publish --exact --force-publish=* --yes
