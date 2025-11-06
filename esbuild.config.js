const esbuild = require('esbuild');
const envfilePlugin = require('esbuild-envfile-plugin');

const isWatch = process.argv.includes('--watch');

const buildOptions = {
    entryPoints: ['app/javascript/application.js'],
    bundle: true,
    sourcemap: true,
    outdir: 'app/assets/builds',
    publicPath: '/assets',
    loader: {
        '.js': 'jsx',
        '.png': 'file',
        '.woff': 'file',
        '.woff2': 'file'
    },
    assetNames: '[name]-[hash].digested',
    plugins: [envfilePlugin]
};

if (isWatch) {
    // Watch mode
    esbuild.context(buildOptions).then(context => {
        context.watch();
        console.log('Watching for changes...');
    }).catch(() => process.exit(1));
} else {
    // Single build
    esbuild.build(buildOptions).catch(() => process.exit(1));
} 
