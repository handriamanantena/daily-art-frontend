

export default function GradiantBackground({children}) {
    return <div className="flex items-center h-screen justify-center align-middle bg-gradient-to-r from-cyan-500 to-blue-500">
        {children}
    </div>
}