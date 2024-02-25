
interface MailMeta {
    ID: number
    SIZE: number
    UID: string
}
interface Mail {
    from: string
    to: string[]
    subject: string
    body: string
    date: string
    meta: MailMeta
}

interface Stat {
    count: number
    size: number
}