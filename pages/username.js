import ForumBackground from "../components/forum/ForumBackground";
import BasicForumInput from "../components/forum/inputs/input";
import GradiantBackground from "../components/common/GradiantBackground";
import Head from "next/head";
import {Fragment, useContext, useEffect, useState} from "react";
import SubmitButton from "../components/forum/inputs/SubmitButton";
import {ForumButton} from "../components/forum/inputs/ForumButton";
import { useRouter } from 'next/router'
import AuthContext from "../common/context/auth-context";


function Username() {

    const [errText, setErr] = useState("");
    const router = useRouter();
    const ctx = useContext(AuthContext);

    useEffect(async () => {
        if(!ctx.isLoggedIn) {
            await router.push("/dailyart");
        }
    }, []);


    let onSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked");
        let body = JSON.stringify({
            userName: e.target.userName.value
        })
        const host = process.env.NEXT_PUBLIC_PICTURES_API_HOST + process.env.NEXT_PUBLIC_PICTURES_API_PORT;
        const response = await fetch(host + "/artist", {
            method: 'PATCH',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + ctx.token
            },
            body : body
        });
        if (response.status == 200 || response.status == 201) {
            ctx.editUserData(await response.json());
            await router.push("/dailyart");
        }
        else if (response.status == 409){
            setErr("User name already in use");
        }
        else {
            setErr("There was an issue setting your user name");
        }

    };

    let onClickSkip = async () => {
        await router.push("/dailyart");
    };


    return (
        <Fragment>
            <Head>
                <title>Select Username</title>
            </Head>
            <GradiantBackground>
                <ForumBackground>
                    <form className="grid grid-cols-1 w-96 px-10 pt-10" onSubmit={onSubmit}>
                        <h2 className="font-extrabold">Username selection</h2>
                        <label htmlFor="userName" className="mt-10 mb-1">Chose a Username</label>
                        <BasicForumInput type="text" id="userName" name="userName"/>
                        <span className="text-red-500 mb-5">{errText}</span>
                        <SubmitButton text="Enter"/>
                    </form>
                    <div className="grid grid-cols-1 w-96 px-10 py-5 ">
                        <ForumButton onClick={onClickSkip} text="Skip" title="skip"></ForumButton>
                    </div>
                </ForumBackground>
            </GradiantBackground>
        </Fragment>);
}

export default Username;