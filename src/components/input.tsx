
interface Props {
    label: string
    value: string
    type: string
    onChange: (value: string) => void
    name: string
}

const Input = ({name, label, value, type, onChange}: Props) => {
    return <>
        <span className="my-auto">{label}</span>
        <input className="p-2"
               name={name}
               type={type}
               value={value}
               onChange={(event) => onChange(event.target.value)}/>
    </>
}

export {Input}