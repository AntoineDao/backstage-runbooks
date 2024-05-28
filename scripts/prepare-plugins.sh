NEW_VERSION=$1
PACKAGES=("@antoinedao/backstage-plugin-runbook-common" "@antoinedao/backstage-plugin-runbook" "@antoinedao/backstage-plugin-catalog-backend-module-runbook")  # Add your package names here

yarn tsc:full

yarn backstage-cli repo build --all

for file in $(find ./plugins -maxdepth 2 -name package.json); do
    echo $file

    for package in "${PACKAGES[@]}"; do
        if jq -e --arg package $package '.dependencies | has($package)' $file > /dev/null; then
            echo "Found $package in $file and will update to $NEW_VERSION"
            jq --arg new_version $NEW_VERSION --arg package $package '.dependencies[$package] = $new_version' $file > temp.json && mv temp.json $file
        fi
    done

    # The following is required because yarn publish does not respect the "publishConfig" field in package.json
    # use jq to set "main" to the value in "publishConfig.main" and "types" to the value in "publishConfig.types
    jq '.main = .publishConfig.main' $file > temp.json && mv temp.json $file
    jq '.types = .publishConfig.types' $file > temp.json && mv temp.json $file

done