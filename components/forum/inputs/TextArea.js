import {TextAreaBorder} from "./TextAreaBorder";

export const TextArea = ({defaultValue}) => {

    return <TextAreaBorder>
        <textarea className="md:min-h-[174px] p-2.5 w-full bg-transparent focus:outline-none"
                     defaultValue={defaultValue} maxLength={5000}></textarea>
    </TextAreaBorder>

}