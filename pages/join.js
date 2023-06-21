import Head from "next/head";
import Welcome from "../components/Welcome";
import {Fragment} from "react";

function Join() {

    return (<Fragment>
        <Head>
            <title>Join</title>
        </Head>
        <div className="flex items-center h-screen justify-center align-middle bg-gradient-to-r from-cyan-500 to-blue-500">
            <Welcome welcomePage="join" welcomeTitle="Join Daily Art"></Welcome>
        </div>
    </Fragment>);
}

export default Join;