import ForumBackground from "../components/forum/ForumBackground";
import BasicForumInput from "../components/forum/inputs/input";
import GradiantBackground from "../components/common/GradiantBackground";
import Head from "next/head";
import {Fragment, useState} from "react";
import SubmitButton from "../components/forum/inputs/SubmitButton";
import {ForumButton} from "../components/forum/inputs/ForumButton";
import { useRouter } from 'next/router'


function Username() {

    const [errText, setErr] = useState("");
    const router = useRouter()


    let onSubmit = () => {
        const response = fetch(host + '/artist?platform=google', {
            method: 'POST',
            credentials: 'include', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
    }

    let onClickSkip = async () => {
        await router.push("/dailyart");
    }


    return (
        <Fragment>
            <Head>
                <title>Select Username</title>
            </Head>
            <GradiantBackground>
                <ForumBackground>
                    <forum className="grid grid-cols-1 w-96 px-10 pt-10" onSubmit={onSubmit}>
                        <label htmlFor="userName" className="mt-10 mb-1">Chose a Username</label>
                        <BasicForumInput type="text" id="userName" name="userName">
                            <span>{errText}</span>
                        </BasicForumInput>
                        <SubmitButton text="Enter"/>
                    </forum>
                    <div className="grid grid-cols-1 w-96 px-10 pt-10">
                        <ForumButton onClick={onClickSkip} text="Skip" title="skip"></ForumButton>
                    </div>
                </ForumBackground>
            </GradiantBackground>
        </Fragment>);
}

export default Username;