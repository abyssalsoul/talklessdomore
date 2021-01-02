// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        config.module
        .rule("frag")
        .test(/\.(glsl|frag|vert)$/)
        .use("webpack-glsl-loader")
        .loader("webpack-glsl-loader")
        .end()
    },
  };
  