import { render, screen, fireEvent, createEvent, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import {AddPictureInfo} from '@/components/forum/popup/AddPictureInfo'
import React from "react";
import "@testing-library/jest-dom"
import * as nextRouter from 'next/router';
import { promises as fs } from "fs";
nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ push: jest.fn() }));


describe('AddPictureInfo', () => {
    it('upload image', async () => {
        let onclick = jest.fn();

        const setStateMock = jest.fn();

        const useStateMock = (useState) => [useState, setStateMock];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);


        render(<AddPictureInfo hidePopUp={onclick}/>)
        const fileInput = screen.getByTestId('file-input');
        const data = await fs.readFile("__test__/files/regImage.png", "utf-8");

        const file = new File([data], 'test.jpg', {
            type: 'image/png',
        });
        global.Image = class {
            constructor() {
                setTimeout(() => {
                    this.onload(); // simulate success
                }, 100);
            }
        }

        const event = createEvent.input(fileInput, {target: {files: [file]}});
        fireEvent.change(fileInput, event);



        await waitFor(() => {
            expect(fileInput).not.toBeInTheDocument();
            const previewImage = screen.getByTestId('preview-picture');
            expect(previewImage).toBeInTheDocument();
        });

    })

    it('upload large image', async () => {
        let onclick = jest.fn();

        const setStateMock = jest.fn();

        const useStateMock = (useState) => [useState, setStateMock];
        jest.spyOn(React, "useState").mockImplementation(useStateMock);


        render(<AddPictureInfo hidePopUp={onclick}/>)
        const fileInput = screen.getByTestId('file-input');

        const data = await fs.readFile("__test__/files/largeImage.jpg", "utf-8");

        const file = new File([data], 'test.jpg', {
            type: 'image/jpg',
        });
        global.Image = class {
            constructor() {
                setTimeout(() => {
                    this.onload(); // simulate success
                }, 100);
            }
        }

        const event = createEvent.input(fileInput, {target: {files: [file]}});
        fireEvent.change(fileInput, event);



        await waitFor(() => {
            const fileTooLargeWarning = screen.getByTestId('file-message');
            expect(fileTooLargeWarning).toBeInTheDocument();
        });


    })

})