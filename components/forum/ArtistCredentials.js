import CredentialInput from "../input/CredentialInputs";

export default function ArtistCredentials({welcomeTitle, artistInfoTitle, artistPasswordTitle,
                                              passwordFlavourText, onSubmit, passwordStrength, onKeyDown, artistInfoInputType}) {

    return (<div className="flex-col shadow-lg">
        <form onSubmit={onSubmit} className="grid grid-cols-1 place-content-cente w-[440px] p-10">
            <h2 className="font-extrabold">{welcomeTitle}</h2>
            <label htmlFor="userName" className="mt-10 mb-1">{artistInfoTitle}</label>
            <CredentialInput type={artistInfoInputType} id="userName" name="userName" required onKeyDown={onKeyDown}></CredentialInput>
            <span className="h-5 flex"/>
            <label htmlFor="password" className="mb-1">{artistPasswordTitle}</label>
            <div>
                <CredentialInput type="password" id="password" name="password" required onKeyDown={onKeyDown} passwordStrength={passwordStrength}></CredentialInput>
            </div>
            <label className="text-gray-400 text-xs">{passwordFlavourText}</label>

            <button type="submit">Log In</button>
        </form>
    </div>);
}