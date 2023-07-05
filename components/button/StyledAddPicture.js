
export const StyledAddPicture = ({text, showPopUp}) => {

    return(<button onClick={showPopUp} className="flex flex-col w-1/2 sm:w-3/10 lg:w-1/4 border-4 border-yellow-500 text-9xl justify-center items-center text-yellow-500 rounded-lg" title="Add Picture">
        {text}</button>);
};