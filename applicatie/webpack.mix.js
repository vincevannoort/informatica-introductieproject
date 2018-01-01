const mix = require('laravel-mix')
const webpack = require('webpack')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

if (process.env.NODE_ENV === 'development') {
  mix.webpackConfig({
    plugins: [
      new webpack.LoaderOptionsPlugin({options: {eslint: {configFile: path.join(__dirname, '.eslintrc')}}})
    ],
    module: {
      rules: [{
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{loader: 'eslint-loader'}]
      }]
    }
  })
}

mix
  .js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/scss/single-page-application.scss', 'public/css')
  .sass('resources/assets/scss/promotion.scss', 'public/css')
  .setPublicPath('public')
  .copyDirectory('resources/assets/images', 'public/images')
  .browserSync('localhost:3333')
  .disableSuccessNotifications()
