// noinspection ES6UnusedImports

import JSX = preact.JSX

declare global {
  interface Window {
    sha1: (input: string) => string,
  }
}