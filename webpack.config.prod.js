/**
 * Configurations for production environment
 */
exports.prodConfig = ({ OUTPUT_DIR } = {}) => ({
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash].js',
    path: OUTPUT_DIR,
    publicPath: '/',
  },
});
