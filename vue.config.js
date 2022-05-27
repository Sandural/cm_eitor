const argv = require("yargs").argv;
const BUILD_ENV = argv.build_env || "dev";

module.exports = {
  lintOnSave: false,
  css: { extract: false },
  chainWebpack: config => {
    // When the argument `--target` is 'lib'
    config.plugin("define").tap(args => {
      args[0]["_env"] = JSON.stringify(process.env.NODE_ENV);
      return args;
    });
  },
};
