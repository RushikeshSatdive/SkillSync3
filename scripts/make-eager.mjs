/* Generates src/App.eager.jsx — App.jsx with lazy() swapped for static imports,
   so the headless smoke test actually renders every page body. */
import fs from 'node:fs'

const src = fs.readFileSync('src/App.jsx', 'utf8')

const imports = [...src.matchAll(/const (\w+) = lazy\(\(\) => import\('\.\/pages\/(\w+)'\)\)/g)]
const names = imports.map((m) => m[1])

let out = src
for (const [, name, file] of imports) {
  out = out.replace(new RegExp(`const ${name} = lazy\\(\\(\\) => import\\('\\./pages/${file}'\\)\\)`), '')
}

out = out.replace(
  "import { lazy, Suspense, useEffect } from 'react'",
  "import { Suspense, useEffect } from 'react'",
)
out = out.replace(
  "import Landing from './pages/Landing'",
  "import Landing from './pages/Landing'\n" + imports.map(([, n, f]) => `import ${n} from './pages/${f}'`).join('\n'),
)
out = out.replace(/<Suspense fallback=\{<PageLoader \/>}>/, '<Suspense fallback={<div />}>')

fs.writeFileSync('src/App.eager.jsx', out)
console.log(`wrote src/App.eager.jsx with ${names.length} eager pages`)
