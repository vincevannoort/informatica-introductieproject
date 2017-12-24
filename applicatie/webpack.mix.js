const mix = require('laravel-mix')

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

mix
  .js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/scss/single-page-application.scss', 'public/css')
  .sass('resources/assets/scss/promotion.scss', 'public/css')
  .setPublicPath('public')
  .copyDirectory('resources/assets/images', 'public/images')
  .browserSync('localhost:3333')
  .options({ extractVueStyles: true })
  .disableSuccessNotifications();