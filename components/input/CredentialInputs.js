import BasicForumInput from "../forum/inputs/input";

export default function CredentialInput({type, id, name, onKeyDown, message}) {

    const messageStyle = "bg-transparent focus:outline-none ";

    let dynamicMessageStyle = "";
    if(message == "WEAK") {
        dynamicMessageStyle = messageStyle + "text-red-600";
    }
    else if(message == "LOW") {
        dynamicMessageStyle = messageStyle + "text-yellow-500";
    }
    else if(message == "GOOD") {
        dynamicMessageStyle = messageStyle + "text-green-700";
    }
    else if(message == "Email in use") {
        dynamicMessageStyle = messageStyle + "text-red-600";
    }

    return (
        <BasicForumInput type={type} id={id} name={name} onKeyDown={onKeyDown}>
            <span className={dynamicMessageStyle}>{message}</span>
        </BasicForumInput>);

}