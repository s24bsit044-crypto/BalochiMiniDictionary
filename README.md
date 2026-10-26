# Balochi Mini Dictionary

A mobile-first React + Vite + TypeScript dictionary web application. IndexedDB is the real on-device database. No login, translation API, or backend is required for basic use. This is a functional local web implementation, not native Android source or an APK.

## Run

Use the OnSpace Preview to open the application. To run downloaded source: `npm install`, `npm run dev`. To build: `npm run build`; inspect using `npm run preview`. The agent has not executed these commands because no command execution tool is available. Existing dependencies are supplied by the platform; common imports include React Router, Lucide, Zod, React Hook Form, Sonner, Tailwind, and Radix-backed shadcn dialog.

## Publish and offline

Publish from the OnSpace toolbar. A build-time Vite plugin emits sw.js, manifest.webmanifest, and dictionary-icon.svg. Deployment requires HTTPS (localhost is permitted) and SPA fallback for deep links. Hosted at the domain root. All built JavaScript chunks and images are precached, including lazy routes. Visit online once, wait for the service worker to activate, then test a cold reload offline. Font requests are cached when fetched; system fonts provide a Unicode fallback if unavailable. Development preview does not install the production offline cache. Browser Install App may appear where SVG manifest icons are supported; native APK packaging is not available in this workspace.

## Data and provenance

The 325 master-sheet rows provided by the user are bundled once on first database initialization with stable IDs master-001 through master-325. Repeated per-category tables are not imported twice. Supplied Unicode and translations are preserved, with slash-separated Roman variants separated into searchable alternatives. Every row is `needs review`. The source identifies the supplied sheet only, not a linguistic authority. Examples, audio, dialects and verified pronunciations are unavailable unless explicitly supplied. No external translation service is used.

Clearing the dataset creates a backup and an initialized marker so an empty dictionary does not silently reseed on restart. Importing the supplied master sheet is an explicit action. Rejected entries remain exportable but are excluded from search, favorites, daily learning and quizzes. Verified quizzes require four unique meanings; unverified practice requires explicit selection and prominently labels uncertainty. Entries with ambiguous native-word mappings are excluded from quiz questions.

## CSV

Required header: `entry_id,balochi_native,urdu,english,roman_balochi,roman_balochi_alternatives,category,notes,source,verification_status`.

Required nonblank values: ID, native Balochi, Urdu, English, Roman Balochi, category and status. Status must be `needs review`, `verified`, or `rejected`; verified requires a nonblank source. Optional dialect and example fields are preserved by export: dialect, example_balochi, example_urdu, example_english, example_roman, example_source. Examples display only when the entry is verified and example_source is supplied. Source presence validates provenance metadata, not the qualification of the author.

UTF-8 decoding is strict. BOM, quoted fields, escaped double quotes, commas and embedded newlines are supported. CSV parser errors abort preview; per-row errors skip rows and are reported. IDs and normalized native-word/English pairs detect duplicates both within a file and against existing data; homographs with distinct meanings are retained. Imports use an atomic transaction, recheck duplicates and save a snapshot before adding data. No existing entry is overwritten. File limit: 10 MB. Unknown columns are ignored. Blank row lines are ignored. Source and notes are plain text, never HTML.

`docs/blank-template.csv` and `docs/sample.csv` are included. Download the full 325-row sample or current dataset in Data & settings. CSV export preserves original values, including formula-shaped content; do not enable spreadsheet formula execution on untrusted CSV files. Open as text or import columns as text.

## Local database / migrations

See src/lib/database.ts and docs/schema.sql. IndexedDB database `balochi-mini-dictionary` version 2:
- entries store keyed by entry_id, with category and verification_status indexes and a unique normalized word_key index.
- meta store keyed by key; holds initialized, personal and latest pre-update backup.
- personal holds favorites, recent opened words (up to 20), preferences and date-keyed learning progress.
- The version-change migration adds indexes and computes word_key for pre-existing entries.

Search normalization is cached in memory and strips combining marks, folds case and whitespace, and handles partial/alternative spellings. This is O(n) substring matching, not SQLite FTS. It is suitable for thousands of entries but should be profiled before a larger rollout. Rendering is paginated to 24 cards. Browser-managed storage can be evicted, especially in private browsing. Request persistent storage and export backups regularly. JSON backups contain full personal state; the current restore action uses the last automatic on-device snapshot. External JSON restoration is not included; CSV can restore dictionary words only.

## Architecture

UI: src/components and src/pages. Search/learning: src/lib/search.ts and quiz.ts. Repository: database.ts and repository.ts. CSV: csv.ts with Zod validation. Shared state: hooks/useDictionary.tsx. Offline: src/offline/service-worker.js and build plugin. Test harness: src/tests/diagnostics.ts. Screens are route-split, and loading/storage errors are visible without silently deleting data.

## Roles and security

There is no shared database or optional administrator/editor section in this implementation. Imports and clearing data manage the ordinary user's own device only. No pretend authenticated roles or hidden-button authorization is used. Shared editing, add/edit/delete entry forms, correction submission and source review workflows are not implemented. A production shared editor feature requires real authentication, server-enforced roles, and audit logs. Local data is not encrypted against people sharing this browser or device. Multiple open tabs can see stale state; reload after changing the dataset in another tab.

## Testing

No shell, build, browser automation or Android runtime was exposed to the agent. No executed tests are claimed. Open Data & settings → Run diagnostics for real browser assertions and export a timestamped JSON report. The harness checks 325 IDs, four-language search, partial search, alternatives, CSV quoting/Unicode/validation, duplicate skipping, empty search, verified-quiz safety, a 10,000-entry synthetic search and a separate IndexedDB close/reopen persistence test. It never changes the main dictionary. See docs/TEST_REPORT.md for manual tests still required.

## Known exclusions

No APK, guaranteed install prompt, authenticated editors, independent linguistic verification, audio, correction requests, native SQLite runtime, external JSON restore, or executed Android test report. This implementation should not be described as fully tested or the entire ultimate product. It supplies a functional local web foundation and transparent limits.
