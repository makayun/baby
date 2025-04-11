const svgFiles = require.context('./assets', false, /\.svg$/);
const ddsFiles = require.context('./assets', false, /\.dds$/);
const pngFiles = require.context('./assets', false, /\.png$/);

export const svgAssets: { [key: string]: string } = {};
svgFiles.keys().forEach((key) => {
  const name = key.replace('./', '').replace('.svg', '');
  svgAssets[name] = svgFiles(key);
});

export const ddsAssets: { [key: string]: string } = {};
ddsFiles.keys().forEach((key) => {
  const name = key.replace('./', '').replace('.dds', '');
  ddsAssets[name] = ddsFiles(key);
});

export const pngAssets: { [key: string]: string } = {};
pngFiles.keys().forEach((key) => {
  const name = key.replace('./', '').replace('.png', '');
  pngAssets[name] = pngFiles(key);
});

// console.log(svgAssets);  // { "play-button": "assets/play-button.svg", "logo": "assets/logo.svg" }
// console.log(ddsAssets);  // { "sky1": "assets/sky1.dds" }
