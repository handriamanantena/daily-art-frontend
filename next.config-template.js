module.exports = {
    reactStrictMode: true,
    env: {
        REACT_APP_PICTURES_API_HOST:'http://localhost',
        REACT_APP_PICTURES_API_PORT: ':3001',
        GOOGLE_CLIENT_ID: 'TODO',
    },
    images: {
        domains: [ 'localhost']
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
