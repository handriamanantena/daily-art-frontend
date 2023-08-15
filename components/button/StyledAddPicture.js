
export const StyledAddPicture = ({text, showPopUp}) => {

    return(<button onClick={showPopUp} className="hidden md:flex flex-col w-1/2 h-96 sm:w-3/10 lg:w-1/4 border-4 border-black hover:border-cyan-600 hover:text-cyan-600 text-9xl justify-center items-center rounded-lg" title="Add Picture">
        {text}</button>);
};