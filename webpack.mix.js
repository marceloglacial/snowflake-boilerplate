const mix = require('laravel-mix');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

require('laravel-mix-handlebars');

mix
  .js('src/app.js', 'js')
  .sass('src/styles/styles.scss', 'css', {
    processUrls: false,
  })
  .copyDirectory('src/assets', 'dist')
  .handlebars('src/components', 'dist')
  .setPublicPath('dist')
  .disableNotifications()
  .version()
  .sourceMaps()
  .webpackConfig(() => {
    return {
      plugins: [
        new BrowserSyncPlugin({
          host: 'localhost',
          port: 3003,
          watch: true,
          server: { baseDir: ['dist'] },
        }),
      ],
    };
  });
