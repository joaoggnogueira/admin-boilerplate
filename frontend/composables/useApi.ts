import axios, { AxiosError } from 'axios';

console.log("MUDA VERSÃO 1")

const apiBase = () => ({
}[window.origin])

const $axios = axios.create({
    baseURL: apiBase() || 'http://localhost:5001/',
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
})

interface apirequestoptions {
    retrieveErrors?: boolean
}

export function useApi() {

    function getBaseUrl() {
        return apiBase() || 'http://localhost:5001/';
    }

    function treatError(e: AxiosError) {
        if (e.response) {
            if (e.response.status == 401) {
                alert("Sessão não encontrada");
                useSession().clear_session()
                navigateTo("/login")
                return
            } else if (e.response.status == 404 && !e.response.data) {
                alert("Endpoint não encontrada");
                return
            }
            if (e.response.data) {
                const errors = (e.response.data as any).errors
                if (Array.isArray(errors)) {
                    alert(errors.map(d => d.msg).join(" | ") || "");
                } else {
                    const data: any = e.response.data;
                    alert((data.message || data || ""));
                }
            } else {
                alert("Erro " + (e.response.status || "") + ": " + e.response.statusText);
            }
        } else {
            alert("Erro " + e.status + ": " + e.message);
        }

    }

    async function post(path: string, body: object, opt?: apirequestoptions) {
        console.log("POST " + path + " as " + (process.client ? 'client' : 'server'))
        let data = null
        let error = null
        try {
            const apiresponse = await $axios.post(path, body)
            data = apiresponse.data;
        } catch (e: any) {
            treatError(e)
            error = e
        }
        if (opt?.retrieveErrors) {
            return { error, data }
        }
        return data
    }

    async function get(path: string, opt?: apirequestoptions) {
        console.log("GET " + path + " as " + (process.client ? 'client' : 'server'))
        let data = null;
        let error = null
        try {
            const apiresponse = await $axios.get(path)
            data = apiresponse.data;
        } catch (e: any) {
            treatError(e)
            error = e
        }
        if (opt?.retrieveErrors) {
            return { error, data }
        }
        return data;
    }

    return { post, get, getBaseUrl }
}