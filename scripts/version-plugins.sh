NEW_VERSION=$1

for file in $(find ./plugins -maxdepth 2 -name package.json); do
    echo $file
    jq --arg version "$NEW_VERSION" '.dependencies."@antoinedao/backstage-plugin-runbook-common" = $version' $file > temp.json && mv temp.json $file
done