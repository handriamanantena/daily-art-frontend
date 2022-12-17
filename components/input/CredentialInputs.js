
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

    return (<div tabIndex="0" className="flex mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none
        focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-1
        block w-full rounded-md sm:text-sm ">
        <input type={type} id={id} name={name} required onInput={onKeyDown}
               className="flex-1 bg-transparent focus:outline-none"/>
        <span className={dynamicPasswordStrengthStyle}>{passwordStrength}</span>
    </div>);

}