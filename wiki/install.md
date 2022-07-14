# How To Install

This is _not_ a module designed to be used with NodeJS even though it is published on NPM. It is intended to be used with Deno. The best way to use this module is to import the bundled TypeScript file[^1] directly from your Deno project via [`unpkg.com`](https://unpkg.com) from `https://unpkg.com/@jcbhmr/execsh-deno`.

```ts
// Import from unpkg.com CDN
import $ from "https://unpkg.com/@jcbhmr/execsh-deno@1"
```

[^1]: There is a build step since we use `deps.importmap` to manage dependencies
