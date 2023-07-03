import { useNotification } from "@kyvg/vue3-notification";

export function useToast() {

    const { notify } = useNotification()

    function success(title: string, text: string) {
        notify({ title, ignoreDuplicates: true, text, type: "success" });
    }

    function error(text: string) {
        notify({ text, ignoreDuplicates: true, type: "error" })
    }

    return { success, error }
}