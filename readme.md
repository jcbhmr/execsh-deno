# `execsh()` for Deno
🐚⌨️ Execute shell commands in Deno the easy way

<br />
<div align="center">

![Example screenshot](https://user-images.githubusercontent.com/61068799/179100757-d44c5106-41a4-4d4d-a200-54a9999ff097.png)

</div>
<br />

Use an already familiar `Response`-esque API to interact with the shell!

**⚠️ Warning:** Currently only works with `/bin/sh`

## Usage

**ℹ** More docs are available on [the Wiki](https://github.com/jcbhmr/execsh-deno/wiki)

To start using, import the module and call the default export as a tagged template function. The inserted `${variable}`s are auto-coerced to strings and escaped with the `$'fancy "text in# here!@* '` method.

```ts
// These will be properly escaped
execsh`rollup -c ${Deno.args[3]}`
execsh`cp ${source} ${destination}`
```

The properties on the returned `ShellResponse` object are similar to the `Response` API. All the same `.body`, `.text()`, `.json()` methods are still there. The one tweak is that the `.ok`, `.status`, and `.statusText` properties all return `Promise`s now. This is because the status code of a shell command is not determined until it has finished.

**ℹ** You can read more about each particular difference on [the Wiki](https://github.com/jcbhmr/execsh-deno/wiki)

### Installation

**ℹ** More docs are available on [the Wiki](https://github.com/jcbhmr/execsh-deno/wiki)

There is no installation! Just import the HTTP URL in your Deno script, plop a `#! /usr/bin/env -S deno run --allow-all` at the top, and you're good to go!

```ts
#! /usr/bin/env -S deno run --allow-all

import $ from "https://esm.sh/@jcbhmr/execsh"

console.debug(`Trying out 'printenv': `, await (await $`printenv`).text())
console.debug(`This command should fail: `, await (await $`not-a-command`).status)
```
