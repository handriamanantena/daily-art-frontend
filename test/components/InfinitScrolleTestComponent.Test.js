import React from "react";


export const InfiniteScrollTestComponentTest =  ({objects, setLastElement}) => {

    return (objects.map((value, index) => {
        return objects.length - 1 === index ? (
                <div ref={setLastElement} data-testid={value}>{value}</div>) :
            <div>Text</div>
    }));

}