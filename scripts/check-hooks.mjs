// Fails when this package's CSS uses a Tessera hook that the installed Tessera does not have:
// a host class (.tes-card), a part ([data-tes-part='header']) or a token (--tes-button-radius).
// Tessera versions these hooks, so a miss means a typo or a breaking Tessera release.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const TESSERA = 'node_modules/@brunogutierre/tessera';
const OURS = 'projects/brunogutierre/tessera-themes/styles';

const files = (dir, ext) =>
  readdirSync(dir, { recursive: true })
    .filter((f) => f.endsWith(ext))
    .map((f) => readFileSync(join(dir, f), 'utf8'))
    .join('\n');
const all = (text, re) => new Set([...text.matchAll(re)].map((m) => m[1]));

const fesm = files(join(TESSERA, 'fesm2022'), '.mjs');
const tessera = {
  class: new Set([...all(fesm, /classAttribute: "([^"]+)"/g)].flatMap((c) => c.split(' '))),
  // Inline templates keep their quotes; templateUrl ones are JS strings with escaped quotes.
  part: all(fesm, /data-tes-part=\\?"([a-z-]+)/g),
  token: all(fesm + files(join(TESSERA, 'styles'), '.css'), /(--tes-[a-z0-9-]+)/g),
};

const css = files(OURS, '.css').replace(/\/\*[\s\S]*?\*\//g, '');
const used = {
  class: all(css, /\.(tes-[a-z0-9-]+)/g),
  part: all(css, /data-tes-part\s*[~|^$*]?=\s*['"]?([a-z-]+)/g),
  token: all(css, /(--tes-[a-z0-9-]+)/g),
};

const missing = Object.entries(used).flatMap(([kind, names]) =>
  [...names].filter((n) => !tessera[kind].has(n)).map((n) => `${kind} ${n}`),
);
if (missing.length) {
  console.error(`Tessera hooks not found in ${TESSERA}:\n- ${missing.join('\n- ')}`);
  process.exit(1);
}
const count = Object.values(used).reduce((n, s) => n + s.size, 0);
console.log(`All ${count} Tessera hooks used by the themes exist.`);
