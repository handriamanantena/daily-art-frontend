import {Fragment} from "react";
import React, { useState } from 'react';

export default function CredentialInput({type, id, name, onKeyDown, passwordStrength}) {

    return (<Fragment>
        <input type={type} id={id} name={name} required onInput={onKeyDown}
               className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300
               focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"/>
        <span>{passwordStrength}</span>
    </Fragment>);

}