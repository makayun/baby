// Dynamically import all .svg files from the 'assets' folder
const svgFiles = require.context('./assets', false, /\.svg$/);
// Dynamically import all .dds files from the 'assets' folder
const ddsFiles = require.context('./assets', false, /\.dds$/);

// Create an object (associative map) for SVG assets
export const svgAssets: { [key: string]: string } = {};
svgFiles.keys().forEach((key) => {
  // Use the file name as the key (remove './' and the extension)
  const name = key.replace('./', '').replace('.svg', '');
  svgAssets[name] = svgFiles(key);
});

// Create an object (associative map) for DDS assets
export const ddsAssets: { [key: string]: string } = {};
ddsFiles.keys().forEach((key) => {
  // Use the file name as the key (remove './' and the extension)
  const name = key.replace('./', '').replace('.dds', '');
  ddsAssets[name] = ddsFiles(key);
});

// Now, you can access these assets using the keys (names)
// console.log(svgAssets);  // { "play-button": "assets/play-button.svg", "logo": "assets/logo.svg" }
// console.log(ddsAssets);  // { "sky1": "assets/sky1.dds" }
