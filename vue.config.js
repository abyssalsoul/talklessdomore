// vue.config.js
module.exports = {
    configureWebpack: {
        devtool: 'source-map'
      },
    chainWebpack: (config) => {
        config.module
        .rule("frag")
        .test(/\.(glsl|frag|vert)$/)
        .use("webpack-glsl-loader")
        .loader("webpack-glsl-loader")
        .end();
       config.module
       .rule("img")
       .test(/\.(png|jpg|jpeg|gif|svg)$/)
       .use("url-loader")
       .loader("url-loader")
      .end();
     
   }
  };