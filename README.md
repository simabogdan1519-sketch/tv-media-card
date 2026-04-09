# TV Media Card

A custom Home Assistant Lovelace card for controlling Android TV and media devices with a modern, intuitive interface. Displays a TV bezel visualization with playback controls, volume management, and quick app launcher.



## Features

- **TV Bezel UI** — Realistic TV bezel display with customizable brand name
- **Media Controls** — Play, pause, stop, next, previous buttons
- **Volume Control** — Visual volume slider with mute toggle  
- **Progress Bar** — Playback position and duration display with seek capability
- **App Launcher** — Quick launch buttons for supported apps (YouTube, Netflix, Plex, Disney+, Prime Video, Apple TV, Spotify, Twitch, Max, Hulu, DAZN)
- **Power Management** — Turn TV on/off or enter standby mode
- **Multi-Language Support** — English, Romanian, German, French, Spanish, Italian, Polish, Hungarian, Dutch, Portuguese, Czech, Slovak
- **Responsive Design** — Works on desktop and mobile devices
- **Real-time Updates** — Updates as media state changes in Home Assistant

## Installation

### Prerequisites

- Home Assistant instance running
- **Android TV Remote Integration** — Required for controlling Android TV devices. Install the official integration:  
  👉 [Android TV Remote Integration Documentation](https://www.home-assistant.io/integrations/androidtv_remote/)

### Steps

1. **Copy the file** to your Home Assistant config directory:
   ```bash
   cp tv-media-card.js /config/www/
   ```

2. **Add the resource** in Home Assistant Lovelace:
   - Go to **Settings** → **Dashboards** → **Edit Dashboard** (top-right menu)
   - Click the three-dot menu and select **Raw configuration editor**
   - Add this to the `resources` section:
     ```yaml
     resources:
       - url: /local/tv-media-card.js
         type: module
     ```
   - Save and reload

3. **Add the card** to your dashboard:
   ```yaml
   type: custom:tv-media-card
   entity: media_player.your_tv_entity
   ```

## Usage

### Minimal Configuration

```yaml
type: custom:tv-media-card
entity: media_player.living_room_tv
```

### Full Configuration Example

```yaml
type: custom:tv-media-card
entity: media_player.samsung_tv
name: Living Room TV
brand: SAMSUNG
language: ro
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Media player entity ID (e.g., `media_player.bedroom_tv`) |
| `name` | string | Friendly name | Display name shown above the TV bezel |
| `brand` | string | Generic | TV manufacturer brand (displayed on bezel top) |
| `language` | string | `en` | Display language |

### Supported Languages

- `en` — English
- `ro` — Romanian  
- `de` — German
- `fr` — French
- `es` — Spanish
- `it` — Italian
- `pl` — Polish
- `hu` — Hungarian
- `nl` — Dutch
- `pt` — Portuguese
- `cs` — Czech
- `sk` — Slovak

## How It Works

### Supported Apps

The card includes quick-launch buttons for these streaming services:

| App | Package |
|-----|---------|
| YouTube | YouTube |
| Netflix | Netflix |
| Plex | Plex |
| Disney+ | Disney+ |
| Prime Video | Prime Video |
| Apple TV | Apple TV |
| Spotify | Spotify |
| Twitch | Twitch |
| Max (HBO Max) | Max |
| Hulu | Hulu |
| DAZN | DAZN |

App launch buttons automatically appear based on the TV's capabilities detected through the Android TV Remote Integration.

### Controls

- **Power Button** — Toggle TV on/off
- **Volume Slider** — Adjust volume (visual feedback with mute indicator)
- **Playback Buttons** — Play, pause, stop, next, previous
- **Progress Bar** — Shows playback position; click to seek
- **Mute Toggle** — Mute/unmute audio (button shows 🔇 when muted)
- **Settings Icon** — Card configuration (language, brand, name)

### Real-Time Updates

The card updates in real-time as the media state changes. The progress bar animates smoothly during playback and reflects paused/stopped states.

## Entity Setup

For best results, ensure your media player entity has these attributes:

- `state` — `on`, `off`, `idle`, `playing`, `paused`, `unavailable`
- `media_position` — Current playback position (seconds)
- `media_duration` — Total media duration (seconds)
- `volume_level` — Volume level (0.0 - 1.0)
- `is_volume_muted` — Boolean mute state

### Example: Android TV Integration

If using the Android TV Remote Integration:

```yaml
# configuration.yaml
androidtv_remote:
  - host: 192.168.1.100
    name: Living Room TV
```

This creates a `media_player.living_room_tv` entity that you can use with this card.

## Troubleshooting

### Card not appearing?

1. Ensure the resource is correctly added to your dashboard
2. Check browser console for JavaScript errors (F12 → Console)
3. Clear browser cache and reload

### Controls not working?

1. Verify the `media_player` entity exists in Home Assistant
2. Check that the Android TV Remote Integration is properly configured
3. Ensure the TV is turned on and reachable on the network

### Language not working?

Check the `language` parameter. Supported values: `en`, `ro`, `de`, `fr`, `es`, `it`, `pl`, `hu`, `nl`, `pt`, `cs`, `sk`.

## Development

### File Structure

- `tv-media-card.js` — Main card component

### Customization

To add a new language, edit the `TV_I18N` object at the top of the file:

```javascript
const TV_I18N = {
  en: { /* English translations */ },
  newlang: { /* New language translations */ },
  // ...
};
```

Then update the `language` parameter docs above.

To add a new app logo, edit the `_LOGOS` object and add the SVG.

## License

MIT License

## Contributing

Contributions are welcome! If you find a bug or have a feature request:

1. Open an issue on GitHub
2. Include a clear description and (if applicable) configuration YAML
3. Check the browser console for errors

---
