# Hero Layered Experience

{
  "meta": {
    "scope": "HERO SECTION ONLY — not the full site spec (see sanin-portfolio-master.json for the rest of the build)",
    "project": "Mohammed Sanin — Portfolio Hero",
    "consolidates": "This pulls together every hero-relevant decision made so far — pure white theme, glass+copper material system, the abstract shape-morph concept, and the orbiting 'complete package' rings — into one buildable brief, and adds the 3D engine + Lottie layer needed to actually ship it as an immersive, premium hero.",
    "core_principle": "Three layers, each doing one job, composited together: (1) a live 3D scene as ambient background, (2) real DOM/SVG content (name, headline, orbiting rings) for anything that needs to be text/accessible/SEO-indexed, (3) Lottie for small, lightweight vector accents that don't need full 3D. Nothing here is pre-rendered AI video — every risk of generation failure, seam mismatch, or flagged text-in-video is eliminated by building live."
  },

  "tech_stack": {
    "3d_engine": "React Three Fiber + drei + Three.js — already established elsewhere in the site's stack, so this hero shares the same rendering pipeline as the projects section rather than introducing a second one",
    "lottie": "lottie-react (or @lottiefiles/dotlottie-react for smaller file size) — used ONLY for the specific small accents listed below, never for the main centerpiece animation",
    "framer_motion": "Handles all DOM-layer entrance choreography (headline fade/rise, ring-layer fade-in, CTA appearance) and hover/interaction easing",
    "why_this_split": "3D for the one big immersive centerpiece (justifies the engine's cost), Lottie for cheap small loops (near-zero cost, trivial to swap), real DOM text for anything a visitor or search engine needs to read — using the right tool per job is what keeps this fast AND rich, instead of one heavy 3D scene trying to do everything."
  },

  "layered_composition": {
    "layer_1_background_3d": "Full-bleed R3F 

, pure white (#FFFFFF) scene background, contains the shape-morph centerpiece (spec below). This is the only layer using the 3D engine.",
    "layer_2_content_dom": "Absolutely-positioned HTML/SVG on top: centered name + headline + subhead + CTA, and the three orbiting rings from the 'complete package' concept (Experience / Projects / Stack tags) — real text throughout, pointer-events enabled only on interactive elements (tags, CTA), pointer-events: none on decorative areas so the 3D layer beneath can still receive pointer position for its reactive lighting.",
    "layer_3_lottie_accents": "Small, isolated Lottie players placed at specific fixed points (scroll cue, loading placeholder, CTA hover accent) — never full-screen, never competing with the 3D centerpiece for attention."
  },

  "3d_scene_spec": {
    "centerpiece": "The established shape-morph sequence: a grid mesh resolves from soft light particles, flows into a single waveform line, folds into a small cluster of interlocking glass blocks, settles and holds — same sequence and material rules already specified for the site's abstract motifs (frosted glass, brushed metal, one warm copper #B5652D highlight, no other color, no text baked into the 3D scene).",
    "materials": "MeshTransmissionMaterial or MeshPhysicalMaterial (drei) for the frosted-glass look — real refraction and soft roughness, not a flat shader fake",
    "lighting": "Soft three-point studio lighting via drei's , white background reads as a real studio cyclorama, not a flat color plane",
    "camera": "Static, locked, no orbit controls on load — camera position fixed at a calm three-quarter angle; do NOT let visitors freely orbit the hero scene, that breaks the 'calm, precise' premium feel established elsewhere",
    "cursor_reactivity": "Subtle only — the key light's position drifts a few degrees toward the cursor position (same 'cursor-aware lighting' idea flagged earlier as a high-leverage wow moment), nothing else in the 3D scene responds to the cursor",
    "performance_budget": "Target 60fps on mid-range mobile. Keep the morph geometry low-poly (a few thousand tris max), bake the particle-gather effect as GPU instancing rather than thousands of individual mesh objects, pause/reduce the render loop when the hero scrolls out of view (IntersectionObserver)."
  },

  "content_layer_spec": {
    "name_mark": "Reuse the already-specified name-mark build (Signature Trace or Terminal Boot, whichever was chosen) — do not rebuild it separately for the hero, just position it here as the primary heading element.",
    "headline": "One confident line under the name, real H1/H2 text, Inter or the site's established body/display pairing — e.g. 'AI/ML engineer & product builder.'",
    "subhead": "One supporting line, muted grey, real text — e.g. 'AR retail, computer vision, applied ML — shipped end to end.'",
    "orbiting_rings": "The three-ring 'Index' system already specified in sanin-portfolio-master.json's hero_complete_package section — Experience / Projects / Stack, opposite-direction rotation, pause-on-hover with detail caption, mobile falls back to a single auto-cycling ring. Reuse that spec verbatim here rather than redefining it.",
    "cta": "'See the work ↓' or similar, real button element, triggers smooth-scroll to the next section."
  },

  "lottie_assets": [
    {
      "id": "loading-placeholder",
      "purpose": "Covers the brief moment before the R3F canvas has mounted/compiled shaders, so the hero never shows a blank white flash",
      "style": "A single small pulsing glass-ring/dot, matching the site's glass+copper material language in flat vector form (simple radial pulse, copper accent, white/transparent background)",
      "trigger": "Mounts immediately on page load, fades out the instant the 3D canvas reports its first frame rendered",
      "loop": "Loops continuously only while waiting — never appears again after initial load",
      "duration_per_cycle": "~1.2s"
    },
    {
      "id": "scroll-cue",
      "purpose": "A small, calm 'scroll to explore' indicator anchored at the bottom-center of the hero, the one piece of UI explicitly inviting the next action",
      "style": "A thin minimal chevron or mouse-scroll glyph, copper accent line on transparent background, gentle vertical bob (a few px, slow ease-in-out)",
      "trigger": "Fades in after the entrance sequence completes, fades out permanently once the visitor scrolls past the hero (don't bring it back)",
      "loop": "Continuous while visible",
      "duration_per_cycle": "~2s bob cycle"
    },
    {
      "id": "cta-hover-accent",
      "purpose": "A tiny animated arrow/glyph beside the CTA button that plays a quick directional nudge on hover, reinforcing the click affordance without needing a heavier interaction",
      "style": "Simple arrow or chevron, copper accent, quick single-play nudge (not looping) on hover, resets on mouse-leave",
      "trigger": "Hover/focus on the CTA button only",
      "loop": "Single play per hover, not continuous"
    }
  ],

  "lottie_sourcing_note": "Design these three as simple vector shapes in After Effects (exported via the Bodymovin/LottieFiles plugin) or directly as hand-authored Lottie JSON if the shapes are this simple — they're deliberately minimal enough not to need AI generation at all. If outsourcing, brief a designer with: 'single-color copper-on-transparent, under 15KB each, matches a frosted-glass premium tech aesthetic, no gradients beyond the established palette.'",

  "entrance_sequence_timeline": {
    "0.0s": "Page loads. loading-placeholder Lottie appears centered, pure white background visible, nothing else rendered yet.",
    "~0.0-1.0s": "R3F canvas mounts and compiles in the background (invisible to visitor, covered by the loading Lottie).",
    "~1.0s": "3D shape-morph centerpiece begins its sequence (grid → waveform → blocks) the instant the canvas is ready; loading-placeholder Lottie fades out simultaneously.",
    "~1.0-3.5s": "Shape-morph plays its resolve sequence, settles into the held blocks state.",
    "~3.0s": "Name mark entrance animation begins (overlapping slightly with the 3D settle, not waiting for it to fully finish — keeps pacing tight).",
    "~3.4s": "Headline and subhead fade/rise in beneath the name, staggered ~150ms apart.",
    "~3.8s": "Orbiting rings fade in and begin their ambient rotation.",
    "~4.2s": "CTA button fades in.",
    "~4.5s": "scroll-cue Lottie fades in at the bottom and begins its ambient bob — this is the last thing to appear, marking the entrance sequence as complete."
  },

  "interaction_rules": {
    "one_active_thing_rule": "Reconfirmed from the rest of the site's spec: during the entrance sequence, only one element animates its entrance at a time (staggered, not simultaneous chaos) — see timeline above for the exact stagger.",
    "post_entrance_idle_state": "Once settled: 3D scene holds its resolved blocks state with only the cursor-reactive lighting drift, rings rotate ambiently, scroll-cue bobs — three small ambient motions maximum at rest, nothing more."
  },

  "responsive_and_reduced_motion": {
    "mobile": "3D scene simplifies to a lower-poly/lower-particle-count version of the same morph (same sequence, cheaper render) or, if performance testing shows it's still too heavy, falls back to a single static resolved-blocks image with only the orbiting-ring layer (already specified to collapse to one auto-cycling ring on mobile) staying interactive.",
    "prefers_reduced_motion": "3D scene renders its final resolved-blocks frame statically with no morph animation and no cursor-reactive lighting; Lottie loading-placeholder and scroll-cue are skipped entirely (content just appears); orbiting rings render as static evenly-spaced labels per the existing spec."
  },

  "performance_budget": {
    "target": "First contentful paint (headline visible) under 1.5s even before the 3D scene finishes loading — the loading Lottie exists specifically to make the wait feel intentional rather than dead time, per the 800ms-perceived-speed research referenced earlier in this project.",
    "3d_asset_size": "Keep the morph geometry and any HDRI environment map lightweight — this is a hero, it must load fast on first visit, not just look good once loaded."
  },

  "qa_checklist": [
    "Does the hero show something (loading Lottie) within the first 800ms rather than a blank flash?",
    "Does only one element begin its entrance animation at a time, per the staggered timeline?",
    "Is the 3D scene paused/de-rendered when scrolled out of view?",
    "Do the orbiting rings still work (collapsed to one ring) on mobile?",
    "Does reduced-motion mode skip the Lottie loader/scroll-cue and show a fully static, complete hero immediately?",
    "Is real, accessible DOM text used for the name/headline/rings — nothing critical rendered only inside the 3D canvas or baked into a Lottie/video asset?",
    "Do all three Lottie files stay under ~15KB and use only the established white/glass/copper palette?"
  ]
}

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b2e064ad-5a6f-4636-8b40-9683da364a68).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
