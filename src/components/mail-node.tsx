
interface Props {
    mail: Mail

    onClick: (id: number) => void
}
const MailNode = ({mail, onClick}: Props) => {
    return <button className="border grid grid-cols-8 whitespace-nowrap w-full" onClick={() => onClick(mail.meta.ID)}>
        <p className="overflow-hidden">{mail.from}</p>
        <p className="col-span-2 overflow-hidden">{mail.subject}</p>
        <div className="col-span-5 text-gray-600">
            <p className="overflow-hidden col-span-5">{mail.body}</p>
        </div>

    </button>
}

export {MailNode}