# Night Desk Assets Guide

## Folder Roles

- `assets/concepts/`: visual references only. These guide mood, color, framing, and texture, but should not be used as final dynamic UI.
- `assets/backgrounds/`: separated environment backgrounds, such as motel front desk, hallway, room door, or exterior rain scene.
- `assets/portraits/`: separated visitor portraits or transparent bust images.
- `assets/textures/`: scanlines, noise, vignette, dirty glass, paper, and CRT overlays.
- `assets/ui/`: icons, stamps, warning symbols, frames, buttons, and decorative UI marks.
- `assets/audio/`: ambient loops, doorbell, button sound, and warning/anomaly sounds.
- `assets/fonts/`: local font files or font notes if the project later uses bundled fonts.

## Current Reference Direction

The reference zip points toward an original lo-fi motel horror style:

- cold green / gray-blue / dirty yellow grading
- degraded CCTV, CRT, and VHS noise
- rough painted-over human portraits
- motel front desk and hallway environments
- visitor inspection UI with registry, rules, notes, and action buttons

The game UI should remain layered:

```text
environment scene
-> visitor portrait / generated silhouette
-> organ anomaly markers
-> dialogue box
-> compact left-side registry, rule, stat, and action panels
```

## Current Portraits

The imported portrait batches currently cover all 15 MVP visitors and live in `assets/portraits/`:

- `visitor-quiet-woman.png`
- `visitor-hollow-eyes.png`
- `visitor-soft-smile.png`
- `visitor-heavy-smile.png`
- `visitor-wide-grin.png`
- `visitor-hood-child.png`
- `visitor-folded-smile.png`
- `visitor-thin-man.png`
- `visitor-tired-mother.png`
- `visitor-pale-woman.png`
- `visitor-office-boss.png`
- `visitor-motel-staff.png`
- `visitor-crooked-smile.png`
- `visitor-student-woman.png`
- `visitor-suit-grin.png`

These are currently mapped to guests through `visual.portrait` in `data/guests.js`.

Note: this batch uses baked checkerboard backgrounds rather than true transparency. The UI darkens and blends them into the CCTV scene as an MVP workaround. For final art, prefer true transparent `.png` or `.webp` portraits.

## Naming Rules

Use lowercase English and hyphens. Avoid spaces and Chinese filenames in production assets.

Examples:

- `motel-frontdesk-night.webp`
- `motel-hallway-dark.webp`
- `visitor-001-neutral.webp`
- `visitor-001-id-photo.webp`
- `texture-scanline.png`
- `texture-vignette.png`
- `icon-warning.svg`

## Adding A Visitor Portrait

1. Put the image in `assets/portraits/`, preferably `.webp` or `.png`.
2. Add the relative path to the guest data:

```js
visual: {
  portrait: "./assets/portraits/visitor-001-neutral.webp",
  silhouette: "visitor-average",
  threat: "normal"
}
```

3. Keep organ clues in data even when a portrait exists, so gameplay remains readable.

## Adding A Background

1. Put the image in `assets/backgrounds/`.
2. Add a scene key in guest data:

```js
visual: {
  scene: "frontdesk",
  background: "./assets/backgrounds/motel-frontdesk-night.webp"
}
```

3. If no `background` is provided, the CSS-generated scene remains the fallback.

## Concept Images vs Production Assets

Concept images are not final UI. They should not contain game text, rules, or buttons that need to change dynamically.

Production UI text should stay in HTML, CSS, and JavaScript data so the game can be edited and localized without regenerating images.
