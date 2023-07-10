module.exports = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
        domains: ['https://r2.dailyirasuto.com', 'localhost'],
        loader: 'custom',
        loaderFile: './common/image/imageLoader.js'
    },
    experimental: {
        images: {
            allowFutureImage: true,
            unoptimized: true,
            domains: ['https://r2.dailyirasuto.com', 'localhost'],
            loader: 'custom',
            loaderFile: './common/image/imageLoader.js'
        }
    },
    async redirects() {
        return [
            {
                source: "/(join|signin)",
                source: "/(join|signin)",
                has: [
                    {
                        type: 'cookie',
                        key: 'jwt'
                    }
                ],
                permanent: false,
                destination: '/dailyart'
            }
        ]
    }
}
