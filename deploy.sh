#!/bin/bash

# Exit script immediately if a command exits with a non-zero status.
set -e

# Build the Vue application for production.
npm run build

# Navigate into the distribution directory.
cd dist

# If the repository is a user/organization page
# git init
# git remote add origin https://github.com/<USERNAME>/<USERNAME>.github.io
# git checkout -b main

# If the repository is a project page
git init
git remote add origin git@github.com:salemango/character-trait-builder.git
git checkout -b gh-pages

# Copy the contents of the distribution directory to the root of the Git repository
cp -r * ../

cd ../

# Add all changes, commit, and push to the remote repository.
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages -f