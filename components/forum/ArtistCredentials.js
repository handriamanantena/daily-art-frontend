import CredentialInput from "../input/CredentialInputs";
import BasicForum from "./BasicForum";
import SubmitButton from "./inputs/SubmitButton";

export default function ArtistCredentials({welcomeTitle, artistInfoTitle, artistPasswordTitle,
                                              passwordFlavourText, onSubmit, passwordStrength, onKeyDown, artistInfoInputType}) {
    let artistTypeId = "email";
    if(artistInfoInputType == "text") {
        artistTypeId = "userName";
    }

    return (<forum className="grid grid-cols-1 w-96 px-10 pt-10" onSubmit={onSubmit}>
                <h2 className="font-extrabold">{welcomeTitle}</h2>
                <label htmlFor={artistTypeId} className="mt-10 mb-1">{artistInfoTitle}</label>
                <CredentialInput type={artistInfoInputType} id={artistTypeId} name={artistTypeId} required/>
                <span className="h-5 flex"/>
                <label htmlFor="password" className="mb-1">{artistPasswordTitle}</label>
                <CredentialInput type="password" id="password" name="password" required onKeyDown={onKeyDown} passwordStrength={passwordStrength}/>
                <label className="text-gray-400 text-xs mb-5">{passwordFlavourText}</label>
                <SubmitButton text="Log In"/>
                <div className="flex items-center mt-2 mb-2">
                    <div className="grow border-b border-stone-400"/>
                    <div className="ml-2 mr-2">or</div>
                    <div className="grow border-b border-stone-400"/>
                </div>
            </forum>);
}