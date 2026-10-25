# SYAHMIAOF — Digital Brutalism Character Pack V1

Visual reference pack for the planned SYAHMIAOF website. Design exploration only; no website code is included.

## Assets

| File | Intended use |
| --- | --- |
| `00_original_B_reference.png` | Original, user-selected Digital Brutalism hero; keep as the art-direction reference |
| `01_hero_B_realistic.png` | Polished original hero with more natural human skin, hair, fabric and lighting |
| `02_character_builder_laptop.png` | Standing, typing on laptop; Services / Web Development sections |
| `03_character_creator_laptop.png` | Seated, typing on laptop; 1:1 Coaching section |
| `04_character_consultant_laptop.png` | Standing, holding closed laptop; About / Contact sections |

The three individual character assets are RGBA PNGs with transparent backgrounds. The full hero screenshots are nontransparent compositions. Preserve their transparency when exporting or optimizing.

## Visual continuity

- Fictional character, **not a likeness of Syahmi**: adult man with natural tan skin, messy black medium-length hair and angular black sunglasses.
- Wardrobe: black technical windbreaker, black utility trousers and rugged black trainers.
- Art direction: black, concrete textures, acid neon yellow, electric cobalt blue, oversized condensed typography, strong editorial 3D shapes.
- Use the approved original B as the design reference for all future sections. The later browser-sculpture revision is **not** the selected direction.

## Implementation notes for later

- These are 2D bitmap cutouts, **not actual 3D models**. Use modest parallax, layered reveals and responsive positioning instead of treating them as rigged objects.
- Keep the character from obscuring text or CTAs, especially on mobile.
- Load large images only when needed, provide appropriately sized variants and avoid continuous GPU-heavy effects.
- Visually check face, hands, laptop anatomy and hair-cutout edges before production use. AI-created variants can have small continuity differences.

