import {InputBorder} from "./InputBorder";
import {Tag} from "../../button/Tag";
import {useEffect, useRef, useState} from "react";

export const TagInput = ({}) => {

    let ref = useRef();
    let [tag, setTag] = useState();
    let [listTags, setTagList] = useState([]);


    useEffect(() => {


        let createNewTagFromKey = (e) => {
            if(e.key === ' ' || e.key.toLowerCase() === "enter") {
                createNewTag();
            }
            else {
                let text = ref.current.innerText.toString();
                if(text) {
                    setTag(text);
                }
            }
        };

        let createNewTag = () => {
            if(tag && ref.current) {
                ref.current.innerText = '';
                setTagList([...listTags, tag]);
            }
        }

        document.addEventListener("keyup", createNewTagFromKey);
        document.addEventListener("click", createNewTag);
        return () => {
            document.removeEventListener("keyup", createNewTagFromKey);
            document.removeEventListener("click", createNewTag);
        };


    }, [tag]);


    // TODO need a scroll wheel when text to large (y axis)
    return <InputBorder>
        <div className="flex flex-wrap w-full break-all">
            <div className="flex flex-wrap">
                {listTags.map((text) => {
                    return <Tag tag={text}/>
                })}
            </div>
        <span className="flex flex-wrap grow self-center bg-transparent focus:outline-none"
            role="textbox"
            contentEditable
        ref={ref}>
        </span>
        </div>
    </InputBorder>
};