

export default function SubmitButton({text}) {

    return <button data-testid="submit" type="submit" className="grow h-[40px] bg-blue-500 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">{text}</button>;

}