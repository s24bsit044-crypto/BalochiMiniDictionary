import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from 'node:fs';
import { createHash } from 'node:crypto';

function dictionaryOfflineAssets() {
  return {
    name: 'dictionary-offline-assets',
    apply: 'build' as const,
    generateBundle(_options: unknown, bundle: Record<string, { type: string; fileName: string; code?: string; source?: string | Uint8Array }>) {
      const files = Object.keys(bundle).filter(name => !name.endsWith('.map')).map(name => '/' + name);
      const hash = createHash('sha256').update(Object.values(bundle).map(file => file.code || String(file.source || '')).join('')).digest('hex').slice(0, 12);
      const source = fs.readFileSync(path.resolve(__dirname, 'src/offline/service-worker.js'), 'utf8').replace('__CACHE_VERSION__', 'balochi-shell-' + hash).replace('__PRECACHE_ASSETS__', JSON.stringify(['/index.html', '/manifest.webmanifest', '/dictionary-icon.svg', ...files]));
      const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" rx="100" fill="hsl(155,34%,25%)"/><path d="M256 160C212 132 154 134 112 148v212c50-16 102-14 144 16 42-30 94-32 144-16V148c-42-14-100-16-144 12z" fill="none" stroke="hsl(45,40%,97%)" stroke-width="20" stroke-linejoin="round"/><path d="M256 160v216" stroke="hsl(45,40%,97%)" stroke-width="20"/></svg>';
      const manifest = { name: 'Balochi Mini Dictionary', short_name: 'Balochi', description: 'Balochi, Urdu, English and Roman Balochi, stored on your device.', id: '/', start_url: '/', scope: '/', display: 'standalone', background_color: '#faf9f5', theme_color: '#2a5543', icons: [{ src: '/dictionary-icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }] };
      Object.assign(bundle, { 'sw.js': { type: 'asset', fileName: 'sw.js', source }, 'dictionary-icon.svg': { type: 'asset', fileName: 'dictionary-icon.svg', source: icon }, 'manifest.webmanifest': { type: 'asset', fileName: 'manifest.webmanifest', source: JSON.stringify(manifest) } });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    dictionaryOfflineAssets(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
