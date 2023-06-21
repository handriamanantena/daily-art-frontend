module.exports = {
    reactStrictMode: true,
    env: {
        REACT_APP_PICTURES_API_HOST:'http://192.168.0.108',
        REACT_APP_PICTURES_API_PORT:':3001',
        REACT_API_PICTURES_API_IP: '192.168.0.108',
    },
    images: {
        domains: ['192.168.0.108', 'localhost']
    },
    async redirects() {
        return [
            {
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
