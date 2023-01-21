
export default function BasicForum({onSubmit, children}) {

    return(<form onSubmit={onSubmit} className="grid grid-cols-1 w-96 px-10 pt-10">{children}</form>);
}