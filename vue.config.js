// vue.config.js
module.exports = {
    chainWebpack: (config) => {
        config.module
        .rule("frag")
        .test(/\.frag$/)
        .use("webpack-glsl-loader")
        .loader("webpack-glsl-loader")
        .end()
        config.module
        .rule("glsl")
        .test(/\.vert$/)
        .use("webpack-glsl-loader")
        .loader("webpack-glsl-loader")
        .end()
        config.module
        .rule("glsl")
        .test(/\.glsl$/)
        .use("webpack-glsl-loader")
        .loader("webpack-glsl-loader")
        .end()
    },
  };
  