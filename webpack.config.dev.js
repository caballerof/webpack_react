/**
 * Configurations for development environment
 */
exports.devConfig = ({ OUTPUT_DIR } = {}) => ({
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: 'js/[name].[hash].js',
    path: OUTPUT_DIR,
  },
  devServer: {
    contentBase: OUTPUT_DIR,
    compress: true,
    port: 9000,
    disableHostCheck: false,
    open: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});
