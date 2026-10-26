# GitHub community reference plan

- **Platform:** GitHub
- **Submission URL:** https://github.com/new
- **Proposed repository:** `azeroth-survivors-community-notes`
- **Audience:** Players who want a transparent, versioned record of game observations
- **Related guide:** https://azerothsurvivors.shop/classes/
- **Suggested anchor:** “verification notes”
- **Status:** Planned; no repository created

This should be a useful source ledger, not a README made to carry a backlink. Publish only observations a contributor can point to in the live game or a primary source. At the moment, the live client could not be inspected in this environment and the draft class archetypes remain secondary-source notes; do not populate them as verified facts.

## Proposed files

```text
azeroth-survivors-community-notes/
├── README.md
├── sources.md
├── classes.csv
└── verification-methodology.md
```

## Draft README.md

```md
# Azeroth Survivors Community Notes

An independent, source-linked notebook for observations about Aethus's browser game.
This is not an official project and does not distribute the game, assets, or save files.

Every gameplay claim should include a source, the build/version observed, date, and a
verification status. Unverified community reports stay labeled as reports.

## Files
- `sources.md`: primary and secondary sources with notes on their scope.
- `classes.csv`: only class observations that have a traceable source.
- `verification-methodology.md`: how contributors record observations safely.

Game: https://wow.aethus.pl/
Independent guide: https://azerothsurvivors.shop/classes/
```

## Draft sources.md

```md
# Sources

## Primary
- Aethus, Azeroth Survivors: https://wow.aethus.pl/ — canonical game entry point;
  record the game build and visible UI when a claim is checked.

## Secondary (not developer documentation)
- https://azerothsurvivors.games/wow-survivors/ — fan-guide class and gameplay notes;
  one accessible overview identifies itself with build v0.90.0.
- https://azerothsurvivorsgame.com/how-to-play/ — fan-guide gameplay/save notes;
  page reports an update date and game version; confirm both from the page at review time.

Do not promote a secondary-source statement to a verified game fact without a primary check.
```

## Draft classes.csv

Only the header is ready. No gameplay rows are currently verified for the current build.

```csv
Class,Play Style,Source,Version Reviewed,Verification Status,Notes
```

## Draft verification-methodology.md

```md
# Verification method

1. Open the developer's game page and record date, exact build string, browser, and platform.
2. Capture the visible class picker or menu text; do not infer numeric effects from class lore.
3. Record whether a claim is directly observed, developer-published, or secondary reporting.
4. For behavior claims, describe the conditions and repeat the observation before calling it verified.
5. Do not upload save files, publish private player data, or include copyrighted game files/art.
6. Mark inaccessible or contradictory evidence as unverified and keep the source links.
```

## Rules and release gate

Create a public repository only after the CSV has useful, genuinely verified entries and every source link is checked. No game assets or save files. Do not create it solely for a backlink.
