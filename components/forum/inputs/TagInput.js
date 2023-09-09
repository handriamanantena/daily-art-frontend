import {InputBorder} from "./InputBorder";
import {Tag} from "../../button/Tag";
import {useEffect, useRef, useState} from "react";
import React from "react";

export const TagInput = ({}) => {

    let ref = useRef();
    let [tag, setTag] = useState('');
    let [listTags, setTagList] = useState([]);
    let [errMsg, setErrMsg] = useState('');

    let deleteTag = (text) => {
        setTagList((listTags) => listTags.filter((tagInList) => tagInList != text));
    };

    useEffect(() => {


        let createNewTagFromKey = (e) => {
            if(e.key === ' ' || e.key.toLowerCase() === "enter") {
                createNewTag();
            }
            else {
                let text = ref.current.innerText.toString();
                if(text) {
                    setTag(text);
                    if(tag.length > +(process.env.NEXT_PUBLIC_MAX_TAG_SIZE)) {
                        setErrMsg('Max tag length is ' + +(process.env.NEXT_PUBLIC_MAX_TAG_SIZE))
                    }
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
        return () => {
            document.removeEventListener("keyup", createNewTagFromKey);
        };


    }, [tag]);


    // TODO need a scroll wheel when text to large (y axis)
    return <div>
        <InputBorder>
        <div className="flex flex-wrap w-full break-all">
            <div className="flex flex-wrap">
                {listTags.map((text) => {
                    return <Tag tag={text} deleteTag={deleteTag}/>
                })}
            </div>
        <span className="flex flex-wrap grow self-center bg-transparent focus:outline-none"
            role="textbox"
            contentEditable
        ref={ref}>
        </span>
        </div>
    </InputBorder>
        <span className="text-red-500 text-xs mb-1">{errMsg}</span>
    </div>
};