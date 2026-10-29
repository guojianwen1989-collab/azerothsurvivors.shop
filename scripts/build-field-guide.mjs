import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

// Keep the supplied copy verbatim; reference placeholders have no attached sources.
const copy = fs.readFileSync(new URL('./field-guide-copy.txt', import.meta.url), 'utf8').replace(/\r/g, '');
const paragraphs = copy.split('\n').map(p => p.trim());
const clean = text => text.replace(/\[reference:\d+\]/g, '');
const esc = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const exact = start => {
  const found = paragraphs.find(p => p.startsWith(start));
  assert.ok(found, `Missing supplied paragraph: ${start}`);
  return clean(found);
};
const p = start => `<p>${esc(exact(start))}</p>`;
const text = value => `<p>${esc(value)}</p>`;
const list = (items, ordered = false) => `<${ordered ? 'ol' : 'ul'}>${items.map(item => `<li>${esc(item)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`;
const links = items => `<ul>${items.map(([label, href]) => `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ul>`;
const section = (heading, body) => `<section><h2>${esc(heading)}</h2>${body}</section>`;
const box = (heading, body) => `<aside class="guide-callout" aria-label="${esc(heading)}"><h2>${esc(heading)}</h2>${body}</aside>`;
const table = (headers, rows) => `<div class="guide-table-wrap" tabindex="0" role="region" aria-label="${esc(headers.join(' / '))}"><table class="guide-table"><thead><tr>${headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const builds = ['Builds', '/guide/builds/'];
const tiers = ['Tier list', '/guide/tier-list/'];
const safety = ['Safety check', '/guide/is-it-safe/'];
const download = ['Download & fixes', '/guide/download/'];
const talents = ['Talent tree', '/guide/talent-tree/'];
const luck = ['Luck', '/guide/luck/'];
const official = ['Official entry point', '/guide/official-website/'];
const classLink = name => [name, `/guide/builds/${name.toLowerCase()}/`];
const passives = copy.split('\n').filter(line => /^[1-5]\. /.test(line)).map(line => clean(line).replace(/^\d\. /, ''));
assert.equal(passives.length, 5);

export function buildFieldGuide(root) {
  const origin = 'https://azerothsurvivors.shop';
  const routes = [];
  const template = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const header = `<header class="site-header"><div class="shell header-inner"><a class="brand" href="/" aria-label="Azeroth Survivors guide home"><span class="brand-mark" aria-hidden="true">✦</span><span>AZEROTH <em>SURVIVORS</em><small>UNOFFICIAL FIELD GUIDE</small></span></a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span><span></span></button><nav id="primary-nav" class="nav" aria-label="Main navigation"><a href="/guide/what-is-azeroth-survivors/">Start here</a><a href="/guide/builds/">Builds</a><a href="/guide/tier-list/">Tier list</a><a href="/guide/download/">Download & fixes</a></nav><a class="button button-small button-gold" href="https://wow.aethus.pl/" target="_blank" rel="noopener noreferrer">Creator’s game ↗</a></div></header>`;
  const footer = `<footer class="site-footer"><div class="shell footer-grid"><div><a class="brand" href="/">AZEROTH SURVIVORS</a><p>Independent, unofficial field guide. Original illustrations are not gameplay screenshots.</p></div><div><h2>Guides</h2><a href="/guide/">Guide library</a><a href="/guide/builds/">All nine class builds</a><a href="/guide/is-it-safe/">Safety check</a></div><div><h2>Community</h2><a href="/guide/reddit/">Reddit</a><a href="/guide/discord/">Discord</a><a href="/guide/official-website/">Official entry point</a></div></div><div class="shell footer-bottom"><span>© 2026 Azeroth Survivors Guide</span></div></footer>`;
  function add(route, metadata, intro, sections = [], related = []) {
    const [title, description, h1] = metadata;
    const url = origin + route;
    const tracking = (template.match(/<meta name="google-site-verification"[^>]+>/)?.[0] || '') + (template.match(/<script async src="https:\/\/www.googletagmanager.com[\s\S]*?<\/script>\s*<script>[\s\S]*?<\/script>/)?.[0] || '');
    const body = (route === '/' ? '' : intro) + sections.join('') + (related.length ? section('Related guides', links(related)) : '');
    const html = `<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${url}"><meta property="og:type" content="${route === '/' ? 'website' : 'article'}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/hero.webp"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${origin}/assets/hero.webp"><meta name="theme-color" content="#101915"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/style.css"><script defer src="/assets/site.js"></script><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type': route === '/' ? 'WebSite' : 'Article', inLanguage:'en-US', headline:h1, name:title, description, url, dateModified:'2026-10-29', mainEntityOfPage:url, publisher:{'@type':'Organization', name:'Azeroth Survivors Guide'}})}</script>${tracking}</head><body><a class="skip-link" href="#main">Skip to content</a>${header}<main id="main" class="field-guide"><section class="guide-hero"><div class="shell"><p class="eyebrow">INDEPENDENT · UNOFFICIAL FIELD GUIDE</p><h1>${esc(h1)}</h1><p class="updated">Last updated: <time datetime="2026-10-29">October 29, 2026</time></p></div></section><div class="shell guide-layout"><nav class="guide-toc" aria-label="Guide topics"><h2>Field guide</h2>${[['What is Azeroth Survivors?', '/guide/what-is-azeroth-survivors/'], ['How to play', '/guide/how-to-play/'], builds, tiers, download, safety, talents, luck].map(([label, href]) => `<a href="${href}"${href === route ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav><article class="guide-content">${body}</article></div></main>${footer}</body></html>`;
    const file = path.join(root, route, 'index.html');
    fs.mkdirSync(path.dirname(file), {recursive:true});
    const output = route === '/' ? html.replace('class="field-guide"', 'class="field-guide field-guide-home"').replace(`<h1>${esc(h1)}</h1>`, `<h1>${esc(h1)}</h1><div class="home-intro">${intro}</div>`) : html;
    fs.writeFileSync(file, output.replace('<body>', '<body class="field-guide-page">'));
    // Finish and check each page before creating the next one.
    const saved = fs.readFileSync(file, 'utf8');
    assert.equal((saved.match(/<h1>/g) || []).length, 1, route);
    assert.ok(saved.includes(`<title>${esc(title)}</title>`) && saved.includes(`content="${esc(description)}"`) && saved.includes(`<h1>${esc(h1)}</h1>`), route);
    assert.ok(!saved.includes('[reference:'), route);
    routes.push(route.slice(1));
    console.log(`Completed and checked: ${route}`);
  }
  function metadata(titleStart) {
    const index = copy.indexOf(`Title：${titleStart}`);
    assert.ok(index >= 0, titleStart);
    const tail = copy.slice(index);
    return [tail.match(/^Title：([^\n]+)/)[1], tail.match(/Meta Description：([^\n]+)/)[1], tail.match(/H1：([^\n]+)/)[1]];
  }

  add('/', metadata('Azeroth Survivors — Independent'), p('Azeroth Survivors is a free, fan-made browser roguelike by Aethus.') + p('This site is an independent, unofficial field guide.'), [
    section('Choose your next step', `<div class="reading-grid">${[
      ['Start here — what the game is and how to get into your first run', '/guide/what-is-azeroth-survivors/'],
      ['Builds — the three-phase rule and every class page', '/guide/builds/'],
      ['Tier list — which class to pick for your first clear', '/guide/tier-list/'],
      ['Download & fixes — browser, Windows, black screen, slow load', '/guide/download/'],
    ].map(([label, href]) => `<a class="reading-card" href="${href}"><h3>${label}</h3><b>Read guide →</b></a>`).join('')}</div>`),
    section('First 10 minutes', p('Load the game in Chrome or Edge.')),
    section('Before you download', p('Before you download anything, read the safety page.') + links([safety]) + text('Source note: the supplied scan claim has no dated report attached; see the safety page for the evidence limit.')),
  ]);
  add('/guide/what-is-azeroth-survivors/', metadata('What Is Azeroth Survivors?'), p('Azeroth Survivors is a free, fan-made browser roguelike created by Aethus.'), [
    section('Quick facts', table(['Fact', 'Details'], [['Developer','Aethus'],['Price','Free'],['Platform','Browser (WebGPU) / Windows build'],['Account required','No'],['Run length','~16 min'],['Classes','9']])),
    section('What it is not', p('It is not a private server,')),
    section('The core loop', p('The loop is survivors-like:')),
    section('What you need', p('The real requirement is WebGPU.')),
  ], [['How to play','/guide/how-to-play/'], download, tiers]);
  const steps = ['Go to Aethus', 'For a first clear, Warrior', 'Your first six levels', 'Push your best area spell', 'Your slots are full.', 'Check Collection, Armory'];
  add('/guide/how-to-play/', metadata('How to Play Azeroth Survivors'), '', [
    ...steps.map((start, i) => section(exact(`Step ${i + 1} —`), p(start))),
    section('First-run checklist', `<ul class="first-run-checklist">${['Open the maintained entry point and focus the canvas.', 'Pick Warrior or Paladin for a forgiving first clear.', 'Minutes 0–3: establish area damage before the first boss.', 'Minutes 3–8: one carry, one survival tool; reroll in the level 6–12 window.', 'Minutes 8–15: prioritize carry rank-ups and cooldown reduction.', 'Between runs: check Collection, Armory and Talents.'].map(item => `<li><label><input type="checkbox"> ${item}</label></li>`).join('')}</ul>`),
    section('Common first-run mistakes', list(['Reloading during first load.', 'Playing on a laptop trackpad without clicking the canvas.', 'Taking single-target cards before an area tool.', 'Spending rerolls in the first three levels.'])),
  ], [['What is Azeroth Survivors?', '/guide/what-is-azeroth-survivors/'], builds, tiers]);
  add('/guide/download/', metadata('Azeroth Survivors Download'), box('Before you download', text('We do not host game files, mirrors, modified executables, trainers or "unlock all" saves. Official entry point only; see the safety page for how to spot lookalikes.') + links([safety])), [
    section('Browser version', p('The maintained way to play') + links([['Play on Aethus’s site', 'https://wow.aethus.pl/']])),
    section('Windows version', p('A Windows build exists')),
    section('Fixes: black screen', p('Black screen at launch')),
    section('Fixes: slow first load', p('The first resource pull')),
    section('Fixes: no WebGPU', text('If the loader reports no WebGPU, update the browser and check that hardware acceleration is on — do not download a "fix" from a third-party site for this.')),
  ], [safety, ['What is it?', '/guide/what-is-azeroth-survivors/']]);
  add('/guide/is-it-safe/', metadata('Is Azeroth Survivors Safe?'), box('Short answer', p('The official entry point —')), [
    section('Evidence note', text('The supplied copy reports a previous scan, but no scan URL, scan ID or timestamp was supplied. We have not independently confirmed that verdict or the cited third-party domain-age review. Do not treat either statement as a current security certification.')),
    section('Why third-party sites get flagged', p('Independent fan sites around this game')),
    section('Lookalike warning signs', list(['The page offers a .rar download instead of sending you to the developer’s site or an official build.', 'The domain is a near-miss of the game name — extra hyphen, plural, .org or .shop instead of the real one.', 'The site embeds a different browser game on the same page to keep you there.', 'It asks for payment, account credentials or a "verification" download before play.', 'It redirects you away from the developer’s domain when you click Play.'])),
    section('Before downloading', list(['Confirm the domain matches the entry point you already know.', 'Do not enter personal or payment details on a fan page.', 'Verify any sponsored outbound link before downloading from it.', 'If you already have progress, note that switching domains can wipe local save data — this is a known consequence of moving between mirrors and the official site.'])),
    section('What the scan actually checked', text('Cloudflare URL Scanner reports malicious-content verdicts, redirects, network requests and TLS certificate information. Inspect HSTS in the response headers of the specific report; do not assume it was enabled or passed. A valid certificate or HSTS setting protects a connection, not the safety of every file or sponsored destination.') + links([['Cloudflare URL Scanner documentation', 'https://developers.cloudflare.com/radar/investigate/url-scanner/']]) + text('An archive extension alone is not a malware verdict. The developer’s own Windows package may also be an archive; verify the source domain and link chain. This .shop domain is an unofficial guide, not the game host.')),
  ], [download, official]);
  const classNames = ['Warrior','Paladin','Hunter','Warlock','Mage','Rogue','Priest','Shaman','Druid'];
  const summaries = [
    'largest health pool, Whirlwind capstone, most forgiving melee.',
    'Consecration, shields, self-heal, 90-second death save. Easiest first clear.',
    'ranged safety, free pet damage, Explosive Trap / Beast Mastery as the S-tier shell.',
    'DoTs that corpse-hop, demon pets, self-healing; snowballs once talents come online. Soul Link / Drain Soul.',
    'fastest screen-clear, three strong capstones, no pets to hide behind. Frostbite / Shatter.',
    'boss-melting burst, lowest mistake tolerance.',
    'steady sustain, slower vs dense waves.',
    'Chain Lightning scales with dense waves but lowest raw-damage breakdown, most source-dependent.',
    'flexible kit, mid damage, viable with good talent luck.',
  ];
  add('/guide/builds/', metadata('Azeroth Survivors Builds'), p('Every level-up deals three cards.'), [
    section('Passive priority', list(passives, true)),
    section('Stat caps', p('Armor caps at 60%.') + p('Crit past 100%') + p('Echo past 100%')),
    section('Choose your class build', `<div class="reading-grid">${classNames.map((name, i) => `<a class="reading-card" href="/guide/builds/${name.toLowerCase()}/"><h3>${name}</h3><p>${summaries[i]}</p><b>Read ${name} build →</b></a>`).join('')}</div>`),
    section('Reading a level-up hand', table(['Card type','Weight'], [['Rank-up for owned spell','1.2'],['New spell','1.0'],['Rank-up for owned passive','0.8'],['New passive','0.5']])),
  ], [tiers, talents, luck]);
  const tierRows = copy.slice(copy.indexOf('Class\tRange\tTier\tWhy')).split('\n').slice(1,10).map(line => line.split('\t'));
  assert.equal(tierRows.length, 9);
  assert.ok(tierRows.every(row => row.length === 4));
  add('/guide/tier-list/', metadata('Azeroth Survivors Tier List'), box('Alpha disclaimer', p('This game is in active alpha.')), [
    section('Class rankings by role', table(['Class','Range','Tier','Why'], tierRows) + text(exact('表格下方一行：Sources disagree mid-table').replace('表格下方一行：', ''))),
    section('Pick for your goal', p('First clear →') + p('Power ceiling →') + p('Highest burst, lowest tolerance →')),
  ], [builds, ...classNames.map(classLink)]);

  const classDetails = {
    Hunter: {
      intro: exact('Hunter is the safest'), title: metadata('Azeroth Survivors Hunter Build'),
      phases: ['Take Volley if it appears; otherwise take any area card to turn the spawn curve into experience. Do not commit to single-target yet.', 'Commit to Explosive Trap as the carry. Add exactly one survival tool. Beast Mastery is the preferred second commitment because the pet keeps working while you dodge.', 'Rank-ups only on the carry, then cooldown reduction. Bosses resist control; burst windows matter more than extra slows.'],
      boss: "Hunter's advantage is that the pet maintains pressure during your repositioning. Keep the boss between you and the pet, and do not burn the mobility spell to chase damage.",
      mistakes: 'Taking single-target crit cards before Volley or Explosive Trap is online. Standing still to "let the pet tank". Spending rerolls in the first three levels instead of the 6–12 window.',
      skills: ['Volley for early area coverage.', 'Explosive Trap as the carry.', 'Beast Mastery for pet damage.', 'One survival tool, then carry ranks and cooldown reduction.'],
      faq: [['Is Hunter suitable for beginners?','Ranged safety and pet damage make it forgiving, but keep moving and establish area coverage first.'],['When should I take Explosive Trap?','Commit to it as your carry during minutes 3–8; do not delay early area coverage while waiting for it.'],['Is Beast Mastery worth it?','It is the preferred second commitment because the pet keeps dealing damage while you dodge.'],['What is Hunter’s weakness?','A single-target start without area coverage loses wave tempo. Standing still also wastes its repositioning advantage.']],
    },
    Warrior: {start:'Warrior is the most forgiving melee:', suffix:'Whirlwind, Arms & Execute', phases:['Take an area card to support cleave; use the health pool to learn movement, not to stand still.', 'Commit to Whirlwind for waves. Use the Arms / Execute / Mortal Strike direction when offered, with one survival tool.', 'Rank up the carry first, then cooldown reduction; use burst windows on bosses.'], boss:'Keep moving around caster packs. Approach the boss with room to circle rather than trading every hit.', mistakes:'Standing in caster packs. Treating the largest health pool as permission to stop moving. Splitting ranks across every damage card.', skills:['Early area coverage and cleave.', 'Whirlwind carry.', 'Arms / Execute / Mortal Strike direction when available.', 'One survival tool.']},
    Paladin: {start:'Paladin is the easiest first clear', suffix:'Consecration, Shields & Sustain', phases:['Establish Consecration for persistent wave coverage.', 'Commit ranks to Consecration and select one survival tool; use shields or self-heal to cover the weakest phase.', 'Rank up Consecration, then cooldown reduction. Preserve movement for boss attacks.'], boss:'The once-per-90-second death save covers one mistake, not every wave. Keep an escape route even when it is available.', mistakes:'Relying on the death save instead of dodging. Taking single-target damage before Consecration is online. Neglecting movement.', skills:['Consecration.', 'One shield, self-heal or movement tool.', 'Carry rank-ups.', 'Cooldown reduction.']},
    Warlock: {start:'Warlock is an S-tier snowball.', suffix:'Soul Link & Drain Soul', phases:['Take Rain of Fire or another area card so the early wave produces experience.', 'Commit to the Soul Link / Drain Soul shell, with one survival tool. Let DoTs and demon pets maintain damage while you move.', 'Rank up the carry, then cooldown reduction. Do not add extra control at the expense of boss burst.'], boss:'Keep DoTs and demon damage working while repositioning. Self-healing does not remove the need to dodge.', mistakes:'Expecting the full snowball before talents are online. Standing still for damage. Dividing ranks among too many spells.', skills:['Rain of Fire or early area coverage.', 'Soul Link / Drain Soul shell.', 'One survival tool.', 'Carry ranks and cooldown reduction.']},
    Mage: {start:'Mage has the fastest screen-clear', suffix:'Frostbite & Shatter', phases:['Take Blizzard or another area spell immediately to keep the wave under control.', 'Commit to Frostbite / Shatter and one survival tool; protect room to reposition.', 'Rank up the carry and cooldown reduction. Boss control resistance makes extra slows a lower priority.'], boss:'There is no pet to hide behind. Move before the wave closes and use open burst windows instead of relying on control chains.', mistakes:'Taking another damage multiplier before a survival buffer. Missing a reposition. Assuming wave-clear makes the boss harmless.', skills:['Blizzard or early area coverage.', 'Frostbite / Shatter shell.', 'One survival buffer.', 'Carry rank-ups and cooldown reduction.']},
    Rogue: {start:'Rogue melts bosses', suffix:'Burst & Deliberate Circling', phases:['Take an area card before single-target burst so the first wave stays manageable.', 'Commit to one carry and one survival or movement tool. Circle deliberately so enemies cannot close from two sides.', 'Rank up the carry, then cooldown reduction; concentrate burst into boss openings.'], boss:'Circle with an exit in view. The burst payoff is strongest when you can keep attacking without being surrounded.', mistakes:'Letting waves close from two sides. Prioritizing single-target cards before area coverage. Using mobility to chase damage.', skills:['Early area coverage.', 'One burst carry.', 'One survival or movement tool.', 'Carry ranks and cooldown reduction.']},
    Priest: {intro:'Priest brings steady sustain, but clears dense waves more slowly. Build the first minutes around area coverage so sustain buys time for damage instead of leaving a growing pack alive. It is a B-tier ranged choice for players who prefer a steadier run and can keep the wave moving.', suffix:'Steady Sustain & Wave Coverage', phases:['Take an area card; sustain alone does not turn dense waves into experience.', 'Commit to the best area carry in your hand and one survival tool. Avoid spreading ranks across several weak attacks.', 'Rank up the carry first, then cooldown reduction. Preserve space so the slower clear does not become a surround.'], boss:'Use sustain to recover between openings while moving. Keep the surrounding wave controlled before committing to boss damage.', mistakes:'Assuming sustain solves low wave damage. Taking several defensive tools instead of ranking the carry. Letting dense packs surround you.', skills:['Early area coverage.', 'One area carry.', 'One sustain or survival tool.', 'Carry ranks and cooldown reduction.']},
    Shaman: {intro:'Shaman’s Chain Lightning scales with dense waves, but Shaman ranks lowest in raw-damage breakdowns and is the most source-dependent class in this list. Treat its C-tier placement as a comparison of reported damage, not a promise that every run will be weak. Commit to the chain-damage plan and judge it against the wave in front of you.', suffix:'Chain Lightning & Dense Waves', phases:['Take Chain Lightning when offered; otherwise establish another area tool before the first boss.', 'Commit to Chain Lightning as the carry and one survival tool. Keep moving as the wave becomes denser.', 'Rank up the carry, then cooldown reduction. Do not expect dense-wave scaling to solve every single-target boss.'], boss:'Keep an exit available and use burst openings. A wave-clearing chain plan still needs disciplined movement against an isolated boss.', mistakes:'Reading one damage ranking as a guarantee. Skipping early area coverage. Adding several support cards before committing carry ranks.', skills:['Chain Lightning or early area coverage.', 'Chain Lightning carry ranks.', 'One survival tool.', 'Cooldown reduction.']},
    Druid: {intro:'Druid has a flexible kit and mid damage, and is viable with good talent luck. The flexibility pays off when it helps you fix the weakest phase of a run; it becomes a problem when you keep taking unrelated cards. Its B-tier placement rewards a focused carry and a deliberate survival choice.', suffix:'Flexible Kit & Focused Carry', phases:['Take an area card so the flexible kit starts with reliable wave coverage.', 'Commit to the best area carry offered and one survival tool. Use talent choices to fix the weakest phase.', 'Rank up the carry and cooldown reduction. Do not reopen the build with unrelated new damage cards.'], boss:'Keep the carry dealing damage while you reposition. Use flexibility to keep an escape route rather than switching plans during the boss.', mistakes:'Taking unrelated cards because the kit is flexible. Spreading ranks across several carries. Expecting talent luck to replace early area coverage.', skills:['Early area coverage.', 'One focused area carry.', 'One survival tool matching the weakest phase.', 'Carry ranks and cooldown reduction.']},
  };
  for (const name of classNames) {
    const c = classDetails[name];
    const intro = c.intro || exact(c.start);
    const faq = c.faq || [
      [`Is ${name} a good first-clear choice?`, name === 'Warrior' || name === 'Paladin' ? 'Yes. It is one of the forgiving first-clear picks; learn the waves while keeping an area tool online.' : `Read the ${name} trade-off above and the tier list. Warrior or Paladin remains the forgiving first-clear starting point.`],
      ['What should I take in the first three minutes?', c.phases[0]],
      ['When should I spend rerolls?', 'Use the level 6–12 commitment window, rather than spending rerolls in the first three levels.'],
      [`What is the main ${name} mistake?`, c.mistakes],
    ];
    add(`/guide/builds/${name.toLowerCase()}/`, c.title || [`Azeroth Survivors ${name} Build — ${c.suffix}`, `${name} build for Azeroth Survivors: ${c.suffix.toLowerCase()}, early area coverage, three build phases, passive priorities and boss positioning.`, `Azeroth Survivors ${name} build`], text(intro), [
      section('Build phases', c.phases.map((phase,i) => `<h3>${['0–3 min','3–8 min','8–15 min'][i]}</h3>${text(phase)}`).join('')),
      section('Boss notes', text(c.boss)), section('Common mistakes', text(c.mistakes)), section('Skill priority', list(c.skills)),
      section('Passive priority', list(passives,true) + links([['See the full passive priority and stat caps', '/guide/builds/']])),
      section('FAQ', faq.map(([q,a]) => `<details><summary>${esc(q)}</summary>${text(a)}</details>`).join('')),
    ], [builds, tiers, ...['Warlock','Mage','Hunter'].filter(other => other !== name).slice(0,2).map(classLink)]);
  }
  add('/guide/luck/', metadata('What Does Luck Do'), p('Luck changes the rarity') + p('Treat Luck as a support stat'), [section('Where Luck sits in priority', list(['Carry spell rank','One survival tool','Luck / draft quality','Pure damage %'],true))], [builds,talents]);
  add('/guide/save-file/', metadata('Azeroth Survivors Save File'), p('The browser build stores progress locally.') + p('Back up by copying'), [section('Backup checklist', list(['Copy the save file before changing builds; keep the original copy untouched.', 'Back up before switching domains.', 'Do not clear browser storage until you have confirmed the new entry point works.'],true)), section('Location note', text('No exact Windows path is confirmed here. The characters.txt location in the supplied copy is a community report, not a verified path for every browser or package. Do not delete browser storage while looking for it.'))], [download,safety]);
  add('/guide/damage-meter/', metadata('Azeroth Survivors Damage Meter'), p('The browser build does not ship') + p('If you only need to compare'), [section('What to use instead', list(['Review the in-game Armory after each attempt.', 'Check Talents to identify progression changes.', 'Record your carry ranks and run outcome when comparing attempts.'])), section('Risk note', text('We do not host HUD files or provide HUD downloads. An external script or replacement game file is outside the official entry point.'))], [builds,talents]);
  add('/guide/talent-tree/', metadata('Azeroth Survivors Talent Tree'), p('The talent tree is the between-run') + p('Spend early points'), [section('What persists vs what resets', table(['Persists between runs','Resets with the run'],[['Boss gear','In-run card choices'],['Collection progress','The run’s level-up draft'],['Talent progress (resettable)','The current run build']])), section('Where to check progress', list(['Collection — review collection progress.', 'Armory — review class gear.', 'Talents — review and reset the 51-point progression tree.']))], [builds,luck]);
  add('/guide/reddit/', metadata('Azeroth Survivors Reddit'), p('Azeroth Survivors does not have a single official subreddit'), [
    section('Verifiable discussion entry points', links([['r/WoWPrivateServers — browser-game discussion', 'https://www.reddit.com/r/WoWPrivateServers/comments/1x16xwn/azeroth_survivors_roguelike_wow_singleplayer_game/'], ['r/wowservers — Steam Deck discussion', 'https://www.reddit.com/r/wowservers/comments/1xbluqm/azeroth_survivors_on_steamdeck/']]) + text('These are community discussions, not developer announcements. External replies and download links are not endorsed.')),
    section('What the community agrees on', list(['WebGPU is required for browser play.', 'Slow first load is normal; let the resources finish loading.', 'Hunter, Warlock, Warrior and Mage recur as top picks in the supplied guide comparisons; rankings are not unanimous.'])),
    section('What to ignore', list(['Single-run tier claims presented as permanent rankings.', '“Unlock all” links and unverified save or download offers.'])),
  ], [['Discord','/guide/discord/'],safety]);
  add('/guide/discord/', metadata('Azeroth Survivors Discord'), p("The project's own change announcements"), [section('Why no embedded invite', text('Invite links can expire or lead to a different server. Start on the developer’s domain and follow the Discord link published there; this guide does not maintain an invite or redirect.'))], [['Reddit','/guide/reddit/'],official]);
  add('/about/', ['About — Azeroth Survivors Independent Field Guide', 'About this independent, unofficial Azeroth Survivors guide and its relationship to Aethus and Blizzard.', 'About this field guide'], p('AzerothSurvivors.shop is an independent'), [], [['Editorial policy','/editorial-policy/'],['Contact','/contact/']]);
  add('/editorial-policy/', ['Editorial Policy — Azeroth Survivors Field Guide', 'How the independent Azeroth Survivors field guide handles sources, alpha balance, corrections and update dates.', 'Editorial policy'], p('Every guide on this site is written'), [section('Sources and corrections', text('Mechanics and rankings in the supplied editorial copy describe an alpha snapshot. Original reference-number placeholders were not source URLs and are not presented as citations. The safety page labels the scan report that remains unverified. Page dates record an editorial update, not a new security scan or a fresh playtest.') + links([['Developer’s published entry point', 'https://wow.aethus.pl/'], ['Community discussion entry points','/guide/reddit/'],['Corrections and contact status','/contact/']]))]);
  add('/contact/', ['Contact — Azeroth Survivors Field Guide', 'Contact availability and correction information for the independent Azeroth Survivors field guide.', 'Contact'], text('Contact details are being updated.'), [section('Corrections', text('A working correction form is not available yet. No message is collected or submitted on this page.'))]);
  add('/privacy/', ['Privacy — Azeroth Survivors Field Guide', 'Privacy information for this static guide, including Google Analytics, advertising and external links.', 'Privacy'], text('This is a static, public guide. It does not provide game accounts or store your game save files.'), [section('Analytics and advertising', text('Pages include Google Analytics (G-9DEW1GPD8P), Google AdSense and a Bauval advertising unit. These third-party services may receive network information such as your IP address, browser details, page URL and referrer, and may use cookies or similar storage under their own policies.') + links([['Google privacy policy','https://policies.google.com/privacy']])), section('Sponsored and external links', text('Sponsored links are labelled. Following a game, community or advertising link opens a third-party service with its own data practices. Do not enter game credentials or payment details on this fan guide.')), section('Contact', links([['Current contact availability','/contact/']]))]);
  add('/terms/', ['Terms — Azeroth Survivors Field Guide', 'Terms for using this independent, unofficial guide, including alpha information, external links and game-file boundaries.', 'Terms'], text('This site provides independent, unofficial information about Azeroth Survivors. It is not affiliated with Aethus, Blizzard Entertainment or World of Warcraft.'), [section('Guide information', text('Alpha mechanics, balance and community rankings can change. Guides are provided as information without a guarantee of game results, uninterrupted availability or third-party download safety.')), section('External services and game files', text('We do not host game files, mirrors, trainers or modified saves. External game, community and sponsored destinations are operated by their respective owners. World of Warcraft is a trademark of Blizzard Entertainment.')), section('Corrections', links([['Contact status','/contact/']]))]);
  // Supporting destination required by the safety and community pages.
  add('/guide/official-website/', ['Azeroth Survivors Official Website — Aethus’s Entry Point', 'Find the developer’s Azeroth Survivors entry point and follow its Windows and Discord links without a mirror.', 'Azeroth Survivors official entry point'], text('The developer’s entry point is https://wow.aethus.pl/. This .shop site is an independent guide.'), [section('Follow the developer’s link chain', links([['Open Aethus’s game website','https://wow.aethus.pl/']]) + text('The developer’s page links its Windows build and Discord. Follow those current links from that page; this guide does not host a download or embed an invite. Entry-point links checked on October 29, 2026.'))], [download,safety,['Discord','/guide/discord/']]);
  return routes;
}

export const trustLinks = `<nav class="shell footer-trust" aria-label="Site information">${[['About','/about/'],['Editorial policy','/editorial-policy/'],['Contact','/contact/'],['Privacy','/privacy/'],['Terms','/terms/'],['Sitemap','/sitemap.xml']].map(([label,href]) => `<a href="${href}">${label}</a>`).join('<span aria-hidden="true"> · </span>')}</nav>`;
