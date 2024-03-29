module.exports = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_PICTURES_API_HOST:'https://api.dailyirasuto.com',
        NEXT_PUBLIC_PICTURES_API_PORT:'',
        REACT_API_PICTURES_API_IP: 'https://api.dailyirasuto.com',
        NEXT_PUBLIC_CDN_IMAGES: 'https://r2.dailyirasuto.com/',
        NEXT_PUBLIC_UPLOAD_PICTURE_API: 'https://upload.dailyirasuto.com/'
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
