import Head from "next/head";
import LogIn from "../components/forum/Login";
import Welcome from "../components/Welcome";
import {Fragment} from "react";

function Join() {

    return (<Fragment>
        <Head>
            <title>Join</title>
            <link rel="icon" href="/favicon.ico" />
            <script src="https://accounts.google.com/gsi/client" async defer></script>
        </Head>
        <div class="flex items-center h-screen justify-center align-middle bg-gradient-to-r from-cyan-500 to-blue-500">
            <Welcome welcomePage="join" welcomeTitle="Join Daily Art"></Welcome>
        </div>
    </Fragment>);
}

export default Join;