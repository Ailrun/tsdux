npm run lint || exit 0
npm run test-coverage || exit 0

select version_type in "patch" "minor" "major"; do
    read -p "Creating commit and tag for a $version_type release. Press [Enter].";
    version_with_v=`npm version $version_type | head -n 1`
    version=`echo $version_with_v | cut -b 2-`
    break;
done

npm run packaging
read -p "Ready to publish tsdux@$version. [Enter] to continue"
cd dist/
npm publish
cd ../
read -p "Ready to push to upstream. [Enter] to continue"
git push Ailrun master
git push Ailrun --tags
