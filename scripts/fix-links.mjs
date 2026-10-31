import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export function fixLinks(root = 'dist') {
  const files = [];
  function collect(folder) {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) collect(file);
      else if (entry.name.endsWith('.html')) files.push(file);
    }
  }
  collect(root);

  let total = 0;
  for (const file of files) {
    let count = 0;
    const html = fs.readFileSync(file, 'utf8').replace(/<a\b([^>]*?)\bhref=(['"])(.*?)\2([^>]*)>/gs, (tag, before, quote, href, after) => {
      const [target, suffix = ''] = href.split(/(?=[?#])/u, 2);
      if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(target) || !target.endsWith('index.html')) return tag;
      const targetFile = path.resolve(path.dirname(file), target);
      const relative = path.relative(path.dirname(file), path.dirname(targetFile)).replaceAll(path.sep, '/');
      const directoryHref = relative ? `${relative}/` : './';
      count++;
      return `<a${before}href=${quote}${directoryHref}${suffix}${quote}${after}>`;
    });
    if (count) {
      fs.writeFileSync(file, html);
      total += count;
      console.log(`${path.relative(root, file).replaceAll(path.sep, '/')} ${count}`);
    }
  }
  console.log(`Total: ${total}`);
  return total;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  fixLinks(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist'));
}
