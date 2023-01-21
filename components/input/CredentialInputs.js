import BasicForumInput from "../forum/inputs/input";

export default function CredentialInput({type, id, name, onKeyDown, passwordStrength}) {

    const passwordStrengthStyle = "bg-transparent focus:outline-none ";

    let dynamicPasswordStrengthStyle = "";
    if(passwordStrength == "WEAK") {
        dynamicPasswordStrengthStyle = passwordStrengthStyle + "text-red-600";
    }
    else if(passwordStrength == "LOW") {
        dynamicPasswordStrengthStyle = passwordStrengthStyle + "text-yellow-500";
    }
    else if(passwordStrength == "GOOD") {
        dynamicPasswordStrengthStyle = passwordStrengthStyle + "text-green-700";
    }

    return (
        <BasicForumInput type={type} id={id} name={name} onKeyDown={onKeyDown}>
            <span className={dynamicPasswordStrengthStyle}>{passwordStrength}</span>
        </BasicForumInput>);

}