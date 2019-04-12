# Inspired by https://gitlab.com/antora/antora/commit/743289ea65f8654cbfa6f898aa2bc66fed383ebb

#!/bin/sh

# configure git to push changes
git remote set-url origin https://${GITLAB_CI_USER}:${GITLAB_CI_TOKEN}@git.manomano.tech/core-utils/js-tools.git
git config user.email "$GIT_AUTHOR_EMAIL"
git config user.name "$GIT_AUTHOR_NAME"
git remote set-url origin "git@git.manomano.tech:core-utils/js-tools.git"
git config user.email "$RELEASE_GIT_EMAIL"
git config user.name "$RELEASE_GIT_NAME"

# configure npm credentials to publish packages
for package in packages/*; do echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > $package/.npmrc; done

# release!
lerna publish --exact --force-publish=* --yes

# nuke npm credentials
for package in packages/*; do unlink $package/.npmrc; done

# kill the ssh-agent
eval $(ssh-agent -k) >/dev/null
