import React, {useRef, useState, useEffect, Fragment} from 'react';

export const InfiniteScroll = ({getObjects, maxPage, lastElement, children}) => {
    let [pageNum, setPage] = useState(1);
    const observer = useRef();

    useEffect(async () => {
        if (pageNum < maxPage && pageNum != 1) { // TODO should not have max page. should get objects untill database returns empty
            await getObjects();
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

