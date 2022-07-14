import assert from "assert"
import shellEscape from "shell-escape"
import ShellResponse from "./shell-response.ts"

// Can only be run in Deno
assert("Deno" in globalThis)

export default function execsh(strings: TemplateStringsArray, ...inserts: Array<unknown>) {
    const command = inserts.flatMap((insert, index) => [strings[index], shellEscape(String(insert))]).concat([strings.at(-1)]).join(" ")

    const childProcess = Deno.run({
        cmd: [shell, "-c", prefix + command],
        stdout: "piped",
        stderr: "piped",
        // Foward cwd and env variables
        cwd: Deno.cwd(),
        env: Deno.env.toObject(),
    })
    const response = new ShellResponse(childProcess)
    response.command = command
    return response
}

// Only currently supported shell
const shell = `/bin/sh`
// Apply this to every command for better error handling
const prefix = `set -euo pipefail; `
