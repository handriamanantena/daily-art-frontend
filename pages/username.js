import BasicForum from "../components/forum/BasicForum";
import ForumBackground from "../components/forum/ForumBackground";
import BasicForumInput from "../components/forum/inputs/input";


function Username() {

    return (<ForumBackground>
        <BasicForum>
            <label htmlFor="userName" className="mt-10 mb-1">Chose a Username</label>
            <BasicForumInput/>
        </BasicForum>
    </ForumBackground>);
}

export default Username;