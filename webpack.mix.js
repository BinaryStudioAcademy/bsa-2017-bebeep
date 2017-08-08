let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/app.jsx', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .sourceMaps();

if (mix.inProduction()) {
    mix.version();
}

/*.webpackConfig({
    resolve: {
        modules: [
            path.resolve(__dirname, 'vendor/laravel/spark/resources/assets/js')
        ]
    }
});*/
