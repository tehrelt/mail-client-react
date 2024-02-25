
interface Props {
    label: string
    value: string
    type: string
    onChange: (value: string) => void
    name: string
}

const Input = ({name, label, value, type, onChange}: Props) => {
    return <>
        <span htmlFor={name} className="my-auto">{label}</span>
        <input className="p-2"
               type={type}
               value={value}
               onChange={(event) => onChange(event.target.value)}/>
    </>
}

export {Input}