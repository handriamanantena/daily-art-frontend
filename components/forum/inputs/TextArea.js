import {TextAreaBorder} from "./TextAreaBorder";

export const TextArea = ({id, name, defaultValue}) => {

    return <TextAreaBorder>
        <textarea id={id} name={name} className="md:min-h-[174px] p-2.5 w-full bg-transparent focus:outline-none"
                  defaultValue={defaultValue} maxLength={5000}/>
    </TextAreaBorder>

}