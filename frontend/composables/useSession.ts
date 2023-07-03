
export function useSession() {

    function set_session(token: string) {
        localStorage.setItem("session", token)
    }

    function is_logged_in() {
        return !!localStorage.getItem("session")
    }

    function token() {
        return localStorage.getItem("session")
    }

    function clear_session() {
        localStorage.removeItem("session")
    }

    return { set_session, is_logged_in, clear_session, token }
}