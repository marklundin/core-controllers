/*
    This file contains configuration for the generated styleguide
*/

var path = require('path');

module.exports = {
    title: 'Dui Component Set',
    components: './components/**/*.jsx',
    skipComponentsWithoutExample: true,
    updateWebpackConfig: function( webpackConfig, env) {
        webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, 'docs/js/wrapper')
        var dir = path.join(__dirname, 'components');
        webpackConfig.module.loaders.push(
            {
                test: /\.jsx?/,
                include: dir,
                loader: 'babel'
            }
        );
        return webpackConfig;
    },

    getComponentPathLine: function(componentPath) {
        var name = path.basename(componentPath, '.js');
        var dir = path.dirname(componentPath);
        return 'import ' + name + ' from \'' + dir + '\''
    }
}
