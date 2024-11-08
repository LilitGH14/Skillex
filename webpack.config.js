module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@import "src/styles/_mixins.scss"; @import "src/styles/_variables.scss";`,
                        },
                    },
                ],
            },
        ],
    },
};
