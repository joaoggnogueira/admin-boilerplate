export namespace App {
    export interface Admin {
        name: string
        email: string
        password: string
        _id?: any
        created: Date
        deleted: boolean
        super: boolean
    }
}