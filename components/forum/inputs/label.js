
export default function Label({htmlFor, label}) {

    return <label htmlFor={htmlFor} className="mt-10 mb-1">{label}</label>;
}