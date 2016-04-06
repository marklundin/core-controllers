/*
    This file contains configuration for the generated styleguide
*/

var path = require('path');

module.exports = {
    title: 'Core Controllers',
    components: './components/**/*.jsx',
    skipComponentsWithoutExample: true,
    styleguideDir: 'docs',
    template: 'docs/template/index.html',
    updateWebpackConfig: function( webpackConfig, env) {
        webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'docs/js/wrapper')
        webpackConfig.entry.push(path.join(__dirname, 'docs/css/main.css'));
        var dir = path.join(__dirname, 'components');
        webpackConfig.module.loaders.push({
            test: /\.jsx?/,
            include: dir,
            loader: 'babel'
        })
        webpackConfig.module.loaders.push({
           test: /\.css$/,
           include: path.join(__dirname, 'docs/css'),
           loader: 'style-loader!css-loader'
        })
        return webpackConfig;
    },

    getComponentPathLine: function(componentPath) {
        var name = path.basename(componentPath, '.jsx');
        var dir = path.dirname(componentPath);
        return 'import ' + name + ' from \'' + dir + '\''
    }
}
