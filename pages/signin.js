import Head from "next/head";
import Welcome from "../components/Welcome";
import {Fragment} from "react";
import GradiantBackground from "../components/common/GradiantBackground";

function Signin() {

    return (<Fragment>
        <Head>
            <title>Sign In</title>
        </Head>
        <GradiantBackground>
            <Welcome welcomePage="login" welcomeTitle="Log In"></Welcome>
        </GradiantBackground>
    </Fragment>);
}

export default Signin;