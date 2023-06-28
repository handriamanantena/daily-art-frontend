module.exports = {
    reactStrictMode: true,
    env: {
        REACT_APP_PICTURES_API_HOST:'http://localhost',
        REACT_APP_PICTURES_API_PORT:':3001',
        REACT_API_PICTURES_API_IP: 'http://localhost',
        REACT_APP_CDN_IMAGES: 'https://r2.dailyirasuto.com/',
    },
    images: {
        unoptimized: true,
        domains: ['https://r2.dailyirasuto.com', 'localhost'],
        loader: 'custom',
        loaderFile: './common/image/imageLoader.js'
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
