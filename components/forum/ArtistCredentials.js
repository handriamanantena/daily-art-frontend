import CredentialInput from "../input/CredentialInputs";
import BasicForum from "./BasicForum";

export default function ArtistCredentials({welcomeTitle, artistInfoTitle, artistPasswordTitle,
                                              passwordFlavourText, onSubmit, passwordStrength, onKeyDown, artistInfoInputType}) {

    return (<BasicForum onSubmit={onSubmit}>
                <h2 className="font-extrabold">{welcomeTitle}</h2>
                <label htmlFor="userName" className="mt-10 mb-1">{artistInfoTitle}</label>
                <CredentialInput type={artistInfoInputType} id="userName" name="userName" required/>
                <span className="h-5 flex"/>
                <label htmlFor="password" className="mb-1">{artistPasswordTitle}</label>
                <CredentialInput type="password" id="password" name="password" required onKeyDown={onKeyDown} passwordStrength={passwordStrength}/>
                <label className="text-gray-400 text-xs mb-5">{passwordFlavourText}</label>
                <button type="submit" className="h-10 bg-blue-500 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">Log In</button>
                <div className="flex items-center mt-2 mb-2">
                    <div className="grow border-b border-stone-400"/>
                    <div className="ml-2 mr-2">or</div>
                    <div className="grow border-b border-stone-400"/>
                </div>
            </BasicForum>);
}