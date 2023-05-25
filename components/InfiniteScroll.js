import React, {useRef, useState, useEffect, Fragment} from 'react';

export const InfiniteScroll = ({getObjects, isMaxPage, lastElement, children}) => {
    let [pageNum, setPage] = useState(1);
    const observer = useRef();

    useEffect(() => {
        console.log("page changed")
        if (pageNum < 2) {
            getObjects();
        }
    }, [pageNum]);


    let updatePage = (entries) => {
        let lastCard = entries[0];

        if (lastCard.isIntersecting) {
            setPage((value) => value + 1);
        }
    }

    useEffect(() => {
        observer.current = new IntersectionObserver(updatePage);
    }, []);

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    return (<Fragment>{children}</Fragment>);

}

export default {InfiniteScroll}

