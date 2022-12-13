import {Fragment} from "react";
import {NavigationBar} from "./NavigationBar"
import {Footer} from "./Footer"

export function BasicLayout({children}) {

    return (<Fragment>
        <NavigationBar/>
            <main>{children}</main>
        <Footer/>
    </Fragment>)

}