select version_type in "patch" "minor" "major"; do
    read -p "Creating commit and tag for a $version_type release. Press [Enter].";
    version_with_v=`npm version $version_type | head -n 1`
    version=`echo $version_with_v | cut -b 2-`
    break;
done

read -p "Ready to publish tsdux@$version. [Enter] to continue"
cd dist/
npm publish
cd ../
read -p "Ready to push $branch to upstream. [Enter] to continue"
git push upstream $branch
git push upstream --tags
