

export default function SubmitButton({text}) {

    return <button data-testid="submit" type="submit" className="h-[40px] w-full bg-blue-500 text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500">{text}</button>;

}