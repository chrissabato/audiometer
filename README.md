# Audiometer

A browser-based LUFS audio level meter for monitoring microphone input in real time.

## Features

- **ITU-R BS.1770-4 K-weighting** — accurate LUFS measurement using the standard two-stage IIR filter (pre-filter shelving boost + RLB high-pass), with bilinear transform coefficients adapted for any sample rate
- **3-second integrated loudness** — rolling window measurement updated every 500ms
- **30-second history graph** — scrolling canvas showing loudness over time with a target reference line
- **Color-coded feedback** — green (on target), orange (too quiet), red (too loud), with matching background tint
- **Device picker** — full-page overlay to switch audio inputs mid-session
- **`?input=` URL parameter** — pre-select a device by label or device ID for bookmarkable setups

## Usage

### GitHub Pages (no server needed)

The app is a single `index.html` and can be served statically. It auto-deploys to GitHub Pages on push to `main`.

> HTTPS is required for `getUserMedia`. GitHub Pages provides this automatically.

### Local HTTPS server

If you need to run it locally on a network (e.g. for vMix or another machine on the same LAN):

```bash
# Generate a self-signed certificate (one time)
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/CN=localhost"

# Start the server
node server.js
```

Then open `https://localhost:3000` (or the network address printed in the console) and accept the self-signed cert warning.

### Pre-selecting a device

Append `?input=<device name or ID>` to the URL:

```
https://your-host/?input=Blue+Yeti
https://your-host/?input=Focusrite
```

The match is case-insensitive and substring-based. The URL updates automatically when you switch devices through the picker, so you can bookmark the selection.

## Target level

The meter targets **-24 LUFS**, shown as a white reference line on the bar meter and a dashed line on the history graph. This is a common broadcast/streaming loudness target.
