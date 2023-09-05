export const TextAreaBorder = ({children}) => {
    return <div className="flex flex-grow space-y-1 w-full px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none
        focus-within:border-sky-500 focus-within:ring-sky-500 focus-within:ring-1 rounded-md sm:text-sm">{children}</div>
}