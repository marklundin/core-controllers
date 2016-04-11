/*
    This file contains configuration for the generated styleguide
*/

var path = require('path');
var pkg = require('../../package.json')

module.exports = {
    title: 'Core Controllers',
    //components: path.join( __dirname, '../../components/**/*.jsx' ),
    skipComponentsWithoutExample: true,
    homepage: pkg.homepage,
    version: pkg.version,
    styleguideDir: '../../documentation',
    template: path.join(__dirname, './template/index.html' ),
    sections: [
        {name: 'Core Controllers', content: './README.md' },
        {name: 'Components', content: './components/README.md', components: '../../components/**/*.jsx' }
    ],
    updateWebpackConfig: function( webpackConfig, env) {
//, components: path.join( __dirname, '../../components/**/*.jsx' )
        webpackConfig.resolve.alias['rsg-components/Wrapper'] = path.join(__dirname, './js/wrapper')
        webpackConfig.entry.push(path.join(__dirname, 'css/main.css'));
        var dir = path.join(__dirname, '../../components');
        webpackConfig.module.loaders.push({
            test: /\.jsx?/,
            include: dir,
            loader: 'babel'
        })
        webpackConfig.module.loaders.push({
           test: /\.css$/,
           include: path.join(__dirname, 'css'),
           loader: 'style-loader!css-loader'
        })
        return webpackConfig;
    },

    getComponentPathLine: function(componentPath) {
        var name = path.basename(componentPath, '.jsx');
        return 'import ' + name + ' from \'' + pkg.name + '/components/' + name + '\''
    }
}
