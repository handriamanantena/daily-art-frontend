import 'dotenv/config';
import '../styles/globals.css'
import {AuthProvider} from "../common/context/auth-context";

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}
export default MyApp
