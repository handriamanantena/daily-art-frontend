import {InputBorder} from "./InputBorder";

export default function BasicForumInput({type, id, name, onKeyDown, maxLength, children, defaultValue}) {

    return (<InputBorder>
        <input type={type} id={id} name={name} required onInput={onKeyDown}
               className="flex-1 bg-transparent focus:outline-none" maxLength={maxLength} defaultValue={defaultValue}/>
        {children}
    </InputBorder>);
}