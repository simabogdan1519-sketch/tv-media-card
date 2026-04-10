# TV Media Card

A premium custom Lovelace card for Home Assistant that displays your TV as an interactive media controller with a realistic TV design, app launcher, and full playback controls.



## Features

- **Realistic TV visualization** — skeuomorphic TV with screen, bezel, stand, and LED indicator
- **App launcher** — click the TV screen to open a grid of streaming apps; launch them directly
- **Bento grid home screen** — animated tile grid showing your configured apps when TV is idle
- **Dual entity support** — separate entities for remote control (power/volume/apps) and Cast (media info/playback)
- **Now Playing** — displays current media title, artist, and app with real-time progress bar
- **Playback controls** — play/pause, previous/next track, seek
- **Volume control** — volume bar, mute toggle, and +/− step buttons for TVs without `volume_set` support
- **Volume steps** — display volume as steps (e.g. `10/25`) instead of percentage, perfect for Google TV
- **App management** — add, remove, and reorder apps via drag-and-drop in edit mode
- **12 built-in app logos** — YouTube, Netflix, Plex, Disney+, Prime Video, Apple TV, Spotify, Twitch, Max (HBO), Hulu, DAZN, YouTube Music
- **Auto app detection** — recognizes apps by package name or friendly name and displays the correct logo
- **Settings panel** — configure everything from the card UI, changes persist to YAML
- **Multi-language** — English, Romanian, German, French, Spanish, Italian, Polish, Hungarian, Dutch, Portuguese, Czech, Slovak

## Requirements

### Home Assistant Integrations

You need **at least one** of these integrations for your TV:

| Integration | What it provides | Entity example |
|---|---|---|
| [**Android TV Remote**](https://www.home-assistant.io/integrations/androidtv_remote/) | Power on/off, app detection (`app_id`, `app_name`), volume control, app launching | `media_player.living_room_tv` |
| [**Android Debug Bridge**](https://www.home-assistant.io/integrations/androidtv/) | Similar to above via ADB | `media_player.living_room_tv` |
| [**Google Cast**](https://www.home-assistant.io/integrations/cast/) | Media title, artist, duration, position, play/pause state, seek, prev/next | `media_player.living_room_cast` |

**Recommended setup**: Use **Android TV Remote** as the main entity (for power, volume, apps) and **Google Cast** as the cast entity (for media info and playback controls). This gives you the best of both worlds.

### Why two entities?

Android TV Remote knows what app is running and handles power/volume, but often doesn't report media titles or playback position. Google Cast knows exactly what's playing with full media metadata, but can't control power or launch apps. This card lets you combine both.

## Installation

### Manual

1. Download `tv-media-card.js` from the [latest release](../../releases)
2. Copy it to your Home Assistant `/config/www/` directory
3. Add the resource in **Settings → Dashboards → Resources**:
   - URL: `/local/tv-media-card.js`
   - Type: **JavaScript Module**
4. Refresh your browser (Ctrl+F5)

### HACS (Custom Repository)

1. Open HACS → Frontend → Custom repositories
2. Add this repository URL, category: **Lovelace**
3. Search for "TV Media Card" and install
4. Refresh your browser

## Configuration

### Minimal

```yaml
type: custom:tv-media-card
entity: media_player.living_room_tv
```

### Full

```yaml
type: custom:tv-media-card
entity: media_player.living_room_tv           # Required — Android TV / remote entity
cast_entity: media_player.living_room_cast    # Optional — Google Cast entity for media info
name: Living Room TV                          # Optional — display name (default: entity friendly_name)
brand: SAMSUNG                                # Optional — brand text on TV bezel
language: ro                                  # Optional — UI language (default: en)
volume_steps: 25                              # Optional — 0=percentage, 25=Google TV steps
apps:                                         # Optional — override default app list
  - name: YouTube
    id: com.google.android.youtube.tv
  - name: Netflix
    id: com.netflix.ninja
  - name: Plex
    id: com.plexapp.android
```

### Configuration Options

| Option | Type | Default | Description |
|---|---|---|---|
| `entity` | string | **required** | Main media player entity (Android TV Remote / ADB). Controls: power, volume, mute, app launching, app detection. |
| `cast_entity` | string | — | Google Cast media player entity. Provides: media title, artist, duration, position, play/pause/seek/prev/next. |
| `name` | string | friendly_name | Display name shown in the card header. |
| `brand` | string | — | TV brand text displayed on the bezel (e.g. `SAMSUNG`, `LG`, `SONY`). |
| `language` | string | `en` | UI language. Supported: `en`, `ro`, `de`, `fr`, `es`, `it`, `pl`, `hu`, `nl`, `pt`, `cs`, `sk`. |
| `volume_steps` | number | `0` | Volume display mode. `0` = show as percentage (40%). Any other number = show as steps (10/25). Google TV typically uses `25`. |
| `apps` | list | built-in list | Custom app list. Each item needs `name` (display) and `id` (Android package name). |

### Entity Routing

| Action | Target Entity |
|---|---|
| Power on/off | `entity` |
| Volume up/down/mute | `entity` |
| Launch app | `entity` |
| Play / Pause | `cast_entity` (fallback: `entity`) |
| Previous / Next track | `cast_entity` (fallback: `entity`) |
| Seek (progress bar click) | `cast_entity` (fallback: `entity`) |
| Media title, artist, progress | `cast_entity` (fallback: `entity`) |
| App logo on screen | `entity` |

## Built-in App Logos

The card recognizes these apps by Android package name and displays their official logo:

| App | Package Name |
|---|---|
| YouTube | `com.google.android.youtube.tv` |
| Netflix | `com.netflix.ninja` |
| Plex | `com.plexapp.android` |
| Disney+ | `com.disney.disneyplus` |
| Prime Video | `com.amazon.amazonvideo.livingroom` |
| Apple TV | `com.apple.atve.amazon.appletv` |
| Spotify | `com.spotify.tv.android` |
| Twitch | `tv.twitch.android.app` |
| Max (HBO) | `com.wbd.stream` |
| Hulu | `com.hulu.livingroomplus` |
| DAZN | `com.dazn.mobile` |
| YouTube Music | `com.google.android.apps.youtube.music` |

Apps are also detected by friendly name (e.g. if your TV reports "Netflix" instead of the package name).

## Settings Panel

Click the gear icon in the card header to open the settings panel. All changes are saved directly to your Lovelace YAML configuration.

Available settings:
- **Room / Device Name** — override the entity's friendly name
- **TV Brand** — text displayed on the TV bezel
- **Media Player** — select the main entity from all available media players
- **Cast Entity** — select the Google Cast entity for media info
- **Volume Display** — choose between percentage or step display
- **Language** — UI language

## App Launcher

Click anywhere on the TV screen to open the app launcher overlay.

- **Launch** — click any app tile to launch it on your TV
- **Edit mode** — click "Edit" to enable drag-to-reorder and remove apps
- **Add apps** — click the "+" tile to add a custom app with name and package ID
- **Active indicator** — the currently running app gets a green border

## Volume Steps

Some TVs (like Google TV / Chromecast with Google TV) use a fixed number of volume steps instead of a continuous 0–100% range. For example, Google TV has 25 steps, so volume level 0.40 (40%) equals step 10 out of 25.

When `volume_steps` is set:
- The volume display shows `10/25` instead of `40%`
- Clicking the volume bar snaps to the nearest step
- The +/− buttons still work normally (they call `volume_up` / `volume_down`)

## Troubleshooting

### Card doesn't appear / 404 error
- Make sure the file is at `/config/www/tv-media-card.js`
- Check the resource URL is exactly `/local/tv-media-card.js` (no spaces)
- Clear browser cache (Ctrl+F5)

### No media title or progress bar
- You probably need to set `cast_entity` to your Google Cast entity
- Android TV Remote often doesn't expose media metadata

### Volume control throws errors
- Your TV may not support `volume_set` — the card handles this gracefully
- Use the +/− buttons instead of clicking the volume bar
- The +/− buttons use `volume_up` / `volume_down` which are universally supported

### App logos not showing
- The card matches apps by package name first, then by friendly name
- Check your TV's `app_id` attribute in Developer Tools → States
- You can add custom apps in the app launcher edit mode

## License

MIT License 
