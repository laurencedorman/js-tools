# configure git to push changes
git remote set-url origin https://${GITLAB_CI_USER}:${GITLAB_CI_TOKEN}@git.manomano.tech/core-utils/js-tools.git
git config user.email "$GIT_AUTHOR_EMAIL"
git config user.name "$GIT_AUTHOR_NAME"


# configure npm credentials to publish packages
for package in packages/*; do echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $package/.npmrc; done

# release!
lerna publish --exact --force-publish=* --yes
