"""
Static content for the Frozen 1000 landing page.

Ported verbatim from the original app.jsx so the page renders the same content
without any client-side React. Each `Slot` is a placeholder card with a theme,
glyph and AI image-generation prompt.
"""

# ---------------------------------------------------------------------------
# Glyph SVG inner markup (paths/circles only — outer <svg> is in the template)
# ---------------------------------------------------------------------------
GLYPHS = {
    "frozen": (
        '<path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M7 12l5-3 5 3M7 12l5 3 5-3"/>'
    ),
    "cup": (
        '<path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z"/>'
        '<path d="M5 8h14"/>'
        '<path d="M9 4c0 2 1 3 3 3s3-1 3-3"/>'
    ),
    "cone": (
        '<path d="M5 9c2-3 5-5 7-5s5 2 7 5"/>'
        '<path d="M5 9l7 13L19 9"/>'
        '<path d="M8 9c1-1 2.5-2 4-2s3 1 4 2"/>'
    ),
    "coffee": (
        '<path d="M4 8h13a4 4 0 0 1 0 8h-1"/>'
        '<path d="M4 8v8a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4V8H4z"/>'
        '<path d="M8 3c0 1-1 1-1 2s1 1 1 2"/>'
        '<path d="M12 3c0 1-1 1-1 2s1 1 1 2"/>'
    ),
    "acai": (
        '<circle cx="12" cy="13" r="7"/>'
        '<circle cx="9" cy="11" r="1.5" fill="currentColor"/>'
        '<circle cx="14" cy="10" r="1.5" fill="currentColor"/>'
        '<circle cx="13" cy="15" r="1.5" fill="currentColor"/>'
        '<path d="M12 6c0-2-1-3 0-4"/>'
    ),
    "water": (
        '<path d="M12 3c4 5 6 9 6 12a6 6 0 0 1-12 0c0-3 2-7 6-12z"/>'
        '<path d="M9 14a3 3 0 0 0 3 3"/>'
    ),
    "sundae": (
        '<path d="M7 10h10l-1 10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 10z"/>'
        '<path d="M6 10h12"/>'
        '<path d="M9 6c0-1 1-2 3-2s3 1 3 2"/>'
        '<circle cx="12" cy="6" r="1.5"/>'
    ),
    "splash": (
        '<path d="M12 2v6M5 5l4 4M19 5l-4 4M2 12h6M22 12h-6M5 19l4-4M19 19l-4-4M12 22v-6"/>'
    ),
}


# ---------------------------------------------------------------------------
# SLOTS — every placeholder card on the page, keyed by id.
# A slot carries the AI prompt the modal copies to the clipboard.
# ---------------------------------------------------------------------------
SLOTS = {
    # ---------- Hero ----------
    "hero": {
        "label": "Frozen Cream de Morango",
        "theme": "ice",
        "glyph": "frozen",
        "image": "images/hero-1.png",  # foto real — substitui o placeholder
        "prompt": (
            "Hyperrealistic product photography of two clear plastic dome-lid cups "
            "filled with vibrant pink-red strawberry frozen slushie. The cups have "
            "visible chunks of fresh strawberries on top, the slushie spilling out "
            "in a dramatic frozen splash with droplets and motion-frozen liquid waves "
            "around them. Studio lighting with cool LED rim-light in cyan (#3CAAC9) "
            "on the right edge and magenta (#C90288) on the left edge. Background: "
            "clean off-white #F1EDE6 with a soft radial cyan glow behind the product. "
            "High-key, condensation visible on plastic, no warm tones, no people, "
            "no logos. Square crop, product centered, transparent shadow underneath. "
            "4K, commercial freezer-style shot."
        ),
    },
    # ---------- Launch ----------
    "launch": {
        "label": "Frozen Cream Maçã Verde",
        "theme": "mag",
        "glyph": "cup",
        "image": "images/launch-1.png",
        "prompt": (
            "Hyperrealistic product photography of a single tall clear plastic cup "
            "with a dome lid, filled with a creamy frozen green apple slushie — "
            "bright lime-green with marbled white cream swirls, fresh green apple "
            "slices visible at the top. Dramatic splash of green liquid frozen "
            "mid-air around the cup. Studio LED lighting: cyan #6AC6DF rim on the "
            "left, deep magenta #C90288 glow on the right, deep navy #103C5C "
            "background with soft radial spotlight. Crystalline condensation droplets "
            "on the cup. No people, no logos, no warm tones. Clean commercial "
            "composition, product centered, slight low-angle for hero impact. "
            "4K cinematic."
        ),
    },
    # ---------- Cardápio category cards ----------
    "m_frozen": {
        "label": "Frozen Melancia",
        "theme": "mag",
        "glyph": "frozen",
        "prompt": (
            "Hyperrealistic vertical product shot of one clear plastic cup with a "
            "dome lid filled with frozen watermelon slushie — vibrant coral-pink "
            "with small visible watermelon chunks and a few black seeds. Plastic "
            "straw, condensation, frozen mid-splash liquid drops around the base. "
            "Background: radial gradient from #E22A9F at top to #5A0F47 at bottom "
            "with a subtle scanline LED grid overlay. Cool LED rim-lighting. No "
            "warm tones, no people, no logos. Square crop, product centered, drop "
            "shadow beneath. Commercial freezer style, 4K."
        ),
    },
    "m_zero": {
        "label": "Frozen Zero Limão",
        "theme": "ice",
        "glyph": "cup",
        "prompt": (
            "Hyperrealistic product photo of one tall clear plastic cup with dome "
            "lid, filled with a pale yellow-green frozen Sicilian lemon slushie, "
            "transparent and icy with visible shaved-ice crystals and one lemon-zest "
            "curl on top. Mid-splash droplets of clear liquid arcing around the cup. "
            "Background: bright ice-cyan radial glow from #6AC6DF to #3CAAC9 to "
            "#103C5C. Lots of condensation. No people, no logos, no warm tones. "
            "Square crop, product centered, soft drop shadow. 4K commercial."
        ),
    },
    "m_cream": {
        "label": "Frozen Cream Caramelo",
        "theme": "mix",
        "glyph": "cup",
        "prompt": (
            "Hyperrealistic product photo of a clear plastic cup with dome lid, "
            "filled with a layered cream-toned frozen drink — pale beige cream on "
            "top, ribbons of glossy amber salted-caramel sauce dripping down the "
            "inside walls of the cup, frozen ice base. A drizzle of caramel mid-air "
            "around the rim. Background: gradient #6AC6DF → #A23486 with subtle LED "
            "scanlines. Cool rim light, no warm ambient. No people, no logos. "
            "Square crop, product centered. 4K commercial."
        ),
    },
    "m_acai": {
        "label": "Açaí Cream",
        "theme": "deep",
        "glyph": "acai",
        "prompt": (
            "Hyperrealistic product photo of a clear plastic cup filled with deep "
            "purple açaí cream, smooth glossy surface topped with a curl of granola, "
            "a few fresh blueberries and banana slices. Tiny purple drops mid-splash "
            "around the cup. Background: navy gradient #103C5C → #0A2438 with soft "
            "cyan radial glow #3CAAC9. Cool LED rim lighting in magenta on one edge, "
            "cyan on the other. No people, no logos, no warm tones. Square crop, "
            "product centered. 4K commercial."
        ),
    },
    "m_cafe": {
        "label": "Chococream",
        "theme": "deep",
        "glyph": "coffee",
        "prompt": (
            "Hyperrealistic product photo of a transparent plastic cup filled with "
            "a layered iced chocolate-cream coffee — dark espresso at the bottom, "
            "swirled cream on top, glossy chocolate sauce drizzled, a few ice cubes "
            "visible. Splash of chocolate mid-air around the cup. Background: deep "
            "navy #103C5C with cool cyan glow. LED rim lighting cyan and magenta. "
            "No people, no logos, no warm tones. Square crop, product centered. "
            "4K commercial."
        ),
    },
    "m_sundae": {
        "label": "Sundae de Chocolate",
        "theme": "mag",
        "glyph": "sundae",
        "prompt": (
            "Hyperrealistic product photo of a tulip-shaped clear plastic sundae "
            "cup filled with white soft-serve ice cream topped with a glossy "
            "chocolate sauce cascade, a few crushed cookie pieces, and a single "
            "chocolate wafer stick. Background: gradient #C90288 → #5A0F47, cool "
            "LED rim lighting, scanline overlay. No warm tones, no people, no logos. "
            "Square crop, product centered. 4K commercial."
        ),
    },
    "m_casquinha": {
        "label": "Casquinha Mista",
        "theme": "paper",
        "glyph": "cone",
        "prompt": (
            "Hyperrealistic product photo of an ice cream cone — a waffle cone "
            "holding a tall swirl of half-chocolate, half-vanilla soft-serve ice "
            "cream. Slight droplet running down the cone. Background: clean off-white "
            "#F1EDE6 to soft beige #DCD5C8 with a subtle radial cyan glow. Cool LED "
            "rim lighting cyan and magenta on the edges of the cone. No people, "
            "no logos, no warm tones. Square crop, cone centered. 4K commercial."
        ),
    },
    "m_agua": {
        "label": "Água Saborizada",
        "theme": "ice",
        "glyph": "water",
        "prompt": (
            "Hyperrealistic product photo of a slim transparent water bottle with a "
            "minimal label, filled with crystal-clear water and one fresh sprig of "
            "mint visible inside. Light condensation droplets on the surface. "
            "Background: bright cyan radial gradient from #6AC6DF to #3CAAC9 to "
            "#103C5C with subtle vertical LED scanlines. Cool magenta rim light on "
            "one side. No people, no logos visible, no warm tones. Square crop, "
            "bottle centered. 4K commercial."
        ),
    },
    # ---------- Lifestyle / Frizz-verse ----------
    "life_store_neon": {
        "label": "Loja-nave fachada",
        "theme": "deep",
        "glyph": "splash",
        "prompt": (
            "Architectural shot at night of a futuristic quick-service ice cream "
            "store called FROZEN 1000. Glossy white facade with vivid cyan #3CAAC9 "
            "LED strips outlining the rooflines, a large rounded archway entrance "
            "backlit with magenta #C90288 neon, geometric paneling. The illuminated "
            "FROZEN 1000 logotype glows above the door. A few customers in "
            "silhouette outside. Photorealistic, cinematic, wet street reflection, "
            "no warm lights, only cool LED. 16:9 wide."
        ),
    },
    "life_kiosk": {
        "label": "Kiosk de auto-atendimento",
        "theme": "mag",
        "glyph": "splash",
        "prompt": (
            "Photo of a sleek vertical self-service ordering kiosk inside a "
            "futuristic ice cream store. The kiosk has a tall touchscreen showing "
            "a colorful product menu, cyan and magenta LED accent strips along its "
            "sides, glossy white body. Soft cyan glow on the floor beneath. A "
            "person's hand is reaching to tap the screen, no faces visible. "
            "Background blurred futuristic interior. Cool LED lighting only. "
            "Vertical 4:5 crop, cinematic, 4K."
        ),
    },
    "life_couple": {
        "label": "Casal com Frozen",
        "theme": "ice",
        "glyph": "splash",
        "prompt": (
            "Editorial lifestyle photo of two young friends laughing in a "
            "futuristic ice cream shop, each holding a clear domed-lid frozen drink "
            "(one pink-strawberry, one cyan-blue), bright cyan LED neon strips "
            "behind them out of focus. Cool color grading, no warm tones, modern "
            "streetwear, candid feel, shallow depth of field. Square crop. 4K, "
            "fashion-editorial style."
        ),
    },
    "life_hand": {
        "label": "Frozen na mão",
        "theme": "mix",
        "glyph": "splash",
        "prompt": (
            "Close-up product-in-hand photo: a person's hand (no face) holding a "
            "frozen drink cup with a dome lid filled with magenta watermelon slushie, "
            "against a blurred backdrop of cyan LED light strips. Cool LED rim "
            "lighting, dramatic side-lit. No warm tones. Square crop, shallow DOF. "
            "4K editorial."
        ),
    },
    "life_logo_panel": {
        "label": "Painel LED",
        "theme": "deep",
        "glyph": "splash",
        "prompt": (
            "Photo of a large indoor LED video wall displaying the FROZEN 1000 "
            "logotype in glowing cyan and magenta, with subtle animated scanlines "
            "visible. The panel is mounted in a futuristic store interior, a few "
            "blurred shoppers in the foreground. Photorealistic, cinematic, no warm "
            "lighting. 16:9 wide."
        ),
    },
    "life_splash": {
        "label": "Splash macro",
        "theme": "mag",
        "glyph": "splash",
        "prompt": (
            "Macro photo of a frozen strawberry drink mid-pour, dramatic frozen-in-"
            "time splash of bright pink slushie with droplets and chunks of "
            "strawberry suspended in the air. Pure clean magenta-to-navy gradient "
            "background with subtle cyan rim light. Hyperreal, no warm tones, no "
            "people, no logos. Square crop. 4K commercial."
        ),
    },
    # ---------- Franquia ----------
    "franq": {
        "label": "Loja-nave aberta",
        "theme": "deep",
        "glyph": "splash",
        "prompt": (
            "Wide-angle interior photo of a futuristic 24m² ice cream shop. Glossy "
            "white floors and walls, cyan and magenta LED strips along the ceiling "
            "edges, a row of two tall self-service kiosks on the right, a digital "
            "menu LED panel on the back wall showing colorful products, and a "
            "serving counter on the left where a robotic-looking dispenser stands. "
            "Cool LED-only lighting, no warm tones. Cinematic, 16:9 wide, "
            "photorealistic, 4K."
        ),
    },
    # ---------- Instagram ----------
    "ig_1": {
        "label": "Post · Novo sabor",
        "theme": "mag",
        "glyph": "frozen",
        "pin": "Novo",
        "prompt": (
            "Square instagram post: hero shot of a frozen watermelon slushie cup "
            "with dome lid, pink-coral, splash effects, deep magenta background "
            "with cyan LED edge glow. Cool LED only, no warm tones, no logos. "
            "4K product commercial."
        ),
    },
    "ig_2": {
        "label": "Reel · 90 segundos",
        "theme": "deep",
        "glyph": "splash",
        "pin": "Reel",
        "prompt": (
            "Square instagram thumbnail: dynamic close-up of a self-service kiosk "
            "screen mid-order in a futuristic Frozen 1000 store, cyan glow, motion "
            "blur, scanlines, magenta accent. No people's faces. Cool palette. "
            "4K cinematic."
        ),
    },
    "ig_3": {
        "label": "Post · Açaí",
        "theme": "mix",
        "glyph": "acai",
        "prompt": (
            "Square instagram product post: tall clear cup of dark purple açaí "
            "topped with granola and banana slices, deep cyan-to-magenta gradient "
            "background, cool LED rim lighting, no warm tones. 4K commercial."
        ),
    },
    "ig_4": {
        "label": "Post · Promo",
        "theme": "ice",
        "glyph": "cup",
        "pin": "Promo",
        "prompt": (
            "Square instagram post: two yellow lemon-frozen cups side by side, "
            "ice-cyan radial background, condensation, mint sprig garnish, splash "
            "droplets. Cool LED only, no warm tones. 4K commercial."
        ),
    },
    "ig_5": {
        "label": "Post · Frizz",
        "theme": "mag",
        "glyph": "splash",
        "prompt": (
            "Square instagram post: a friendly mascot-style astronaut robot "
            "character with a frozen-yogurt swirl on top of its helmet (Frizz "
            "mascot) holding a small ice cream cone, photo-real 3D render style, "
            "cyan-to-magenta studio backdrop, cool LED lighting, no warm tones. "
            "4K render."
        ),
    },
    "ig_6": {
        "label": "Post · Casquinha",
        "theme": "paper",
        "glyph": "cone",
        "prompt": (
            "Square instagram post: a hand holding a soft-serve waffle cone "
            "(half chocolate, half vanilla swirl) against an off-white #F1EDE6 "
            "backdrop with subtle cyan glow. Cool studio lighting, no warm tones. "
            "4K commercial."
        ),
    },
}


# ---------------------------------------------------------------------------
# Cardápio
# ---------------------------------------------------------------------------
CATS = [
    {"id": "todos",     "nm": "Todos",       "cnt": 8},
    {"id": "frozen",    "nm": "Frozen",      "cnt": 3},
    {"id": "acai",      "nm": "Açaí",        "cnt": 1},
    {"id": "cafe",      "nm": "Cafés",       "cnt": 1},
    {"id": "sundae",    "nm": "Sundae",      "cnt": 1},
    {"id": "casquinha", "nm": "Casquinha",   "cnt": 1},
    {"id": "agua",      "nm": "Água & Mate", "cnt": 1},
]

PRODUCTS = [
    {"slot": "m_frozen",    "nm": "Frozen Melancia",         "desc": "Frutado, cítrico e gelado. Splash de coral.",  "pr": "R$ 12,90", "cat": "frozen",    "tag": "POP"},
    {"slot": "m_zero",      "nm": "Frozen Zero Limão",       "desc": "Limão siciliano sem açúcar adicionado.",       "pr": "R$ 13,90", "cat": "frozen",    "tag": "ZERO"},
    {"slot": "m_cream",     "nm": "Frozen Cream Caramelo",   "desc": "Cremoso com calda de caramelo salgado.",       "pr": "R$ 14,90", "cat": "frozen"},
    {"slot": "m_acai",      "nm": "Açaí Cream",              "desc": "Açaí cremoso com granola e frutas frescas.",   "pr": "R$ 16,90", "cat": "acai"},
    {"slot": "m_cafe",      "nm": "Chococream",              "desc": "Café gelado, calda de chocolate e creme.",     "pr": "R$ 9,90",  "cat": "cafe"},
    {"slot": "m_sundae",    "nm": "Sundae Chocolate",        "desc": "Soft-serve com calda quente e cobertura.",     "pr": "R$ 17,90", "cat": "sundae"},
    {"slot": "m_casquinha", "nm": "Casquinha Mista",         "desc": "Baunilha + chocolate em casquinha crocante.",  "pr": "R$ 9,90",  "cat": "casquinha"},
    {"slot": "m_agua",      "nm": "Água com Hortelã",        "desc": "Água saborizada gelada, hortelã fresca.",      "pr": "R$ 5,00",  "cat": "agua",      "tag": "NEW"},
]


# ---------------------------------------------------------------------------
# Marquee
# ---------------------------------------------------------------------------
TICKER = [
    "Frozen Cream Morango", "Frozen Maçã Verde", "Sorvete Casquinha",
    "Frozen Morango", "Clube Frizz", "Pronto em 90s", "Açaí Cream",
    "Sundae Chocolate", "Mate Gelado",
]


# ---------------------------------------------------------------------------
# Como funciona — 4 steps
# ---------------------------------------------------------------------------
STEPS = [
    {"ic": "hand-metal",     "nm": "01 · Toque",       "desc": "Aproxime-se do kiosk LED. Selecione categoria, sabor e tamanho.", "t": "00:00 – 00:25"},
    {"ic": "sparkles",       "nm": "02 · Personaliza", "desc": "Adicione cobertura, frutas e topping. O painel calcula tudo.",    "t": "00:25 – 00:40"},
    {"ic": "cpu",            "nm": "03 · Prepara",     "desc": "A máquina central dispensa, mistura e finaliza em sincronia.",    "t": "00:40 – 01:20"},
    {"ic": "package-check",  "nm": "04 · Retira",      "desc": "Frizz anuncia. Você retira o copo pronto na bandeja-portal.",     "t": "01:20 – 01:30"},
]


# ---------------------------------------------------------------------------
# Lojas
# ---------------------------------------------------------------------------
STORES = [
    {"nm": "Centro · Rio de Janeiro",   "ad": "Av. Rio Branco, 1000",  "open": True,  "cx": 235, "cy": 215},
    {"nm": "Vila Madalena · São Paulo", "ad": "Rua Aspicuelta, 442",   "open": True,  "cx": 195, "cy": 240},
    {"nm": "Pinheiros · São Paulo",     "ad": "Av. Faria Lima, 2400",  "open": False, "cx": 192, "cy": 245},
    {"nm": "Savassi · Belo Horizonte",  "ad": "Av. do Contorno, 6200", "open": True,  "cx": 215, "cy": 195},
    {"nm": "Brasília · Asa Sul",        "ad": "SCS Quadra 02",         "open": False, "cx": 180, "cy": 170},
]


# ---------------------------------------------------------------------------
# Instagram grid order
# ---------------------------------------------------------------------------
IG_LIST = ["ig_1", "ig_2", "ig_3", "ig_4", "ig_5", "ig_6"]


# ---------------------------------------------------------------------------
# Top nav links
# ---------------------------------------------------------------------------
NAV_LINKS = [
    {"href": "#cardapio",   "label": "Cardápio"},
    {"href": "#experiencia","label": "Experiência"},
    {"href": "#como",       "label": "Como funciona"},
    {"href": "#instagram",  "label": "Instagram"},
    {"href": "#lojas",      "label": "Lojas"},
    {"href": "#franquia",   "label": "Franquias"},
]


def get_slot(slot_id):
    """Return a slot dict augmented with its id and glyph SVG markup."""
    raw = SLOTS[slot_id]
    return {
        "id": slot_id,
        "label": raw["label"],
        "theme": raw.get("theme", ""),
        "glyph": raw["glyph"],
        "glyph_svg": GLYPHS.get(raw["glyph"], GLYPHS["splash"]),
        "prompt": raw["prompt"],
        "pin": raw.get("pin"),
        "image": raw.get("image"),
    }


def slots_for_template():
    """Return all slots resolved (with glyph SVG) and a JSON-serialisable map for JS."""
    resolved = {sid: get_slot(sid) for sid in SLOTS}
    json_safe = {
        sid: {"label": s["label"], "prompt": s["prompt"]}
        for sid, s in resolved.items()
    }
    return resolved, json_safe
