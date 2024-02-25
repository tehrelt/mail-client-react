import {useSelector} from 'react-redux'

interface Auth {
    isAuth: boolean
    email: string
}

export function useAuth(): Auth {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {email} = useSelector(state => state.user)


    return {
        isAuth: !!email,
        email
    }
}