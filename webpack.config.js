const cssLoaders = [parts.tailwind()];
const commonConfig = merge([
  parts.extractCSS({ loaders: cssLoaders }),
]);

const productionConfig = merge([parts.eliminateUnusedCSS()]);