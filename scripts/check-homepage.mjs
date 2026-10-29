import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html = fs.readFileSync('dist/index.html', 'utf8');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
assert.ok(title.length <= 60, `Title is ${title.length} characters`);
assert.ok(description.length >= 70 && description.length <= 160, `Description is ${description.length} characters`);
assert.equal((html.match(/<h1>/g) || []).length, 1);
assert.match(html, /<h1>Azeroth Survivors:/);
assert.match(html, /<h2>Azeroth Survivors class finder<\/h2>/);
assert.match(html, /<link rel="canonical" href="https:\/\/azerothsurvivors.shop\/">/);
const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const plain = main.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/g, '').replace(/<[^>]+>/g, ' ');
const countWords = value => (decode(value).match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || []).length;
const words = countWords(plain);
const expandedWords = countWords(main.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/g, '').replace(/<details>[\s\S]*?<\/details>/g, '').replace(/<[^>]+>/g, ' '));
assert.ok(words >= 1200 && words <= 1800, `${words} words in main content`);
assert.ok(expandedWords >= 1200, `${expandedWords} words outside collapsed FAQ`);
assert.match(main, /<img [^>]*alt="[^"]+"[^>]*width="1536" height="1024"/);
assert.ok(!main.includes('has passed Cloudflare scanning'), 'Do not present an unverified scan as certification');

// Exercise the shipped event handlers with the recommendation cards from the HTML.
const handlers = {};
const form = { elements: { goal: { value: 'first-clear' } }, addEventListener: (event, handler) => { handlers[event] = handler; } };
const status = { textContent: '' };
const picks = [...html.matchAll(/<article class="class-pick" data-goal="([^"]+)"><h3>([^<]+)<\/h3>/g)].map(([, goal, label]) => ({ dataset: { goal }, hidden: false, querySelector: () => ({ textContent: label }) }));
assert.equal(picks.length, 3);
const document = {
  querySelector: selector => ({ '#class-finder-form': form, '#class-finder-status': status })[selector] || null,
  querySelectorAll: selector => selector === '.class-pick' ? picks : [],
};
vm.runInNewContext(fs.readFileSync('dist/assets/site.js', 'utf8'), { document });
for (const [goal, expected] of [['first-clear', 'Warrior or Paladin'], ['ranged', 'Hunter or Warlock'], ['burst', 'Mage or Rogue']]) {
  form.elements.goal.value = goal;
  let prevented = false;
  handlers.submit({ preventDefault: () => { prevented = true; } });
  assert.ok(prevented, 'Finder must answer on the same page');
  assert.equal(picks.filter(pick => !pick.hidden).length, 1);
  assert.ok(status.textContent.includes(expected), goal);
}
handlers.reset();
assert.ok(picks.every(pick => !pick.hidden));
console.log(`PASS: title ${title.length} chars; description ${description.length} chars; main ${words} words (${expandedWords} outside collapsed FAQ); all three class choices and reset work.`);
