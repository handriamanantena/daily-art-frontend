
export default function ArtistCredentials({artistInfoTitle, artistPasswordTitle,
                                              passwordFlavourText, onSubmit, passwordContent, onPasswordKeyDown, artistInfoInputType}) {

    return (<div className="flex-col bg-cyan-500 shadow-lg shadow-cyan-500/50">
        <form onSubmit={onSubmit} className="grid grid-cols-1 place-content-cente">
            <label htmlFor="userName">{artistInfoTitle}</label>
            <input type={artistInfoInputType} id="userName" name="userName" required/>
            <label htmlFor="password">{artistPasswordTitle}</label>
            <div>
                <input type="password" id="password" name="password" required onKeyDown={onPasswordKeyDown}/>
                <span>{passwordContent}</span>
            </div>
            <label>{passwordFlavourText}</label>

            <button type="submit">Log In</button>
        </form>
    </div>);
}