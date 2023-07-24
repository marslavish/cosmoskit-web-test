const fs = require("fs");
const path = require("path");

const outputDirRelative = "../public/vendor/";
const outputDir = path.resolve(__dirname, outputDirRelative);
const assets = ["../node_modules/@interchain-ui/react/dist/interchain-ui-kit-react.cjs.css"];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

assets.forEach((asset_path) => {
  const filename = path.basename(asset_path);
  fs.createReadStream(path.resolve(__dirname, asset_path)).pipe(
    fs.createWriteStream(path.resolve(__dirname, outputDirRelative, filename))
  );
});
