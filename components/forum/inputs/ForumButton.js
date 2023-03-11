
export const ForumButton = ({title, text, onClick}) => {
    return (
        <button className="h-10 bg-blue-500 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500" title={title} onClick={onClick}>{text}</button>
    );
}