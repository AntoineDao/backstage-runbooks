NEW_VERSION=$1

yarn --cwd plugins/catalog-backend-module-runbook publish --new-version $NEW_VERSION
yarn --cwd plugins/runbook publish --new-version $NEW_VERSION
yarn --cwd plugins/runbook-common publish --new-version $NEW_VERSION
