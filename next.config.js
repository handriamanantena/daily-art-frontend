module.exports = {
    reactStrictMode: true,
    env: {
        //REACT_APP_PICTURES_API_HOST:'http://192.168.0.108',
        REACT_APP_PICTURES_API_HOST:'https://api.dailyirasuto.com',
        REACT_APP_PICTURES_API_PORT:'',
        //REACT_API_PICTURES_API_IP: '192.168.0.108',
        REACT_API_PICTURES_API_IP: 'https://api.dailyirasuto.com',
        REACT_APP_CDN_IMAGES: 'https://dailyartworker.harrison-a101.workers.dev/',
    },
    images: {
        //domains: ['192.168.0.108', 'localhost']
        domains: ['https://dailyartworker.harrison-a101.workers.dev', 'localhost'],
        loader: 'custom',
        loaderFile: './common/image/imageLoader.js',
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
