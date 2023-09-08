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


    return <div><InputBorder>
        <Tag tag={tag}/>
        <span className="w-full bg-transparent focus:outline-none"
            role="textbox"
            contentEditable
        ref={ref}>
        </span>
    </InputBorder><p>{JSON.stringify(listTags)}</p>
    </div>
};