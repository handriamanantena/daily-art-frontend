This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npx next dev
```

### Configure next.config.js

In order for the frontend to communicate with the backend, the next.config-template.js file will need to be configured. 

Step 1.

You will need to rename ```next.config-template.js``` to ```next.config.js```.

Step 2. 

```NEXT_PUBLIC_PICTURES_API_HOST```: You will need to set this value to the host of the backend. For example 'http://localhost'

```NEXT_PUBLIC_PICTURES_API_PORT```: You will need to set this value to the port of the backend. For example ':3001'

```GOOGLE_CLIENT_ID```: If you want to enable google login, you will need to set up a google client id on the google cloud platform. It's a lot of over head so leave blank. 
https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid

```Domains```
You will need to list the external IPs next will be comunicating with. In this case it would be the backend service. add the IP or localhost to the domain list. 
```
images: {
    domains: ['localhost']
}
```

```redirects```

For more information on the redirects, please read the next.js documentation. https://nextjs.org/docs/pages/api-reference/next-config-js/redirects

### Possible Errors
```bash
Error: error:0308010C:digital envelope routines::unsupported
at new Hash (node:internal/crypto/hash:71:19)
at Object.createHash (node:crypto:133:10)
at BulkUpdateDecorator.hashFactory
```

#### Support for node v18
If you are getting the above error, it means you need to run
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```
In intelij I added it to npx next dev run configuration under environment variable.


### Creating production build and running (Not working yet)

1. next build
2. next start

### Check Tailwind version

npm view tailwindcss version


