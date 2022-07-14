export { ShellResponse as default }
export type { ShellResponseOptions }

class ShellResponse implements Body {
    readonly command: string
    readonly headers: Headers
    readonly stdout: ReadableStream<Uint8Array>
    readonly stderr: ReadableStream<Uint8Array>
    #childProcess: Deno.Process
    bodyUsed = false
    constructor(childProcess: Deno.Process, { signal }: ShellResponseOptions = {}) {
        this.command = ""
        this.#childProcess = childProcess
        this.headers = new Headers({
            pid: this.#childProcess.pid,
            rid: this.#childProcess.rid,
        })
        this.stdout = this.#childProcess.stdout.readable
        this.stderr = this.#childProcess.stderr.readable

        signal?.addEventListener("abort", (event) => {
            if (!event.isTrusted) {
                return
            }

            this.#childProcess.kill("SIGINT")
            this.#childProcess.close()
        })
        childProcess.status().then(() => {
            this.bodyUsed = true
        })
    }

    get body() {
        return this.stdout
    }
    async arrayBuffer() {
        return await this.#childProcess.output()
    }
    async blob() {
        return new Blob([await this.arrayBuffer()])
    }
    async text() {
        return new TextDecoder().decode(await this.arrayBuffer())
    }
    async json() {
        const text = await this.text()
        return JSON.parse(text)
    }
    async formData(): Promise<FormData> {
        throw new Error(`Not implemented`)
    }

    get status() {
        return this.#childProcess.status().then(($) => $.code)
    }
    get ok() {
        return this.#childProcess.status().then(($) => $.success)
    }
    get statusText() {
        return this.#childProcess.stderrOutput()
    }
}

interface ShellResponseOptions {
    signal?: AbortSignal
}
