import {ThreeDots} from "./ThreeDots";

export const LoadingScreen = ({children, isLoadingHidden}) => {

    return <div hidden={isLoadingHidden} className="fixed flex inset-0 bg-white items-center justify-center z-[1999]">

        <div className="flex flex-col">
            <p className="ml-[-20px] mb-2">{children}</p>
            <ThreeDots/>
        </div>
    </div>
}