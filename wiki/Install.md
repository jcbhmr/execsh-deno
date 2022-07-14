# How To Install

Guess what? You don't need to install anything!

You can use this module by importing it from the `unpkg.com` CDN via <https://unpkg.com/@jcbhmr/execsh-deno> (with an optional `@vX.X.X` version suffix) and using it directly in Deno code.

**⚠️ Note:** You cannot use this module with NodeJS! It uses the global `Deno.run()` function which is unavailable in Node contexts. Add a 👍 on [issue #5](https://github.com/jcbhmr/execsh-deno/issues/5) if you want to see NodeJS support!

```ts
// Import from unpkg.com CDN
import $ from "https://unpkg.com/@jcbhmr/execsh-deno@1"
```
