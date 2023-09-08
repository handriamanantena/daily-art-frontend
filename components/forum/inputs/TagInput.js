import {InputBorder} from "./InputBorder";
import {Tag} from "../../button/Tag";
import {useEffect, useRef} from "react";

export const TagInput = ({}) => {

    let ref = useRef();

    useEffect(() => {

        let createNewTagFromKey = (e) => {
            if(e.key === ' ' || e.key.toLowerCase() === "enter") {
                createNewTag();
            }
        };

        let createNewTag = () => {
            console.log(ref.current.innerHTML);
        }

        document.addEventListener("keydown", createNewTagFromKey, false);
        document.addEventListener("click", createNewTag, false);
        return () => {
            document.removeEventListener("keydown", createNewTagFromKey, false);
            document.removeEventListener("click", createNewTag, false);
        };


    }, []);
    return <InputBorder>
        <Tag/>
        <span className="w-full bg-transparent focus:outline-none"
            role="textbox"
            contentEditable
        ref={ref}>
        </span>
    </InputBorder>
};