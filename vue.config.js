const { defineConfig } = require("@vue/cli-service")

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rules.delete("markdown")
    config.module.rules.delete("md-with-frontmatter")

    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end()
  },
})
