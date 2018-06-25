# Webpack 4 Wordpress Theme Drop-in

This package was created as a drop in for most Wordpress starter themes to integrate Webpack for and a few of the useful tools it has to offer. If you need a starter theme, try _s at underscores.me

## Perks

1. Incorporates SCSS with source mapping for easy development.
2. Incorporates Babel to transpile ES6 to ES5
3. Incorporates SCSS and JS linting for cleaner development
4. Keeps custom scss and js separate from starter theme unless you declare otherwise.
5. Uses browsersync to reload browser on save of php, scss, or js files within your theme. 

## Requirements

Node.js

To Access your dashboard, you will want to use your original local address. 

## Instalation

1. Install your starter theme of choice and activate it.

2. Drop package into your theme folder (Note: there are three invisible files that will not copy over unless you have your invisible files as viewable.)

3. Navigate to your theme folder in terminal

4. Install Node Modules into your theme folder

```
npm install
```

5. Update your browsersync settings located at the top of webpack.config.js


6. Add your app.js and app.css to your functions.php file

```
function mytheme_scripts() {
  wp_enqueue_style( 'mytheme-custom-styles', get_template_directory_uri() . '/dist/app.css' );
  wp_enqueue_script( 'mytheme-custom-js', get_template_directory_uri() . '/dist/app.js', array(), '20180624', true );
}
add_action( 'wp_enqueue_scripts', 'mytheme_scripts' );

```

7. Run NPM

```
npm run dev
```

### Build Prod Version

8. To build your production version run the following in terminal

```
npm run build
```

## Breakdown
The working files for css and js are kept in the src folder app.js is the primary js file and app.scss is the primary scss file. Once compiled, they will be placed into a dist folder. 

Should you want your app.css to replace the current theme stylesheet rather than be added as a separate css file, simply create a new scss partial, copy the code from the old style.css file and import it first in your app.scss file. Change the name of app.scss to style.css. Open app.js and modify the import link to style.css. Finally, change the following: ExtractTextPlugin("app.css") to ExtractTextPlugin("../style.css") in your webpack.config.js 

Update your package.json file to reflect your own project. 