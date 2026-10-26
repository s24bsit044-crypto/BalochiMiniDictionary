# Test report — implementation delivery

## Actual execution status

Not executed by the agent. Available tools allow file operations and asset generation but do not provide a terminal, build runner, browser automation or Android runtime. There are no fabricated pass results. Source has been reviewed while constructing it; that is not runtime verification.

## Runnable diagnostics

Open the web app → Data & settings → Run diagnostics. Results are computed in the current browser, shown as pass/fail and exportable with timestamp/user-agent. Checks include:

1. Exactly 325 supplied entries with unique IDs.
2. Case-insensitive English partial search.
3. Alternative Roman Balochi partial search (Shaptalog).
4. Urdu search (تربوز).
5. Native Balochi combining-mark-insensitive search (ھبند).
6. CSV quoted commas, escaped quotes and embedded newline.
7. CSV export/import Unicode roundtrip of 325 entries.
8. Duplicate IDs and duplicate native-word/meaning pairs skipped.
9. Missing required CSV header rejected.
10. Unclosed quoted CSV rejected.
11. Invalid row does not import.
12. Empty dictionary returns no search results.
13. Unverified data produces no verified quiz.
14. Synthetic 10,000-entry search correctness and measured timing.
15. A separate IndexedDB database closes/reopens with favorites, history and native text preserved.

These assertions do not verify translations or actual visual glyph rendering. A close/reopen test is not an Android restart test.

## Required manual acceptance checks — all not executed

- Run npm run build and inspect TypeScript/build output.
- Search WATERM, تربوز, ھبند and Shaptalog; confirm the same supplied Watermelon entry.
- Select each search language, test categories and keyboard autocomplete, press Escape and clear search.
- Inspect RTL shaping on Android Chrome at widths 360, 412 and 768, with and without downloaded fonts.
- Save a favorite and open several details; reload and restart device, then inspect favorites, preferences and recent words.
- Preview valid CSV without committing; cancel and confirm nothing changed.
- Import new Unicode entries and ensure valid count, skipped count and per-row errors are displayed.
- Import duplicate IDs and duplicate native/English pairs; confirm no overwrite. Preserve distinct homographs.
- Import malformed quotes, missing columns, invalid UTF-8, an oversized file and a verified row lacking source.
- Export before updates, import entries, export automatic backup and restore it; compare full state.
- Clear local data with confirmation; reload and confirm empty state without automatic reseeding.
- Publish HTTPS build, wait for offline cache, visit pages, enable airplane mode and cold-load direct word and settings routes.
- Simulate disabled IndexedDB, quota exhaustion and blocked database upgrade; confirm helpful errors.
- Execute 10,000-entry import and profile responsiveness on target devices; supplied test only measures in-memory search.
- Inspect verified quiz and clearly labeled unverified practice; verify distinct options and no ambiguous native headwords.
- Shared editor permission test: not applicable; no shared editor endpoints or authentication controls exist.
- APK build/install: unsupported in this web workspace.

## Limitations

The supplied sheet is unverified. No independent sources, audio, pronunciation or examples were added. Browser storage policy may evict data. Offline install requires a production build and an initial successful visit. SVG install-icon support varies. IndexedDB, not SQLite, is active. Local mutation across multiple tabs is not live synchronized. Authenticated editors and native packaging remain future work.
