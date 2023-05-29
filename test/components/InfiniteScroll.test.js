import {screen, render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {InfiniteScroll} from '../../components/InfiniteScroll';
import React from "react";
import {InfiniteScrollTestComponentTest} from "./InfinitScrolleTestComponent.Test";



describe('Test infinite scroll', () => {

    test('Test 1 div', async () => {

        let objects = [];
        let page = 1;

        let ref = React.createRef();
        let getObjects = () => {
            objects.push("object " + page);
            page++;
            return objects;
        }

        let isMaxPage = () => {

        }

        let setLastElement = (value) => {
            ref = value;
        }

        //render(<InfiniteScroll getObjects={getObjects} lastElement={ref}><InfiniteScrollTestComponentTest objects={objects} setLastElement={setLastElement}/></InfiniteScroll>);
        render(<InfiniteScroll getObjects={getObjects} lastElement={ref}><InfiniteScrollTestComponentTest objects={objects} setLastElement={setLastElement}/></InfiniteScroll>)
        const div = screen.getByTestId('object-17');
        expect(div).toBeInTheDocument();
    });

    // manually trigger the callback
    /*renderer.act(() => {
        tree.props.onMouseEnter();
    });*/
});