
interface MailMeta {
    ID: number
    SIZE: number
    UID: string
}

interface BodyType {
    contentType: string
    charset: string
    body: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Mail {
    from: string
    to: string[]
    subject: string
    body: BodyType[]
    date: string
    meta: MailMeta
}

interface Stat {
    count: number
    size: number
}