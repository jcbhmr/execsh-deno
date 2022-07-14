# `ShellResponse`

## Highlights

### `.text()` and `.json()`

Gets _only the `stdout` stream_ as a string (after the process finishes). The `.json()` method just parses it as JSON right after calling `this.text()`

```ts
const text = await $`npm install`.text()
// Will print out same message as if you just typed 'npm install' in the shell itself
// without colors enabled
console.log(text)
```

```ts
// Use this with a special Parcel JSON reporter!
// https://parceljs.org/plugin-system/reporter/#example
const report = await $`npx parcel`.json()
if (report.find((item) => "error" in item)) {
    console.warn(`Uh oh! Looks like Parcel failed! Continuing anyways...`)
}
```

### `.ok`

Shortcut to see if the command exited with a `0` status code. Remember, `0` means everything went OK, and anything means something went wrong! Usually scripts will have custom error codes that mean certain things.

```ts
assert(await $`git clone https://notadomain.orgg`.ok)
```

### `.statusText`

This is a shortcut that captures all the `stderr` messages into a single string. This can be useful when compiling an error message without needing to do some fancy stream processing just to access the error message from the command!

```ts
const response = $`git clone ${"https://notadomain.orgg"}`
if (!await response.ok) {
    throw new Error(`${response.command} exited with ${await response.status} and message ${await response.statusText}`)
}

// Continue on knowing that 'git clone' succeeded
```

## TypeScript interface

```ts
interface ShellResponse extends Body {
    readonly command: string
    readonly headers: Headers
    readonly stdout: ReadableStream<Uint8Array>
    readonly stderr: ReadableStream<Uint8Array>
    readonly status: Promise<number>
    readonly ok: Promise<boolean>
    readonly statusText: Promise<string>
}
```
