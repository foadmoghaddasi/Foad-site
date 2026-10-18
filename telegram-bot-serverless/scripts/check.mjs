import { readdir, readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) await check(filename);
    else if (/\.(js|mjs)$/.test(entry.name)) {
      if (filename.startsWith(`tgcloud${path.sep}`)) {
        const source = await readFile(filename, 'utf8');
        for (const [, specifier] of source.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)) {
          if (specifier === 'sdk' || ['sdk/db', 'sdk/api', 'sdk/fetch'].includes(specifier)) continue;
          if (!specifier.startsWith('.') || !specifier.endsWith('.js')) throw new Error(`Unsupported runtime import: ${filename}: ${specifier}`);
          const resolved = path.resolve(path.dirname(filename), specifier);
          if (!resolved.startsWith(path.resolve('tgcloud') + path.sep)) throw new Error(`Import outside tgcloud: ${filename}`);
          await access(resolved);
        }
      }
      const result = spawnSync(process.execPath, ['--check', filename], { stdio: 'inherit' });
      if (result.status !== 0) process.exit(result.status ?? 1);
    }
  }
}
await check('tgcloud');
await check('scripts');
await check('tests');
await check('mini-app');
console.log('All project JavaScript syntax checks passed.');
