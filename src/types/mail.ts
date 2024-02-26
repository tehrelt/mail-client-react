
interface MailMeta {
    ID: number
    SIZE: number
    UID: string
}

interface Attachment {
    fileName: string
    mediaType: string
    data: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Mail {
    from: string
    to: string[]
    subject: string
    body: string
    date: string
    meta: MailMeta
    attachments?: Attachment[]
}

interface Stat {
    count: number
    size: number
}