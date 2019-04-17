#!/usr/bin/env bash

echo "  ___         _                                             _          _     "
echo " | _ \  ___  | |  ___   __ _   ___  ___     ___  __   _ _  (_)  _ __  | |_   "
echo " |   / / -_) | | / -_) / _\ | (_-< / -_)   (_-< / _| | '_| | | | '_ \ |  _|  "
echo " |_|_\ \___| |_| \___| \__,_| /__/ \___|   /__/ \__| |_|   |_| | .__/  \__|  "
echo "                                                               |_|           "


# configure git
git remote set-url origin https://${GITLAB_CI_USER}:${GITLAB_CI_TOKEN}@git.manomano.tech/core-utils/js-tools.git
git config user.email "$GIT_AUTHOR_EMAIL"
git config user.name "$GIT_AUTHOR_NAME"

# get last master branch and rebase
# TODO add master instead of branch_name
git checkout 140-sr-rebase
git pull

# bump every sub-packages to a new version (following conventional commits) and add a git tag needed by lerna-publish (next job)
npm run lerna-version

# publish every sub-packages that need to be published (checking last tag provided by lerna-version)
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}'>.npmrc
npm run publish

# update yarn.lock in every sub-packages and main packages with the new version
rm packages/*/yarn.lock yarn.lock
yarn install-lerna
git add packages/*/yarn.lock yarn.lock
git commit -m "chore(release):[skip ci] upgrade yarn.lock"

# bump version in the main package, and add one tag
yarn standard-version
git push
