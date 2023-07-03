export const Debounce = class {
    private timeout: NodeJS.Timeout | false;
    private delay: number;
    private first: boolean;

    constructor({ delay }: { delay: number }) {
        this.timeout = false
        this.delay = delay
        this.first = true
    }
    clear() {
        if (this.timeout)
            clearTimeout(this.timeout)
    }
    do(callback: () => void, opt?: { discard_first: boolean }) {
        if (opt?.discard_first && this.first) {
            this.first = false
            return;
        }
        this.clear()
        this.timeout = setTimeout(callback, this.delay)
    }
}