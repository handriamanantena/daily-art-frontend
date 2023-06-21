
export default function BasicForumInput({type, id, name, onKeyDown, maxLength, children}) {

    return (<div className="flex mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none
        focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-1
        block w-full rounded-md sm:text-sm ">
        <input type={type} id={id} name={name} required onInput={onKeyDown}
               className="flex-1 bg-transparent focus:outline-none" maxLength={maxLength}/>
        {children}
    </div>);
}