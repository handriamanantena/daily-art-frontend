import React, {useEffect, useRef, useState} from "react";

export const DropDown = ({children, menuOption, hideDropDownArrow}) => {

    let [showDropDown, setShowDropDown] = useState(false);
    let ref = useRef();
    useEffect(() => {
        function handleClickOutside(event) {
            console.log(event.target);
            console.log(ref.current);
            console.log(ref.current.contains(event.target));
            if (ref.current && !ref.current.contains(event.target)) {
                setShowDropDown(false);
                console.log("outside");
            }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    let dropDown = (e) => {
        console.log("clicked")
        setShowDropDown(!showDropDown);
        e.stopPropagation();
    };

    return <div className="group flex" ref={ref}>
        <div onClick={dropDown} className="flex z-10">
        {menuOption}
            <div className={`grid content-center pl-1 ${hideDropDownArrow ? 'hidden' : 'block'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" height="0.9em" viewBox="0 0 448 512"
                     className="group-hover:fill-cyan-600 mt-1">
                    <path
                        d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>
            </div>
        </div>
        {showDropDown ? children : <></>}
    </div>
}