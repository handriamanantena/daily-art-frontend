import {OptionsSVG} from "../../svg/OptionsSVG";

export const Options = () => {

    let onClick = (e) => {
    };

    return <div className="absolute left-0 top-0 m-3 rounded-full backdrop-brightness-50 w-fit" onClick={onClick}>
        <OptionsSVG/>
    </div>

}