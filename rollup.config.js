const riot = require("rollup-plugin-riot");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve").default;

const registerPreprocessor = require("@riotjs/compiler").registerPreprocessor;
const sass = require("sass");

registerPreprocessor('css', 'sass', function(code, { options }) {
  const { css } = sass.renderSync({
    data: code
  })

  return {
    code: css.toString(),
    map: null
  }
})

const globals = {
    "@riot-material/before-focus-listener": "riotMaterial.beforeFocusListener",
    "@riot-material/ripple": "riotMaterial.ripple",
    "@riot-material/rm-icon": "riotMaterial.components.icon",
    "riot": "riot"
};
const external = Object.keys(globals);

export default [
    {
        input: "src/index.riot",
        external,
        plugins: [
            nodeResolve(),
            commonjs(),
            riot()
        ],
        output: [
            {
                file: "dist/index.es.js",
                format: "es"
            },
            {
                name: "riotMaterial.components.button",
                file: "dist/index.js",
                format: "umd",
                globals
            }
        ]
    },
    {
        input: "src/index.riot",
        plugins: [
            nodeResolve(),
            commonjs(),
            riot()
        ],
        output: [
            {
                name: "riotMaterial.components.button",
                file: "dist/index+libs.js",
                format: "umd"
            }
        ]
    }
];