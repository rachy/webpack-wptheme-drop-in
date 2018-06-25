const webpack = require('webpack'),
      path = require('path'),
      StyleLintPlugin = require('stylelint-webpack-plugin'),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
      
const settings = {
        // The BrowserSync hostname
          host: 'localhost',
          
          // The port to run BrowserSync's server on
          port: 3333,
        
          // A target to proxy all BrowserSync requests to.
          // This can be a local web server, Vagrant or a docker container.
          // This is your local/VM WordPress development site.
          proxy: 'localhost:8888/sjc',
        
          // If you have your Site URL for WordPress set to anything else other than the proxy address,
          // we need to override all URL. In this example I am overriding my site at http://localhost:8888/sjc
          urlOverride: /localhost\:8888\/sjc/
};

module.exports = function(env) {
    return {
        entry: './src/js/app.js',
        output: {
            path: path.resolve( __dirname, 'dist'),
            filename: "bundle.js"
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader'
              }
            },
            {
              enforce: 'pre',
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'eslint-loader',
              options: {
                  emitWarning: true,
              }
            },
            // Run Sass through loaders before bundling into `style.css`
            {
              test: /\.scss$/,
              include: [path.resolve(__dirname, 'src', 'scss')],
              loader: ExtractTextPlugin.extract( [
                  {
                      loader: 'css-loader',
                      options: {
                          minimize: true,
                          sourceMap: true
                      }
                  },
                  {
                      loader: 'sass-loader',
                      options: {
                          sourceMap: true
                      }
                  }
              ] )            
            }

          ]
        },
        plugins: [
          new ExtractTextPlugin("app.css"),
          new StyleLintPlugin({ syntax: 'scss' }),
          new BrowserSyncPlugin({
              host: settings.host,
              port: settings.port,
              proxy: settings.proxy,
              rewriteRules: [
                  {
                      match: settings.urlOverride,
                      fn: function (req, res, match) {
                          return settings.host + ':' + settings.port;
                      }
                  }
              ],
              files: [
                {
                    match: [
                        '*.php',
                        '**/*.php'
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
          })
        ],
        devtool: 'source-map'
    }
}