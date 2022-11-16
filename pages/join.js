import Head from "next/head";
import LogIn from "../components/forum/Login";
import Welcome from "../components/Welcome";

function Join() {

    return (<div class="bg-gradient-to-r from-cyan-500 to-blue-500">
        <Head>
            <title>Join</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://accounts.google.com/gsi/client" async defer></script>
        </Head>
        <div class="flex items-center h-screen justify-center align-middle">
            <Welcome welcomePage="join"></Welcome>
        </div>
    </div>);
}

export default Join;