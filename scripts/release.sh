# Inspired by https://gitlab.com/antora/antora/commit/743289ea65f8654cbfa6f898aa2bc66fed383ebb

#!/bin/sh

# Package (aka module) release script.
# Refer to ../releasing.adoc for details about how this script works.

#if [ -z $RELEASE_BRANCH ]; then RELEASE_BRANCH=master; fi

# don't run if this branch is behind the branch from which we're releasing
#if [ "$(git merge-base --fork-point $RELEASE_BRANCH $CI_COMMIT_SHA)" != "$(git rev-parse $RELEASE_BRANCH)" ]; then
#  echo $CI_COMMIT_REF_NAME is behind $RELEASE_BRANCH. This could indicate this release was already published. Aborting.
#  exit 0
#fi

# set up SSH auth using ssh-agent
mkdir -p -m 700 $HOME/.ssh
ssh-keygen -F gitlab.com >/dev/null 2>&1 || ssh-keyscan -H -t rsa gitlab.com >> $HOME/.ssh/known_hosts 2>/dev/null
eval $(ssh-agent -s) >/dev/null
echo -n "$RELEASE_SSH_PRIV_KEY" | ssh-add -

# clone the branch from which we're releasing and switch to it
#git branch -f $RELEASE_BRANCH origin/$RELEASE_BRANCH
#git clone -b $RELEASE_BRANCH --no-local . build/$CI_PROJECT_NAME
#cd build/$CI_PROJECT_NAME

# configure git to push changes
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
