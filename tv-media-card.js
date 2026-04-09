/**
 * tv-media-card.js  —  Custom Home Assistant Lovelace card
 *
 * Install : copy to /config/www/tv-media-card.js
 * Resource: /local/tv-media-card.js  (type: JavaScript module)
 *
 * Minimal YAML (entity is the only required field):
 *   type: custom:tv-media-card
 *   entity: media_player.living_room_tv
 *
 * Optional YAML:
 *   name: Living Room TV                   # overrides friendly_name
 *   brand: SAMSUNG                         # shown on TV bezel
 *   language: ro                           # en ro de fr es it pl hu nl pt cs sk
 *
 */

// ─── I18N ─────────────────────────────────────────────────────────────────────
const TV_I18N = {
  en: { on:"On", off:"Off", standby:"STANDBY", nowPlaying:"Now Playing", settings:"Settings", cardSettings:"Card Settings", general:"General", roomName:"Room / Device Name", brand:"TV Brand", entity:"Media Player", appearance:"Appearance", lang:"Language", apply:"Apply", idle:"Idle", unavailable:"Unavailable", launchApp:"Launch App"},
  ro: { on:"Pornit", off:"Oprit", standby:"STANDBY", nowPlaying:"Se redă acum", settings:"Setări", cardSettings:"Setări Card", general:"General", roomName:"Cameră / Dispozitiv", brand:"Brand TV", entity:"Media Player", appearance:"Aspect", lang:"Limbă", apply:"Aplică", idle:"Inactiv", unavailable:"Indisponibil", launchApp:"Lansează Aplicație"},
  de: { on:"An", off:"Aus", standby:"STANDBY", nowPlaying:"Jetzt läuft", settings:"Einstellungen", cardSettings:"Karten-Einstellungen", general:"Allgemein", roomName:"Raum / Gerät", brand:"TV-Marke", entity:"Media Player", appearance:"Aussehen", lang:"Sprache", apply:"Anwenden", idle:"Inaktiv", unavailable:"Nicht verfügbar", launchApp:"App starten"},
  fr: { on:"Allumé", off:"Éteint", standby:"VEILLE", nowPlaying:"En cours", settings:"Paramètres", cardSettings:"Paramètres carte", general:"Général", roomName:"Pièce / Appareil", brand:"Marque TV", entity:"Media Player", appearance:"Apparence", lang:"Langue", apply:"Appliquer", idle:"Inactif", unavailable:"Indisponible", launchApp:"Lancer App"},
  es: { on:"Encendido", off:"Apagado", standby:"EN ESPERA", nowPlaying:"Reproduciendo", settings:"Ajustes", cardSettings:"Ajustes de tarjeta", general:"General", roomName:"Habitación / Dispositivo", brand:"Marca TV", entity:"Media Player", appearance:"Apariencia", lang:"Idioma", apply:"Aplicar", idle:"Inactivo", unavailable:"No disponible", launchApp:"Lanzar App"},
  it: { on:"Acceso", off:"Spento", standby:"STANDBY", nowPlaying:"In riproduzione", settings:"Impostazioni", cardSettings:"Impostazioni scheda", general:"Generale", roomName:"Stanza / Dispositivo", brand:"Marca TV", entity:"Media Player", appearance:"Aspetto", lang:"Lingua", apply:"Applica", idle:"Inattivo", unavailable:"Non disponibile", launchApp:"Avvia App"},
  pl: { on:"Włączony", off:"Wyłączony", standby:"CZUWANIE", nowPlaying:"Teraz odtwarzane", settings:"Ustawienia", cardSettings:"Ustawienia karty", general:"Ogólne", roomName:"Pokój / Urządzenie", brand:"Marka TV", entity:"Media Player", appearance:"Wygląd", lang:"Język", apply:"Zastosuj", idle:"Bezczynny", unavailable:"Niedostępny", launchApp:"Uruchom App"},
  hu: { on:"Bekapcsolva", off:"Kikapcsolva", standby:"KÉSZENLÉT", nowPlaying:"Most játszik", settings:"Beállítások", cardSettings:"Kártya beállítások", general:"Általános", roomName:"Szoba / Eszköz", brand:"TV márka", entity:"Media Player", appearance:"Megjelenés", lang:"Nyelv", apply:"Alkalmaz", idle:"Tétlen", unavailable:"Nem elérhető", launchApp:"App indítása"},
  nl: { on:"Aan", off:"Uit", standby:"STANDBY", nowPlaying:"Nu afspelen", settings:"Instellingen", cardSettings:"Kaartinstellingen", general:"Algemeen", roomName:"Kamer / Apparaat", brand:"TV-merk", entity:"Media Player", appearance:"Uiterlijk", lang:"Taal", apply:"Toepassen", idle:"Inactief", unavailable:"Niet beschikbaar", launchApp:"App starten"},
  pt: { on:"Ligado", off:"Desligado", standby:"ESPERA", nowPlaying:"A reproduzir", settings:"Definições", cardSettings:"Definições do cartão", general:"Geral", roomName:"Sala / Dispositivo", brand:"Marca TV", entity:"Media Player", appearance:"Aparência", lang:"Idioma", apply:"Aplicar", idle:"Inativo", unavailable:"Indisponível", launchApp:"Lançar App"},
  cs: { on:"Zapnuto", off:"Vypnuto", standby:"POHOTOVOST", nowPlaying:"Přehrává se", settings:"Nastavení", cardSettings:"Nastavení karty", general:"Obecné", roomName:"Místnost / Zařízení", brand:"Značka TV", entity:"Media Player", appearance:"Vzhled", lang:"Jazyk", apply:"Použít", idle:"Nečinný", unavailable:"Nedostupný", launchApp:"Spustit App"},
  sk: { on:"Zapnuté", off:"Vypnuté", standby:"POHOTOVOSŤ", nowPlaying:"Práve hrá", settings:"Nastavenia", cardSettings:"Nastavenia karty", general:"Všeobecné", roomName:"Miestnosť / Zariadenie", brand:"Značka TV", entity:"Media Player", appearance:"Vzhľad", lang:"Jazyk", apply:"Použiť", idle:"Nečinný", unavailable:"Nedostupný", launchApp:"Spustiť App"},
};

// ─── APP LOGOS ────────────────────────────────────────────────────────────────
const _LOGOS = {
  youtube   : () => `<svg height="48" viewBox="0 0 24 17" xmlns="http://www.w3.org/2000/svg"><path fill="#FF0000" d="M23.5 2.7a3 3 0 0 0-2.1-2.1C19.5 0 12 0 12 0S4.5 0 2.6.6A3 3 0 0 0 .5 2.7C0 4.6 0 8.5 0 8.5s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1C4.5 17 12 17 12 17s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 12.4 24 8.5 24 8.5s0-3.9-.5-5.8z"/><path fill="#fff" d="M9.5 12.1V4.9l6.3 3.6-6.3 3.6z"/></svg>`,
  netflix   : () => `<svg height="48" viewBox="0 0 512 138" xmlns="http://www.w3.org/2000/svg"><path fill="#DB202C" d="M340.657183,0 L340.657183,100.203061 C353.016406,100.778079 365.344207,101.473198 377.637095,102.293306 L377.637095,123.537553 C358.204486,122.242243 338.690182,121.253471 319.094879,120.57923 L319.094879,0 L340.657183,0 Z M512,0.0118710746 L483.922918,65.1060972 L511.993017,137.54371 L511.961595,137.557485 C503.784957,136.3909 495.597845,135.289637 487.386294,134.233936 L471.623048,93.5776798 L455.709676,130.459835 C448.168455,129.627123 440.61676,128.839275 433.047609,128.100899 L460.419447,64.6708546 L435.351871,0.0118710746 L458.677285,0.0118710746 L472.712335,36.1957639 L488.318473,0.0118710746 L512,0.0118710746 Z M245.093161,119.526252 L245.092462,0.0114869428 L305.282574,0.0114869428 L305.282574,21.4467074 L266.654767,21.4467074 L266.654767,49.2277266 L295.881884,49.2277266 L295.881884,70.4719734 L266.654767,70.4719734 L266.654767,119.521329 L245.093161,119.526252 Z M164.580156,21.448488 L164.579458,0.0103695593 L231.270382,0.0103695593 L231.270382,21.4469875 L208.705375,21.4469875 L208.705375,120.107799 C201.508397,120.296154 194.3191,120.519389 187.144466,120.790104 L187.144466,21.448488 L164.580156,21.448488 Z M90.8682168,126.966224 L90.8682168,0.0139657936 L150.758077,0.0139657936 L150.758077,21.4491862 L112.42703,21.4491862 L112.42703,50.4849807 C121.233151,50.3722116 133.754021,50.2444297 141.543822,50.2632828 L141.543822,71.5092753 C131.792954,71.388127 120.786264,71.6429923 112.42703,71.7264345 L112.42703,103.88974 C125.166805,102.887736 137.944984,102.011069 150.758077,101.270912 L150.758077,122.517253 C130.704017,123.672422 110.740031,125.160591 90.8682168,126.966224 Z M48.5710466,77.8540254 L48.5696502,0.0104745953 L70.1319549,0.0104745953 L70.1319549,128.968837 C62.2496338,129.779728 54.3823252,130.642465 46.5286328,131.553346 L21.5609083,59.8244682 L21.5609083,134.625696 C14.3597408,135.563565 7.17323695,136.54141 0,137.562338 L0,0.0118710746 L20.4911722,0.0118710746 L48.5710466,77.8540254 Z M395.425298,124.819071 L395.425298,0.0120101224 L416.987603,0.0120101224 L416.987603,126.599777 C409.809478,125.960833 402.624371,125.369895 395.425298,124.819071 Z"/></svg>`,
  plex      : () => `<svg height="48" viewBox="0 0 3086 1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="pg" cx="1244.351" cy="920.081" r=".925" gradientTransform="matrix(610 0 0 -1000.5 -756323.625 921038.75)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#f9be03"/><stop offset="1" stop-color="#cc7c19"/></radialGradient></defs><path fill="#aaa" d="M3085.99 0h-290.001L2505.99 500l289.999 500h289.748l-289.748-499.75L3085.99 0"/><path fill="url(#pg)" d="M2186 0h290l320 500.25-320 500.25h-290l319.999-500.25L2186 0"/><path fill="#aaa" d="M2085.947 1000h-577.073V0h577.073v173.737H1721.34v219.562h339.255V567.03H1721.34v257.864h364.607V1000M791.276 1000V0h212.04v824.895h405.609V1000H791.276M589.947 558.824c-67.268 57.007-162.91 85.501-286.938 85.501H212.04V1000H0V470.338l290 .359c177.562-2.069 186.842-110.818 186.842-148.497 0-34.979 0-146.755-157.842-148.5l-319 .003V0h319.424c121.293 0 213.515 26.107 276.677 78.321 63.152 52.213 94.733 130.071 94.733 233.581 0 107.625-33.633 189.928-100.887 246.922z"/><path fill="#aaa" d="M0 110h212.2v429H0z"/></svg>`,
  disney    : () => `<svg height="48" viewBox="0 0 96 48" xmlns="http://www.w3.org/2000/svg"><rect width="96" height="48" rx="8" fill="#00308F"/><text x="8" y="34" font-family="Georgia,Times New Roman,serif" font-style="italic" font-weight="700" font-size="30" fill="#fff">Disney</text><text x="71" y="18" font-family="Arial,sans-serif" font-weight="900" font-size="18" fill="#00A8E0">+</text></svg>`,
  prime     : () => `<svg height="48" viewBox="0 0 90 44" xmlns="http://www.w3.org/2000/svg"><text x="2" y="26" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="22" fill="#fff" letter-spacing="-0.5">prime</text><text x="2" y="40" font-family="Arial,sans-serif" font-weight="400" font-size="13" fill="#00A8E0" letter-spacing="2">video</text><path d="M66 32 Q76 38 86 32" fill="none" stroke="#00A8E0" stroke-width="2.5" stroke-linecap="round"/><polygon points="83,27 88,32 83,37" fill="#00A8E0"/></svg>`,
  appletv   : () => `<svg height="48" viewBox="0 0 96 48" xmlns="http://www.w3.org/2000/svg"><rect width="96" height="48" rx="8" fill="#1c1c1e"/><path d="M19 15c-1.4 0-2.7.8-3.4 2-.7-1.2-2-2-3.4-2-2.1 0-3.8 1.7-3.8 3.8 0 4.2 7.2 8.7 7.2 8.7s7.2-4.5 7.2-8.7c0-2.1-1.7-3.8-3.8-3.8z" fill="#fff"/><path d="M16.5 12.5c.3-1.4 1.4-2.4 2.5-2.9" fill="none" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><text x="33" y="32" font-family="SF Pro,Helvetica Neue,Arial,sans-serif" font-weight="200" font-size="24" fill="#fff" letter-spacing="2">TV</text></svg>`,
  spotify   : () => `<svg height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="23" fill="#1DB954"/><path fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" d="M12,18 Q24,13 36,18"/><path fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" d="M13.5,25 Q24,20.5 34.5,25"/><path fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" d="M15,32 Q24,28 33,32"/></svg>`,
  twitch    : () => `<svg height="48" viewBox="-6 0 268 268" xmlns="http://www.w3.org/2000/svg"><path fill="#9146FF" d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"/></svg>`,
  max       : () => `<svg height="48" viewBox="0 7 24 10" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M7.042 16.896H4.414v-3.754H2.708v3.754H.01L0 7.22h2.708v3.6h1.706v-3.6h2.628zm12.043.046C21.795 16.94 24 14.689 24 11.978a4.89 4.89 0 0 0-4.915-4.92c-2.707-.002-4.09 1.991-4.432 2.795.003-1.207-1.187-2.632-2.58-2.634H7.59v9.674l4.181.001c1.686 0 2.886-1.46 2.888-2.713.385.788 1.72 2.762 4.427 2.76zm-7.665-3.936c.387 0 .692.382.692.817 0 .435-.305.817-.692.817h-1.33v-1.634zm.005-3.633c.387 0 .692.382.692.817 0 .436-.305.818-.692.818h-1.33V9.373zm1.77 2.607c.305-.039.813-.387.992-.61-.063.276-.068 1.074.006 1.35-.204-.314-.688-.701-.998-.74zm3.43 0a2.462 2.462 0 1 1 4.924 0 2.462 2.462 0 0 1-4.925 0zm2.462 1.936a1.936 1.936 0 1 0 0-3.872 1.936 1.936 0 0 0 0 3.872z"/></svg>`,
  hulu      : () => `<svg height="48" viewBox="0 0 115 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#1CE783" stroke-width="5.5" stroke-linecap="round" d="M8,6 L8,42 M8,26 Q8,18 17,18 Q25,18 25,25 L25,42"/><path fill="none" stroke="#1CE783" stroke-width="5.5" stroke-linecap="round" d="M33,18 L33,32 Q33,42 42,42 Q51,42 51,32 L51,18"/><line x1="59" y1="6" x2="59" y2="42" stroke="#1CE783" stroke-width="5.5" stroke-linecap="round"/><path fill="none" stroke="#1CE783" stroke-width="5.5" stroke-linecap="round" d="M67,18 L67,32 Q67,42 76,42 Q85,42 85,32 L85,18"/><circle cx="98" cy="39" r="4.5" fill="#1CE783"/></svg>`,
  dazn      : () => `<svg height="48" viewBox="0 0 130 48" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#fff" stroke-width="4.5" stroke-linejoin="round" d="M6,6 L6,42 L14,42 Q28,42 28,24 Q28,6 14,6 Z"/><path fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="M38,42 L48,6 L58,42 M41,30 L55,30"/><path fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" d="M66,6 L82,6 L66,42 L82,42"/><path fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" d="M90,42 L90,6 L106,42 L106,6"/></svg>`,
  videoland : () => `<svg height="48" viewBox="0 0 155 48" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="46" height="46" rx="10" fill="#E4002B"/><polygon points="15,10 15,38 38,24" fill="#fff"/><path fill="none" stroke="#E4002B" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M56,8 L66,40 L76,8"/><rect x="83" y="8" width="4.5" height="32" rx="2" fill="#E4002B"/><circle cx="85" cy="3" r="3" fill="#E4002B"/><path fill="none" stroke="#E4002B" stroke-width="4.5" stroke-linecap="round" d="M100,2 L100,40 M100,28 Q100,12 110,12 Q120,12 120,26 Q120,40 110,40 Z"/></svg>`,
};

// ─── LOGO LOOKUP ──────────────────────────────────────────────────────────────
function _norm(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Returns true for strings that are system/OS identifiers, not user-visible app names.
// Catches: reverse-DNS package names (com.android.tv), generic Android/system labels.
function _isSystemString(s) {
  const t = s.trim();
  // Reverse-DNS with at least 2 dots: com.android.tv, org.kodi.kodi, etc.
  if (/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*){2,}$/i.test(t)) return true;
  // Two-segment dotted: com.android, tv.plex
  if (/^[a-z][a-z0-9]*\.[a-z][a-z0-9]+$/i.test(t)) return true;
  // Known generic OS labels
  if (/^(android|smartcast|livetv|live tv|google cast|chromecast|fire tv|webos|tizen|home|launcher|luncherx|tv launcher)/i.test(t)) return true;
  if (/launcher/i.test(t)) return true;
  return false;
}

// Known Android/TV package names → logo key
const _PKG_TABLE = {
  'com.google.android.youtube.tv':          'youtube',
  'com.google.android.youtube':            'youtube',
  'com.netflix.ninja':                     'netflix',
  'com.netflix.mediaclient':               'netflix',
  'com.plexapp.android':                   'plex',
  'com.plexapp.plex':                      'plex',
  'com.disney.disneyplus':                 'disney',
  'com.bamtechdigital.disneyplus':         'disney',
  'com.amazon.amazonvideo.livingroom':     'prime',
  'com.amazon.avod.thirdpartyclient':      'prime',
  'com.amazon.firetv.videoui':             'prime',
  'com.apple.atve.amazon.appletv':         'appletv',
  'com.apple.tv':                          'appletv',
  'com.spotify.tv.android':               'spotify',
  'com.spotify.music':                    'spotify',
  'tv.twitch.android.app':              'twitch',
  'tv.twitch.android.viewer':           'twitch',
  'com.hbo.hbonow':                       'max',
  'com.hbo.max':                          'max',
  'com.wbd.stream':                       'max',
  'com.hulu.livingroomplus':              'hulu',
  'com.hulu.plus':                        'hulu',
  'com.dazn.mobile':                      'dazn',
  'nl.rtl.videoland':                     'videoland',
};

// Terms that must appear in the normalized app_name → logo key
const _ALIAS_TABLE = [
  { terms: ['youtube'],             key: 'youtube'   },
  { terms: ['netflix'],             key: 'netflix'   },
  { terms: ['plex'],                key: 'plex'      },
  { terms: ['disney'],              key: 'disney'    },
  { terms: ['prime', 'amazon'],     key: 'prime'     },
  { terms: ['apple tv', 'appletv'], key: 'appletv'   },
  { terms: ['spotify'],             key: 'spotify'   },
  { terms: ['twitch'],              key: 'twitch'    },
  { terms: ['hbo', ' max '],        key: 'max'       },
  { terms: ['hulu'],                key: 'hulu'      },
  { terms: ['dazn'],                key: 'dazn'      },
  { terms: ['videoland'],           key: 'videoland' },
];

function tvGetLogo(appName) {
  if (!appName || !appName.trim()) return '';
  const t = appName.trim();

  // 1. Direct package name lookup (e.g. com.google.android.youtube.tv)
  const pkgLower = t.toLowerCase();
  if (pkgLower in _PKG_TABLE) return _LOGOS[_PKG_TABLE[pkgLower]]?.() || '';

  // 2. Partial package match — tail segments must match exactly, not as substring
  if (t.includes('.')) {
    for (const [pkg, key] of Object.entries(_PKG_TABLE)) {
      const tailSegs = pkg.split('.').slice(-2);
      const pkgSegs  = pkgLower.split('.');
      const matches  = pkgSegs.some((_, i) => tailSegs.every((s, j) => pkgSegs[i + j] === s));
      if (matches) return _LOGOS[key]?.() || '';
    }
    // Unknown dotted package → hide
    return '';
  }

  // 3. System string filter (generic labels)
  if (_isSystemString(t)) return '';

  // 4. Friendly name alias matching
  const n = ' ' + _norm(t) + ' ';
  for (const { terms, key } of _ALIAS_TABLE) {
    if (terms.some(term => n.includes(term))) {
      return _LOGOS[key]?.() || '';
    }
  }
  return '';
}


// ─── DEFAULT APP LAUNCHER LIST ────────────────────────────────────────────────
const DEFAULT_APPS = [
  { name: 'YouTube',     id: 'com.google.android.youtube.tv'     },
  { name: 'Netflix',     id: 'com.netflix.ninja'                 },
  { name: 'Prime Video', id: 'com.amazon.amazonvideo.livingroom' },
  { name: 'Disney+',     id: 'com.disney.disneyplus'             },
  { name: 'Apple TV',    id: 'com.apple.atve.amazon.appletv'     },
  { name: 'Plex',        id: 'com.plexapp.android'               },
  { name: 'Spotify',     id: 'com.spotify.tv.android'            },
  { name: 'Twitch',      id: 'tv.twitch.android.app'             },
  { name: 'Max',         id: 'com.wbd.stream'                    },
  { name: 'Hulu',        id: 'com.hulu.livingroomplus'           },
  { name: 'DAZN',        id: 'com.dazn.mobile'                   },
  { name: 'Videoland',   id: 'nl.rtl.videoland'                  },
];
const TV_CSS = `
  :host { display: block; }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .card {
    background: linear-gradient(145deg, #16161e 0%, #1a1a26 50%, #13131a 100%);
    border-radius: 24px; border: 1px solid rgba(255,255,255,.07);
    padding: 20px 20px 22px;
    box-shadow: 0 20px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06);
    position: relative; overflow: hidden;
    font-family: 'DM Sans', system-ui, sans-serif; color: #fff;
  }
  .card::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(99,102,241,.12) 0%, transparent 70%);
    pointer-events: none;
  }

  /* HEADER */
  .hdr { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .room { font-family: 'Syne', system-ui, sans-serif; font-weight: 700; font-size: 18px; letter-spacing: -.3px; }
  .badge { display: flex; align-items: center; gap: 5px; font-size: 11px; color: rgba(255,255,255,.45); margin-top: 4px; }
  .dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,.6); animation: blink 2s ease infinite; flex-shrink: 0; }
  .dot.off { background: rgba(255,255,255,.2); box-shadow: none; animation: none; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.4} }

  .hdr-right { display: flex; align-items: center; gap: 8px; }
  .pwr { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(239,68,68,.5); background: rgba(239,68,68,.15); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .25s; box-shadow: 0 0 12px rgba(239,68,68,.15); flex-shrink: 0; }
  .pwr:hover { background: rgba(239,68,68,.3); border-color: rgba(239,68,68,.8); box-shadow: 0 0 20px rgba(239,68,68,.28); }
  .pwr svg { width: 16px; height: 16px; }
  .pwr svg path, .pwr svg line { stroke: #ef4444; }
  .pwr.dim { background: rgba(239,68,68,.04); border-color: rgba(239,68,68,.15); box-shadow: none; }
  .pwr.dim svg path, .pwr.dim svg line { stroke: rgba(239,68,68,.3); }
  .mute-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .25s; flex-shrink: 0; }
  .mute-btn:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.22); }
  .mute-btn svg { width: 15px; height: 15px; stroke: rgba(255,255,255,.5); }
  .mute-btn.muted { border-color: rgba(239,68,68,.4); background: rgba(239,68,68,.1); }
  .mute-btn.muted svg { stroke: #ef4444; }
  .gear-btn { width: 38px; height: 38px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .25s; flex-shrink: 0; }
  .gear-btn:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.22); }
  .gear-btn svg { width: 15px; height: 15px; stroke: rgba(255,255,255,.4); transition: transform .4s ease; }
  .gear-btn:hover svg { transform: rotate(60deg); stroke: rgba(255,255,255,.7); }

  /* TV */
  .tv-outer { display: flex; flex-direction: column; align-items: center; margin-bottom: 16px; overflow: visible; }
  .tv-click { cursor: pointer; display: inline-flex; flex-direction: column; align-items: center; overflow: visible; }
  .tv-body {
    width: 316px;
    background: linear-gradient(160deg, #222232 0%, #131320 100%);
    border-radius: 18px 18px 8px 8px; border: 2px solid rgba(255,255,255,.09);
    padding: 12px 12px 0; position: relative;
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,.05), inset 0 -2px 0 rgba(0,0,0,.25),
      5px 8px 20px rgba(0,0,0,.45), -5px 8px 20px rgba(0,0,0,.35), 0 20px 50px rgba(0,0,0,.55);
    transition: border-color .2s, box-shadow .2s;
  }
  .tv-click:hover .tv-body {
    border-color: rgba(99,102,241,.3);
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,.05), inset 0 -2px 0 rgba(0,0,0,.25),
      5px 8px 20px rgba(0,0,0,.45), -5px 8px 20px rgba(0,0,0,.35), 0 20px 50px rgba(0,0,0,.55),
      0 0 0 1px rgba(99,102,241,.18);
  }


  .screen {
    width: 100%; aspect-ratio: 16/9; background: #04040a;
    border-radius: 8px; overflow: hidden; position: relative; transition: box-shadow .4s;
    box-shadow: inset 0 0 28px rgba(0,0,0,.85), 0 0 0 1.5px rgba(0,0,0,.7);
  }
  .screen.on { box-shadow: inset 0 0 18px rgba(0,0,0,.4), 0 0 0 1.5px rgba(0,0,0,.7), 0 0 28px rgba(99,102,241,.06); }
  .scr-bg { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; transition: opacity .5s; }
  .scr-bg::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 28%; background: linear-gradient(180deg, rgba(255,255,255,.032) 0%, transparent 100%); border-radius: 8px 8px 0 0; pointer-events: none; }
  .logo-wrap { display:flex; align-items:center; justify-content:center; z-index:1; } .logo-wrap svg { display:block; }
  .off-msg { font-size: 11px; color: rgba(255,255,255,.14); letter-spacing: 1.5px; text-transform: uppercase; }

  /* HOME SCREEN DECORATIVE */
  .home-screen { width:100%; height:100%; display:flex; flex-direction:column; gap:5px; padding:8px; box-sizing:border-box; }
  .home-row { display:flex; gap:5px; flex:1; }
  .home-tile { flex:1; border-radius:5px; background:var(--hc); animation: hpulse 3s ease-in-out infinite; }
  .home-tile.wide { flex:1.8; }
  .home-tile:nth-child(2) { animation-delay:.4s; }
  .home-tile:nth-child(3) { animation-delay:.8s; }
  .home-bar { height:5px; border-radius:3px; background:rgba(255,255,255,.08); margin:0 2px; }
  .home-bar.short { width:55%; }
  @keyframes hpulse { 0%,100%{opacity:.6} 50%{opacity:1} }

  /* APP EDIT MODE */
  .app-edit-btn { font-size:11px; color:rgba(255,255,255,.4); background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:4px 10px; cursor:pointer; transition:all .2s; white-space:nowrap; }
  .app-edit-btn:hover { background:rgba(255,255,255,.12); color:rgba(255,255,255,.8); }
  .app-edit-btn.active { background:rgba(99,102,241,.18); border-color:rgba(99,102,241,.4); color:#a5b4fc; }
  .app-item { position:relative; }
  .app-del { position:absolute; top:-5px; right:-5px; width:18px; height:18px; border-radius:50%; background:#ef4444; border:none; color:#fff; font-size:12px; line-height:1; cursor:pointer; display:none; align-items:center; justify-content:center; z-index:5; }
  .edit-mode .app-del { display:flex; }
  .edit-mode .app-item { cursor:grab; }
  .edit-mode .app-item:active { cursor:grabbing; opacity:.7; }
  .app-add { border:1px dashed rgba(255,255,255,.2); background:rgba(255,255,255,.03); color:rgba(255,255,255,.4); font-size:22px; }
  .app-add:hover { border-color:rgba(99,102,241,.5); background:rgba(99,102,241,.08); color:#a5b4fc; }
  .add-form { grid-column:1/-1; display:none; flex-direction:column; gap:8px; padding:10px; background:rgba(255,255,255,.04); border-radius:12px; border:1px solid rgba(255,255,255,.08); }
  .add-form.open { display:flex; }
  .add-inp { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:7px 10px; color:#fff; font-size:12px; font-family:system-ui,sans-serif; outline:none; }
  .add-inp:focus { border-color:rgba(99,102,241,.5); }
  .add-inp::placeholder { color:rgba(255,255,255,.25); }
  .add-row { display:flex; gap:6px; }
  .add-save { flex:1; background:linear-gradient(135deg,#6366f1,#8b5cf6); border:none; border-radius:8px; color:#fff; font-size:12px; font-weight:600; padding:7px; cursor:pointer; }
  .add-cancel { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:8px; color:rgba(255,255,255,.5); font-size:12px; padding:7px 10px; cursor:pointer; }
  .hint { position: absolute; inset: 0; border-radius: 8px; background: rgba(4,4,14,.76); display: flex; align-items: center; justify-content: center; gap: 7px; opacity: 0; transition: opacity .2s; pointer-events: none; z-index: 10; }
  .tv-click:hover .hint { opacity: 1; }
  .hint span { font-size: 12px; color: rgba(255,255,255,.78); }
  .hint svg { width: 13px; height: 13px; opacity: .7; }

  .bezel { display: flex; align-items: center; justify-content: space-between; padding: 5px 14px 7px; margin-top: 3px; }
  .tv-brand { font-family: 'Syne', system-ui, sans-serif; font-size: 8px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,.12); text-transform: uppercase; }
  .led { width: 5px; height: 5px; border-radius: 50%; background: rgba(74,222,128,.55); box-shadow: 0 0 5px rgba(74,222,128,.45); transition: all .3s; }
  .led.off { background: rgba(255,80,80,.4); box-shadow: 0 0 4px rgba(255,80,80,.3); }

  .stand { display: flex; flex-direction: column; align-items: center; }
  .neck { width: 34px; height: 17px; background: linear-gradient(180deg, #1c1c2a, #111118); border-left: 1.5px solid rgba(255,255,255,.06); border-right: 1.5px solid rgba(255,255,255,.06); clip-path: polygon(12% 0%, 88% 0%, 100% 100%, 0% 100%); }
  .foot { width: 108px; height: 7px; background: linear-gradient(180deg, #1e1e2c, #0e0e14); border-radius: 0 0 10px 10px; border: 1.5px solid rgba(255,255,255,.07); border-top: none; box-shadow: 0 5px 16px rgba(0,0,0,.55); }

  /* NOW PLAYING */
  .np { text-align: center; margin-bottom: 14px; }
  .np-app { font-size: 10px; color: rgba(255,255,255,.28); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 3px; min-height: 14px; }
  .np-title { font-family: 'Syne', system-ui, sans-serif; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .np-sub { font-size: 11px; color: rgba(255,255,255,.32); margin-top: 2px; }

  /* PROGRESS */
  .prog { margin-bottom: 14px; }
  .times { display: flex; justify-content: space-between; font-size: 10px; color: rgba(255,255,255,.28); margin-bottom: 6px; font-variant-numeric: tabular-nums; }
  .pbar { height: 3px; background: rgba(255,255,255,.08); border-radius: 2px; cursor: pointer; position: relative; overflow: visible; }
  .pfill { height: 100%; background: linear-gradient(90deg, #6366f1, #a78bfa); border-radius: 2px; position: relative; width: 0%; }
  .pthumb { width: 10px; height: 10px; border-radius: 50%; background: #fff; position: absolute; right: -5px; top: 50%; transform: translateY(-50%); box-shadow: 0 0 6px rgba(99,102,241,.6); transition: transform .2s; }
  .pbar:hover .pthumb { transform: translateY(-50%) scale(1.3); }

  /* CONTROLS */
  .ctrls { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px; }
  .btn { display: flex; align-items: center; justify-content: center; border-radius: 50%; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.04); cursor: pointer; transition: all .2s; flex-shrink: 0; }
  .btn:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.2); transform: scale(1.06); }
  .btn:active { transform: scale(.95); }
  .btn.sm { width: 42px; height: 42px; }
  .btn.lg { width: 54px; height: 54px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-color: transparent; box-shadow: 0 4px 16px rgba(99,102,241,.35); }
  .btn.lg:hover { background: linear-gradient(135deg, #7274f3, #9d6ef8); box-shadow: 0 4px 20px rgba(99,102,241,.5); }
  .btn svg { width: 16px; height: 16px; }
  .btn.lg svg { width: 20px; height: 20px; }

  /* VOLUME */
  .divider { height: 1px; background: rgba(255,255,255,.05); margin: 14px 0; }
  .vol { display: flex; align-items: center; gap: 10px; }
  .vol-ic { color: rgba(255,255,255,.35); flex-shrink: 0; cursor: pointer; transition: color .2s; }
  .vol-ic:hover { color: rgba(255,255,255,.7); }
  .vol-ic svg { width: 14px; height: 14px; display: block; }
  .vbar { flex: 1; height: 3px; background: rgba(255,255,255,.08); border-radius: 2px; cursor: pointer; position: relative; }
  .vfill { height: 100%; background: linear-gradient(90deg, rgba(255,255,255,.3), rgba(255,255,255,.65)); border-radius: 2px; position: relative; width: 0%; transition: width .3s; }
  .vthumb { width: 10px; height: 10px; border-radius: 50%; background: #fff; position: absolute; right: -5px; top: 50%; transform: translateY(-50%); box-shadow: 0 0 4px rgba(255,255,255,.3); transition: transform .2s; }
  .vbar:hover .vthumb { transform: translateY(-50%) scale(1.3); }
  .vol-pct { font-size: 11px; color: rgba(255,255,255,.28); width: 30px; text-align: right; font-variant-numeric: tabular-nums; }

  /* SETTINGS MODAL */
  .overlay { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.6); backdrop-filter: blur(8px); opacity: 0; pointer-events: none; transition: opacity .25s; }
  .overlay.open { opacity: 1; pointer-events: all; }
  .modal { width: 340px; background: linear-gradient(145deg, #1b1b26, #13131c); border-radius: 20px; border: 1px solid rgba(255,255,255,.1); box-shadow: 0 30px 70px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.07); overflow: hidden; transform: translateY(12px) scale(.97); transition: transform .25s; }
  .overlay.open .modal { transform: translateY(0) scale(1); }

  /* APP LAUNCHER */
  .app-overlay { position: fixed; inset: 0; z-index: 9998; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,.65); backdrop-filter: blur(10px); opacity: 0; pointer-events: none; transition: opacity .25s; }
  .app-overlay.open { opacity: 1; pointer-events: all; }
  .app-modal { width: 360px; max-width: 95vw; background: linear-gradient(145deg, #1b1b26, #13131c); border-radius: 22px; border: 1px solid rgba(255,255,255,.1); box-shadow: 0 30px 70px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.07); overflow: hidden; transform: translateY(14px) scale(.96); transition: transform .28s cubic-bezier(.34,1.56,.64,1); }
  .app-overlay.open .app-modal { transform: translateY(0) scale(1); }
  .app-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px 14px; border-bottom: 1px solid rgba(255,255,255,.06); }
  .app-head-title { font-family: 'Syne', system-ui, sans-serif; font-weight: 700; font-size: 14px; color: rgba(255,255,255,.8); letter-spacing: -.2px; }
  .app-close { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; color: rgba(255,255,255,.45); }
  .app-close:hover { background: rgba(255,255,255,.12); color: #fff; }
  .app-close svg { width: 12px; height: 12px; }
  .app-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 14px; max-height: 58vh; overflow-y: auto; }
  .app-grid::-webkit-scrollbar { width: 3px; }
  .app-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }
  .app-item { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 4px 8px; border-radius: 14px; border: 1px solid rgba(255,255,255,.05); background: rgba(255,255,255,.03); cursor: pointer; transition: all .18s; }
  .app-item:hover { background: rgba(99,102,241,.12); border-color: rgba(99,102,241,.3); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.3); }
  .app-item:active { transform: scale(.95); }
  .app-item.active-app { border-color: rgba(74,222,128,.4); background: rgba(74,222,128,.07); }
  .app-logo { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; }
  .app-logo svg { width: 44px; height: 44px; }
  .app-logo-fallback { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-family: 'Syne', system-ui, sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
  .app-name { font-size: 10px; color: rgba(255,255,255,.5); text-align: center; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; padding: 0 2px; }
  .m-head { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px 16px; border-bottom: 1px solid rgba(255,255,255,.06); }
  .m-title { font-family: 'Syne', system-ui, sans-serif; font-weight: 700; font-size: 15px; display: flex; align-items: center; gap: 8px; }
  .m-title svg { width: 15px; height: 15px; opacity: .55; }
  .m-close { width: 30px; height: 30px; border-radius: 50%; border: 1px solid rgba(255,255,255,.1); background: rgba(255,255,255,.05); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; color: rgba(255,255,255,.5); }
  .m-close:hover { background: rgba(255,255,255,.12); color: #fff; }
  .m-close svg { width: 13px; height: 13px; }
  .m-body { padding: 16px 20px 20px; display: flex; flex-direction: column; gap: 12px; max-height: 72vh; overflow-y: auto; }
  .m-body::-webkit-scrollbar { width: 4px; }
  .m-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 2px; }
  .s-sec { font-size: 10px; font-weight: 600; color: rgba(255,255,255,.28); letter-spacing: 1.2px; text-transform: uppercase; margin-top: 4px; margin-bottom: -4px; }
  .s-row { display: flex; flex-direction: column; gap: 5px; }
  .s-lbl { font-size: 12px; color: rgba(255,255,255,.48); font-weight: 500; }
  .s-inp, .s-sel { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); border-radius: 10px; padding: 9px 12px; color: #fff; font-size: 13px; font-family: system-ui, sans-serif; outline: none; transition: border-color .2s, background .2s; width: 100%; }
  .s-inp:focus, .s-sel:focus { border-color: rgba(99,102,241,.5); background: rgba(99,102,241,.06); }
  .s-inp::placeholder { color: rgba(255,255,255,.2); }
  .s-sel { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='rgba(255,255,255,0.35)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 10px; padding-right: 32px; }
  .s-sel option { background: #1a1a24; color: #fff; }
  .auto-chip { display: inline-block; font-size: 10px; color: #4ade80; background: rgba(74,222,128,.12); border: 1px solid rgba(74,222,128,.25); border-radius: 6px; padding: 2px 7px; margin-top: 2px; }
  .s-apply { margin-top: 4px; padding: 11px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border: none; border-radius: 12px; color: #fff; font-size: 13px; font-weight: 600; font-family: system-ui, sans-serif; cursor: pointer; transition: all .2s; box-shadow: 0 4px 14px rgba(99,102,241,.3); }
  .s-apply:hover { box-shadow: 0 4px 20px rgba(99,102,241,.5); transform: translateY(-1px); }
  .s-apply:active { transform: translateY(0); }
`;

const GEAR_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;

// ─── CARD CLASS ───────────────────────────────────────────────────────────────
class TvMediaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._cfg          = {};
    this._lang         = 'en';
    this._hass         = null;
    this._raf          = null;
    this._hassInited   = false;
  }

  setConfig(config) {
    if (!config.entity) throw new Error('[tv-media-card] "entity" is required');
    this._cfg = {
      entity:            config.entity,
      name:              config.name  || null,
      brand:             config.brand || '',
      language:          config.language || 'en',
      apps:              config.apps  || null,
    };
    this._lang = this._cfg.language;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;

    this._hassInited = true;

    this._updateCard();
  }

  getCardSize() { return 6; }

  // ── helpers ─────────────────────────────────────────────────────────────────
  _t(k)  { return (TV_I18N[this._lang] || TV_I18N.en)[k] || k; }
  _$(id) { return this.shadowRoot.getElementById(id); }

  _callMedia(svc, data = {}) {
    if (!this._hass) return;
    this._hass.callService('media_player', svc, { entity_id: this._cfg.entity, ...data });
  }

  _fmt(sec) {
    if (!sec || isNaN(sec) || sec < 0) return '0:00';
    const s = Math.floor(sec), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    return h ? `${h}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}` : `${m}:${String(ss).padStart(2,'0')}`;
  }

  // All entity_ids for a domain, sorted by friendly_name
  _domainEntities(domain) {
    if (!this._hass) return [];
    return Object.keys(this._hass.states)
      .filter(e => e.startsWith(domain + '.'))
      .sort((a, b) => {
        const na = this._hass.states[a]?.attributes?.friendly_name || a;
        const nb = this._hass.states[b]?.attributes?.friendly_name || b;
        return na.localeCompare(nb);
      });
  }

  // Build <option> HTML for a list of entity IDs
  _buildOpts(entities, current, withNone = false) {
    let html = withNone ? `<option value="">${this._t('none')}</option>` : '';
    for (const eid of entities) {
      const fname = this._hass?.states[eid]?.attributes?.friendly_name;
      const label = fname ? `${fname} (${eid})` : eid;
      html += `<option value="${eid}"${eid === current ? ' selected' : ''}>${label}</option>`;
    }
    return html;
  }

  // ── render (once) ────────────────────────────────────────────────────────────
  _render() {
    const c = this._cfg;
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
        ${TV_CSS}
      </style>

      <div class="card">

        <div class="hdr">
          <div>
            <div class="room" id="room">${c.name || c.entity}</div>
            <div class="badge">
              <div class="dot off" id="dot"></div>
              <span id="stTxt">${this._t('off')}</span>
            </div>
          </div>
          <div class="hdr-right">
            <button class="mute-btn" id="btnMute" aria-label="Mute">
              <svg id="muteIc" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
            <button class="gear-btn" id="btnGear" aria-label="Settings">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
            <button class="pwr dim" id="pwr" aria-label="Power">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
                <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                <line x1="12" y1="2" x2="12" y2="12"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="tv-outer">
          <div class="tv-click" id="tvClick">
            <div class="tv-body">
              <div class="screen" id="scr">
                <div class="scr-bg" id="scrBg" style="opacity:.04">
                  <div class="logo-wrap" id="logoWrap" style="display:none"></div>
                  <div id="offMsg" style="display:flex">
                    <span class="off-msg">${this._t('standby')}</span>
                  </div>
                  <div id="homeWrap" style="display:none" class="home-screen">
                    <div class="home-row">
                      <div class="home-tile wide" style="--hc:rgba(99,102,241,.35)"></div>
                      <div class="home-tile" style="--hc:rgba(239,68,68,.3)"></div>
                    </div>
                    <div class="home-row">
                      <div class="home-tile" style="--hc:rgba(16,185,129,.3)"></div>
                      <div class="home-tile" style="--hc:rgba(245,158,11,.3)"></div>
                      <div class="home-tile" style="--hc:rgba(139,92,246,.3)"></div>
                    </div>
                    <div class="home-bar"></div>
                    <div class="home-bar short"></div>
                  </div>
                </div>
              </div>
              <div class="bezel">
                <span class="tv-brand" id="brand">${(c.brand || '').toUpperCase()}</span>
                <div class="led off" id="led"></div>
              </div>
            </div>
            <div class="stand"><div class="neck"></div><div class="foot"></div></div>
          </div>
        </div>

        <div class="np">
          <div class="np-app"   id="npApp"></div>
          <div class="np-title" id="npTitle">—</div>
          <div class="np-sub"   id="npSub">${this._t('nowPlaying')}</div>
        </div>

        <div class="prog">
          <div class="times"><span id="cur">0:00</span><span id="tot">0:00</span></div>
          <div class="pbar" id="pbar">
            <div class="pfill" id="pfill"><div class="pthumb"></div></div>
          </div>
        </div>

        <div class="ctrls">
          <button class="btn sm" id="btnPrev" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>
            </svg>
          </button>
          <button class="btn lg" id="btnPlay" aria-label="Play/Pause">
            <svg id="icPlay"  viewBox="0 0 24 24" fill="white" style="display:none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <svg id="icPause" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          </button>
          <button class="btn sm" id="btnNext" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
            </svg>
          </button>
        </div>

        <div class="divider"></div>

        <div class="vol">
          <div class="vol-ic" id="volIc" role="button" aria-label="Mute">
            <svg id="volSvg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </div>
          <div class="vbar" id="vbar"><div class="vfill" id="vfill"><div class="vthumb"></div></div></div>
          <div class="vol-pct" id="volPct">0%</div>
        </div>

      </div>

      <!-- Settings overlay — outside .card to avoid overflow:hidden clip -->
      <div class="overlay" id="overlay">
        <div class="modal">
          <div class="m-head">
            <div class="m-title">${GEAR_SVG}<span>${this._t('cardSettings')}</span></div>
            <button class="m-close" id="mClose" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="m-body">

            <div class="s-sec">${this._t('general')}</div>

            <div class="s-row">
              <div class="s-lbl">${this._t('roomName')}</div>
              <input class="s-inp" id="iName" type="text" value="${c.name || ''}" placeholder="${c.entity}">
            </div>

            <div class="s-row">
              <div class="s-lbl">${this._t('brand')}</div>
              <input class="s-inp" id="iBrand" type="text" value="${c.brand || ''}" placeholder="SAMSUNG / LG / SONY…">
            </div>

            <div class="s-row">
              <div class="s-lbl">${this._t('entity')}</div>
              <!-- populated on open from hass.states -->
              <select class="s-sel" id="iEntity"><option value="${c.entity}">${c.entity}</option></select>
            </div>

            <div class="s-sec">${this._t('appearance')}</div>

            <div class="s-row">
              <div class="s-lbl">${this._t('lang')}</div>
              <select class="s-sel" id="iLang">
                <option value="en">🇬🇧 English</option>
                <option value="ro">🇷🇴 Română</option>
                <option value="de">🇩🇪 Deutsch</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="es">🇪🇸 Español</option>
                <option value="it">🇮🇹 Italiano</option>
                <option value="pl">🇵🇱 Polski</option>
                <option value="hu">🇭🇺 Magyar</option>
                <option value="nl">🇳🇱 Nederlands</option>
                <option value="pt">🇵🇹 Português</option>
                <option value="cs">🇨🇿 Čeština</option>
                <option value="sk">🇸🇰 Slovenčina</option>
              </select>
            </div>

            <button class="s-apply" id="btnApply">${this._t('apply')}</button>

          </div>
        </div>
      </div>

      <!-- App launcher overlay -->
      <div class="app-overlay" id="appOverlay">
        <div class="app-modal">
          <div class="app-head">
            <div class="app-head-title">▶ ${this._t('launchApp')}</div>
            <div style="display:flex;gap:6px;align-items:center;">
              <button class="app-edit-btn" id="btnEditApps">Edit</button>
              <button class="app-close" id="appClose" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="app-grid" id="appGrid">
            <div class="add-form" id="addForm">
              <input class="add-inp" id="addName" type="text" placeholder="App name (ex: YouTube)">
              <input class="add-inp" id="addId" type="text" placeholder="Package ID (ex: com.google.android.youtube.tv)">
              <div class="add-row">
                <button class="add-save" id="addSave">Add</button>
                <button class="add-cancel" id="addCancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this._$('iLang').value = this._lang;
    this._bindEvents();
  }

  // ── events ──────────────────────────────────────────────────────────────────
  _bindEvents() {
    // Power — remote if available, else media_player
    this._$('pwr').addEventListener('click', () => {
      if (!this._hass) return;
      const stObj2  = this._hass.states[this._cfg.entity];
      const s2      = stObj2?.state;
      const attr2   = stObj2?.attributes || {};
      const assumed2    = attr2.assumed_state === true;
      const hasLive2    = !!(attr2.app_id || attr2.app_name || attr2.media_title);
      const currentlyOn = (assumed2 && hasLive2) ? true : (s2 !== 'off' && s2 !== 'unavailable');
      this._callMedia(currentlyOn ? 'turn_off' : 'turn_on');
    });

    this._$('btnPlay').addEventListener('click', () => {
      const s = this._hass?.states[this._cfg.entity]?.state;
      this._callMedia(s === 'playing' ? 'media_pause' : 'media_play');
    });
    this._$('btnPrev').addEventListener('click', () => this._callMedia('media_previous_track'));
    this._$('btnNext').addEventListener('click', () => this._callMedia('media_next_track'));

    this._$('pbar').addEventListener('click', e => {
      const r   = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      const dur = this._hass?.states[this._cfg.entity]?.attributes?.media_duration || 0;
      if (dur > 0) this._callMedia('media_seek', { seek_position: +(pct * dur).toFixed(1) });
    });

    this._$('vbar').addEventListener('click', e => {
      const r   = e.currentTarget.getBoundingClientRect();
      const pct = +Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)).toFixed(2);
      this._callMedia('volume_set', { volume_level: pct });
    });

    this._$('btnMute').addEventListener('click', () => {
      const muted = this._hass?.states[this._cfg.entity]?.attributes?.is_volume_muted ?? false;
      this._callMedia('volume_mute', { is_volume_muted: !muted });
    });

    this._$('volIc').addEventListener('click', () => {
      const muted = this._hass?.states[this._cfg.entity]?.attributes?.is_volume_muted ?? false;
      this._callMedia('volume_mute', { is_volume_muted: !muted });
    });

    this._$('btnGear').addEventListener('click',  () => this._openSettings());
    this._$('mClose').addEventListener('click',   () => this._closeSettings());
    this._$('overlay').addEventListener('click', e => { if (e.target === this._$('overlay')) this._closeSettings(); });

    this._$('tvClick').addEventListener('click',   () => this._openApps());

    this._$('btnApply').addEventListener('click', () => {
      const name   = this._$('iName').value.trim();
      const brand  = this._$('iBrand').value.trim();
      const entity = this._$('iEntity').value;
      const lang   = this._$('iLang').value;

      if (name)   { this._cfg.name  = name;   this._$('room').textContent  = name; }
      if (brand)  { this._cfg.brand = brand;   this._$('brand').textContent = brand.toUpperCase(); }
      if (entity) this._cfg.entity = entity;
      if (lang)   { this._lang = lang; this._cfg.language = lang; }

      this._closeSettings();
      this._updateCard();
    });
  }

  _openApps() {
    this._editMode = false;
    this._renderAppGrid();
    this._$('appOverlay').classList.add('open');

    this._$('btnEditApps').onclick = () => {
      this._editMode = !this._editMode;
      this._$('btnEditApps').classList.toggle('active', this._editMode);
      this._$('btnEditApps').textContent = this._editMode ? 'Done' : 'Edit';
      this._renderAppGrid();
    };

    this._$('appClose').onclick  = () => this._closeApps();
    this._$('appOverlay').onclick = e => { if (e.target === this._$('appOverlay')) this._closeApps(); };
  }

  _renderAppGrid() {
    const currentAppId = this._hass?.states[this._cfg.entity]?.attributes?.app_id || '';
    const apps = this._getApps();
    const grid = this._$('appGrid');
    const editMode = this._editMode;

    // Build app tiles
    let tilesHtml = apps.map((app, i) => {
      const logo = tvGetLogo(app.id);
      const isActive = currentAppId === app.id;
      const hue = ((app.name.charCodeAt(0) || 0) * 47 + (app.name.charCodeAt(1) || 0) * 13) % 360;
      const logoHtml = logo
        ? `<div class="app-logo">${logo}</div>`
        : `<div class="app-logo"><div class="app-logo-fallback" style="background:hsl(${hue},55%,35%)">${app.name[0].toUpperCase()}</div></div>`;
      return `<div class="app-item${isActive ? ' active-app' : ''}" data-idx="${i}" data-app-id="${app.id}" draggable="${editMode}">
        <button class="app-del" data-idx="${i}" title="Remove">×</button>
        ${logoHtml}
        <div class="app-name">${app.name}</div>
      </div>`;
    }).join('');

    // Add button (always last)
    tilesHtml += `<div class="app-item app-add" id="btnAddApp" title="Add app">+<div class="app-name">Add</div></div>`;

    // Add form (hidden by default)
    tilesHtml += `<div class="add-form" id="addForm">
      <input class="add-inp" id="addName" type="text" placeholder="App name (ex: YouTube)">
      <input class="add-inp" id="addId" type="text" placeholder="Package ID (ex: com.google.android.youtube.tv)">
      <div class="add-row">
        <button class="add-save" id="addSave">Add</button>
        <button class="add-cancel" id="addCancel">Cancel</button>
      </div>
    </div>`;

    grid.innerHTML = tilesHtml;
    grid.classList.toggle('edit-mode', editMode);

    // Launch on click (non-edit mode)
    grid.querySelectorAll('.app-item:not(.app-add)').forEach(el => {
      el.addEventListener('click', () => {
        if (this._editMode) return;
        this._launchApp(el.dataset.appId);
        this._closeApps();
      });
    });

    // Delete buttons
    grid.querySelectorAll('.app-del').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const idx = +btn.dataset.idx;
        const apps = this._getApps();
        apps.splice(idx, 1);
        this._saveApps(apps);
        this._renderAppGrid();
      });
    });

    // Add app button
    this._$('btnAddApp').addEventListener('click', () => {
      this._$('addForm').classList.add('open');
      this._$('addName').focus();
    });

    // Save new app
    this._$('addSave').addEventListener('click', () => {
      const name = this._$('addName').value.trim();
      const id   = this._$('addId').value.trim();
      if (!name || !id) return;
      const apps = this._getApps();
      apps.push({ name, id });
      this._saveApps(apps);
      this._renderAppGrid();
    });

    this._$('addCancel').addEventListener('click', () => {
      this._$('addForm').classList.remove('open');
    });

    // Drag-to-reorder
    if (editMode) this._bindDrag(grid);
  }

  _bindDrag(grid) {
    let dragIdx = null;
    grid.querySelectorAll('.app-item[draggable]').forEach(el => {
      el.addEventListener('dragstart', e => {
        dragIdx = +el.dataset.idx;
        el.style.opacity = '.4';
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend',  () => { el.style.opacity = ''; dragIdx = null; });
      el.addEventListener('dragover', e => {
        e.preventDefault();
        if (dragIdx === null || +el.dataset.idx === dragIdx) return;
        const apps = this._getApps();
        const moved = apps.splice(dragIdx, 1)[0];
        const targetIdx = +el.dataset.idx;
        apps.splice(targetIdx, 0, moved);
        dragIdx = targetIdx;
        this._saveApps(apps);
        this._renderAppGrid();
      });
    });
  }

  _getApps() {
    const key = 'tvcard_apps_' + this._cfg.entity;
    const stored = localStorage.getItem(key);
    if (stored) { try { return JSON.parse(stored); } catch(e) {} }
    return this._cfg.apps ? [...this._cfg.apps] : [...DEFAULT_APPS];
  }

  _saveApps(apps) {
    const key = 'tvcard_apps_' + this._cfg.entity;
    localStorage.setItem(key, JSON.stringify(apps));
  }

  _closeApps() {
    this._$('appOverlay').classList.remove('open');
    this._editMode = false;
  }

  _launchApp(appId) {
    if (!this._hass || !appId) return;
    this._hass.callService('media_player', 'play_media', {
      entity_id: this._cfg.entity,
      media_content_type: 'app',
      media_content_id: appId,
    });
  }

  _openSettings() {
    // Populate dropdowns fresh from live hass.states every time
    const mpEntities = this._domainEntities('media_player');

    this._$('iEntity').innerHTML = this._buildOpts(mpEntities, this._cfg.entity,        false);

    this._$('iName').value  = this._cfg.name  || '';
    this._$('iBrand').value = this._cfg.brand || '';
    this._$('iLang').value  = this._lang;


    this._$('overlay').classList.add('open');
  }

  _closeSettings() {
    this._$('overlay').classList.remove('open');
  }

  // ── state → DOM ─────────────────────────────────────────────────────────────
  _updateCard() {
    if (!this._hass) return;
    const sr = this.shadowRoot;
    if (!sr.getElementById('dot')) return;

    const stObj = this._hass.states[this._cfg.entity];
    if (!stObj) return;

    const s          = stObj.state;
    const attr       = stObj.attributes;

    // When assumed_state:true HA can't read real state — treat as ON if we have live data
    const assumed    = attr.assumed_state === true;
    const hasLiveData = !!(attr.app_id || attr.app_name || attr.media_title);
    const isOn       = (assumed && hasLiveData)
                       ? true
                       : s !== 'off' && s !== 'unavailable';
    const isPlaying  = s === 'playing';

    sr.getElementById('room').textContent =
      this._cfg.name || attr.friendly_name || this._cfg.entity;

    sr.getElementById('dot').classList.toggle('off', !isOn);
    const stMap = { on: this._t('on'), playing: this._t('on'), paused: this._t('on'), idle: this._t('idle'), off: this._t('off'), unavailable: this._t('unavailable') };
    sr.getElementById('stTxt').textContent = stMap[s] ?? (isOn ? this._t('on') : this._t('off'));

    sr.getElementById('pwr').classList.toggle('dim', !isOn);
    sr.getElementById('scr').classList.toggle('on', isOn);
    sr.getElementById('scrBg').style.opacity = isOn ? '1' : '.04';
    sr.getElementById('led').classList.toggle('off', !isOn);

    // App logo + name — app_id is the canonical package name, more reliable than app_name
    const rawApp  = (attr.app_id || attr.app_name || attr.source || '').trim();
    const appName = _isSystemString(rawApp) ? '' : rawApp;
    const logo    = tvGetLogo(rawApp); // pass raw (pkg) for PKG_TABLE lookup, fallback alias
    const showLogo = isOn && s !== 'idle' && !!logo;

    sr.getElementById('logoWrap').style.display = showLogo ? 'flex' : 'none';
    sr.getElementById('offMsg').style.display   = isOn     ? 'none' : 'flex';
    sr.getElementById('homeWrap').style.display = (isOn && !showLogo) ? 'block' : 'none';
    if (showLogo) sr.getElementById('logoWrap').innerHTML = logo;

    // Show friendly app name below: prefer app_name if it's not a system string, else blank
    const friendlyApp = attr.app_name && !_isSystemString(attr.app_name) ? attr.app_name : '';
    sr.getElementById('npApp').textContent   = showLogo ? (friendlyApp || appName).toUpperCase() : '';
    sr.getElementById('npTitle').textContent = attr.media_title || (s === 'idle' ? this._t('idle') : '—');
    sr.getElementById('npSub').textContent   = this._t('nowPlaying');
    sr.getElementById('icPlay').style.display  = isPlaying ? 'none'  : 'block';
    sr.getElementById('icPause').style.display = isPlaying ? 'block' : 'none';

    // Progress
    cancelAnimationFrame(this._raf);
    const duration = attr.media_duration || 0;
    sr.getElementById('tot').textContent = this._fmt(duration);

    if (isPlaying && duration > 0) {
      // If HA has no timestamp yet (new track just started), trust position=0 to avoid stale value
      const snap = attr.media_position_updated_at ? (attr.media_position || 0) : 0;
      const ref  = attr.media_position_updated_at
        ? new Date(attr.media_position_updated_at).getTime()
        : Date.now();
      const tick = () => {
        const el = sr.getElementById('pfill');
        const ce = sr.getElementById('cur');
        if (!el) return;
        const pos = Math.min(snap + (Date.now() - ref) / 1000, duration);
        el.style.transition = 'none';
        el.style.width      = (pos / duration * 100).toFixed(2) + '%';
        if (ce) ce.textContent = this._fmt(pos);
        this._raf = requestAnimationFrame(tick);
      };
      this._raf = requestAnimationFrame(tick);
    } else {
      const pos = attr.media_position || 0;
      const el  = sr.getElementById('pfill');
      if (el) { el.style.transition = 'width .5s linear'; el.style.width = duration > 0 ? (pos / duration * 100).toFixed(2) + '%' : '0%'; }
      sr.getElementById('cur').textContent = this._fmt(pos);
    }

    // Volume — bar shows real level even when muted (mute state shown separately)
    const vol    = attr.volume_level    ?? 0;
    const muted  = attr.is_volume_muted ?? false;
    sr.getElementById('vfill').style.width  = (vol * 100).toFixed(1) + '%';
    sr.getElementById('volPct').textContent = muted ? '🔇' : Math.round(vol * 100) + '%';

    const effVol = muted ? 0 : vol;
    const svg = sr.getElementById('volSvg');
    if (effVol === 0) {
      svg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`;
    } else if (effVol < 0.5) {
      svg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
    } else {
      svg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
    }

    // Mute button icon — X when muted, speaker when not
    const muteIc = sr.getElementById('muteIc');
    const muteBtn = sr.getElementById('btnMute');
    if (muteIc && muteBtn) {
      muteBtn.classList.toggle('muted', muted);
      muteIc.innerHTML = muted
        ? `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>`
        : `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>`;
    }
  }
}

customElements.define('tv-media-card', TvMediaCard);
