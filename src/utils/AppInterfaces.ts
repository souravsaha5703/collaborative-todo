export interface User{
    id: string,
    fullname: string,
    status: boolean,
    email: string,
    emailVerification: boolean,
}

export interface AlertDialogError{
    title: string,
    description: string
}