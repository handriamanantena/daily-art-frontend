import 'dotenv/config';
import '../styles/globals.css'
import {AuthProvider} from "../common/context/auth-context";
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
      <Component {...pageProps} />
      <Script
          type="text/javascript"
          src="../node_modules/tw-elements/dist/js/tw-elements.umd.min.js"/>
  </AuthProvider>
}
export default MyApp
