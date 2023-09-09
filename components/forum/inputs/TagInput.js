import {Tag} from "../../button/Tag";
import {useEffect, useRef, useState} from "react";
import React from "react";
import {TextAreaBorder} from "./TextAreaBorder";

export const TagInput = ({}) => {

    let ref = useRef();
    let [tag, setTag] = useState('');
    let [listTags, setTagList] = useState([]);
    let [errMsg, setErrMsg] = useState('');

    let deleteTag = (text) => {
        setTagList((listTags) => listTags.filter((tagInList) => tagInList != text));
    };

    useEffect(() => {
        let noErrors = true;
        listTags?.forEach((tagInList) => {
            if(tagInList.length > +(process.env.NEXT_PUBLIC_MAX_TAG_SIZE)) {
                noErrors = false;
                return;
            }
        });
        if(noErrors) {
            setErrMsg('');
        }
    }, [listTags]);

    useEffect(() => {


        let createNewTagFromKey = (e) => {
            if(e.key === ' ' || e.key.toLowerCase() === "enter") {
                ref.current.innerText = '';
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
                setTag('');
                setTagList(listTags => [...listTags, tag]);
                if(tag.length > +(process.env.NEXT_PUBLIC_MAX_TAG_SIZE)) {
                    setErrMsg('Max tag length is ' + +(process.env.NEXT_PUBLIC_MAX_TAG_SIZE))
                }
            }
        }

        document.addEventListener("keyup", createNewTagFromKey);
        return () => {
            document.removeEventListener("keyup", createNewTagFromKey);
        };


    }, [tag]);


    // TODO need a scroll wheel when text to large (y axis)
    return <div>
        <TextAreaBorder>
            <div className="flex flex-wrap w-full break-all">
                {listTags.map((text) => {
                    return <Tag tag={text} deleteTag={deleteTag}/>
                })}
                <span className="flex flex-wrap grow self-center bg-transparent focus:outline-none px-1.5 py-1 my-1"
                      role="textbox"
                      contentEditable
                      ref={ref}>
                </span>
            </div>
        </TextAreaBorder>
        <span className="text-red-500 text-xs mb-1">{errMsg}</span>
    </div>
};