module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        // perintah dibawah ini untuk menggunakan postcss-purgecss hanya ketika di environtment production atau dengan kata lain ketika dibuild
        ...(process.env.NODE_ENV === 'production'
            ? {
                '@fullhuman/postcss-purgecss': {
                    content: [
                    // perintah dibawah ini untuk menunjuk folder mana saja yang ingin menggunakan postcss-purge css
                        './component/*.js',
                        './pages/*.js',
                    ],
                    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
                }
            }
            : {})
    }
};