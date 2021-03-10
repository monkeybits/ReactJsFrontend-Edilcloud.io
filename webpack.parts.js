const path = require("path");
const glob = require("glob");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");

const ALL_FILES = glob.sync(path.join(__dirname, "src/*.js"));

exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
      postcssOptions: { plugins: [require("tailwindcss")()] },
    },
});

exports.eliminateUnusedCSS = () => ({
    plugins: [
        new PurgeCSSPlugin({
        paths: ALL_FILES, // Consider extracting as a parameter
        extractors: [
            {
            extractor: (content) =>
                content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
            extensions: ["html"],
            },
        ],
        }),
    ],
});