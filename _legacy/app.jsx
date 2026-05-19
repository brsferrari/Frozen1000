/* ============================================================
   Frozen 1000 · Landing — App (React/Babel)
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Icon helper (lucide) ---------- */
function Icon({ name, size = 22, color, stroke = 1.75, style }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  return <i data-lucide={name} style={{ width: size, height: size, color, strokeWidth: stroke, display: 'inline-flex', ...style }}></i>;
}

const IGGlyph = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5"></rect>
    <circle cx="12" cy="12" r="4"></circle>
    <circle cx="17.5" cy="6.5" r="1" fill={color}></circle>
  </svg>
);

/* ---------- Ripple-effect button ---------- */
function FXButton({ as = 'a', className = '', children, ...props }) {
  const Tag = as;
  const handle = (e) => {
    const btn = e.currentTarget;
    const r = document.createElement('span');
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    r.style.width = r.style.height = d + 'px';
    r.style.left = (e.clientX - btn.getBoundingClientRect().left - d / 2) + 'px';
    r.style.top  = (e.clientY - btn.getBoundingClientRect().top  - d / 2) + 'px';
    r.className = 'ripple';
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
    if (props.onClick) props.onClick(e);
  };
  return <Tag {...props} className={"btn " + className} onClick={handle}>{children}</Tag>;
}

/* ============================================================
   PRODUCT SLOTS — placeholder cards with AI prompts
   Each slot has: id, label, theme, glyph, prompt
   ============================================================ */
const GLYPHS = {
  frozen: <svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19M7 12l5-3 5 3M7 12l5 3 5-3"/></svg>,
  cup:    <svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8z"/><path d="M5 8h14"/><path d="M9 4c0 2 1 3 3 3s3-1 3-3"/></svg>,
  cone:   <svg viewBox="0 0 24 24"><path d="M5 9c2-3 5-5 7-5s5 2 7 5"/><path d="M5 9l7 13L19 9"/><path d="M8 9c1-1 2.5-2 4-2s3 1 4 2"/></svg>,
  coffee: <svg viewBox="0 0 24 24"><path d="M4 8h13a4 4 0 0 1 0 8h-1"/><path d="M4 8v8a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4V8H4z"/><path d="M8 3c0 1-1 1-1 2s1 1 1 2"/><path d="M12 3c0 1-1 1-1 2s1 1 1 2"/></svg>,
  acai:   <svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="7"/><circle cx="9" cy="11" r="1.5" fill="currentColor"/><circle cx="14" cy="10" r="1.5" fill="currentColor"/><circle cx="13" cy="15" r="1.5" fill="currentColor"/><path d="M12 6c0-2-1-3 0-4"/></svg>,
  water:  <svg viewBox="0 0 24 24"><path d="M12 3c4 5 6 9 6 12a6 6 0 0 1-12 0c0-3 2-7 6-12z"/><path d="M9 14a3 3 0 0 0 3 3"/></svg>,
  sundae: <svg viewBox="0 0 24 24"><path d="M7 10h10l-1 10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 10z"/><path d="M6 10h12"/><path d="M9 6c0-1 1-2 3-2s3 1 3 2"/><circle cx="12" cy="6" r="1.5"/></svg>,
  splash: <svg viewBox="0 0 24 24"><path d="M12 2v6M5 5l4 4M19 5l-4 4M2 12h6M22 12h-6M5 19l4-4M19 19l-4-4M12 22v-6"/></svg>,
};

const SLOTS = {
  /* Hero */
  hero: {
    label: 'Frozen Cream de Morango',
    theme: 'ice', glyph: 'frozen',
    prompt: `Hyperrealistic product photography of two clear plastic dome-lid cups filled with vibrant pink-red strawberry frozen slushie. The cups have visible chunks of fresh strawberries on top, the slushie spilling out in a dramatic frozen splash with droplets and motion-frozen liquid waves around them. Studio lighting with cool LED rim-light in cyan (#3CAAC9) on the right edge and magenta (#C90288) on the left edge. Background: clean off-white #F1EDE6 with a soft radial cyan glow behind the product. High-key, condensation visible on plastic, no warm tones, no people, no logos. Square crop, product centered, transparent shadow underneath. 4K, commercial freezer-style shot.`
  },

  /* Launch */
  launch: {
    label: 'Frozen Cream Maçã Verde',
    theme: 'mag', glyph: 'cup',
    prompt: `Hyperrealistic product photography of a single tall clear plastic cup with a dome lid, filled with a creamy frozen green apple slushie — bright lime-green with marbled white cream swirls, fresh green apple slices visible at the top. Dramatic splash of green liquid frozen mid-air around the cup. Studio LED lighting: cyan #6AC6DF rim on the left, deep magenta #C90288 glow on the right, deep navy #103C5C background with soft radial spotlight. Crystalline condensation droplets on the cup. No people, no logos, no warm tones. Clean commercial composition, product centered, slight low-angle for hero impact. 4K cinematic.`
  },

  /* Cardápio category cards */
  m_frozen:       { label: 'Frozen Melancia',          theme: 'mag',   glyph: 'frozen',
    prompt: `Hyperrealistic vertical product shot of one clear plastic cup with a dome lid filled with frozen watermelon slushie — vibrant coral-pink with small visible watermelon chunks and a few black seeds. Plastic straw, condensation, frozen mid-splash liquid drops around the base. Background: radial gradient from #E22A9F at top to #5A0F47 at bottom with a subtle scanline LED grid overlay. Cool LED rim-lighting. No warm tones, no people, no logos. Square crop, product centered, drop shadow beneath. Commercial freezer style, 4K.` },
  m_zero:         { label: 'Frozen Zero Limão',        theme: 'ice',   glyph: 'cup',
    prompt: `Hyperrealistic product photo of one tall clear plastic cup with dome lid, filled with a pale yellow-green frozen Sicilian lemon slushie, transparent and icy with visible shaved-ice crystals and one lemon-zest curl on top. Mid-splash droplets of clear liquid arcing around the cup. Background: bright ice-cyan radial glow from #6AC6DF to #3CAAC9 to #103C5C. Lots of condensation. No people, no logos, no warm tones. Square crop, product centered, soft drop shadow. 4K commercial.` },
  m_cream:        { label: 'Frozen Cream Caramelo',    theme: 'mix',   glyph: 'cup',
    prompt: `Hyperrealistic product photo of a clear plastic cup with dome lid, filled with a layered cream-toned frozen drink — pale beige cream on top, ribbons of glossy amber salted-caramel sauce dripping down the inside walls of the cup, frozen ice base. A drizzle of caramel mid-air around the rim. Background: gradient #6AC6DF → #A23486 with subtle LED scanlines. Cool rim light, no warm ambient. No people, no logos. Square crop, product centered. 4K commercial.` },
  m_acai:         { label: 'Açaí Cream',               theme: 'deep',  glyph: 'acai',
    prompt: `Hyperrealistic product photo of a clear plastic cup filled with deep purple açaí cream, smooth glossy surface topped with a curl of granola, a few fresh blueberries and banana slices. Tiny purple drops mid-splash around the cup. Background: navy gradient #103C5C → #0A2438 with soft cyan radial glow #3CAAC9. Cool LED rim lighting in magenta on one edge, cyan on the other. No people, no logos, no warm tones. Square crop, product centered. 4K commercial.` },
  m_cafe:         { label: 'Chococream',               theme: 'deep',  glyph: 'coffee',
    prompt: `Hyperrealistic product photo of a transparent plastic cup filled with a layered iced chocolate-cream coffee — dark espresso at the bottom, swirled cream on top, glossy chocolate sauce drizzled, a few ice cubes visible. Splash of chocolate mid-air around the cup. Background: deep navy #103C5C with cool cyan glow. LED rim lighting cyan and magenta. No people, no logos, no warm tones. Square crop, product centered. 4K commercial.` },
  m_sundae:       { label: 'Sundae de Chocolate',      theme: 'mag',   glyph: 'sundae',
    prompt: `Hyperrealistic product photo of a tulip-shaped clear plastic sundae cup filled with white soft-serve ice cream topped with a glossy chocolate sauce cascade, a few crushed cookie pieces, and a single chocolate wafer stick. Background: gradient #C90288 → #5A0F47, cool LED rim lighting, scanline overlay. No warm tones, no people, no logos. Square crop, product centered. 4K commercial.` },
  m_casquinha:    { label: 'Casquinha Mista',          theme: 'paper', glyph: 'cone',
    prompt: `Hyperrealistic product photo of an ice cream cone — a waffle cone holding a tall swirl of half-chocolate, half-vanilla soft-serve ice cream. Slight droplet running down the cone. Background: clean off-white #F1EDE6 to soft beige #DCD5C8 with a subtle radial cyan glow. Cool LED rim lighting cyan and magenta on the edges of the cone. No people, no logos, no warm tones. Square crop, cone centered. 4K commercial.` },
  m_agua:         { label: 'Água Saborizada',          theme: 'ice',   glyph: 'water',
    prompt: `Hyperrealistic product photo of a slim transparent water bottle with a minimal label, filled with crystal-clear water and one fresh sprig of mint visible inside. Light condensation droplets on the surface. Background: bright cyan radial gradient from #6AC6DF to #3CAAC9 to #103C5C with subtle vertical LED scanlines. Cool magenta rim light on one side. No people, no logos visible, no warm tones. Square crop, bottle centered. 4K commercial.` },

  /* Lifestyle / Frizz-verse */
  life_store_neon:   { label: 'Loja-nave fachada',     theme: 'deep',  glyph: 'splash',
    prompt: `Architectural shot at night of a futuristic quick-service ice cream store called FROZEN 1000. Glossy white facade with vivid cyan #3CAAC9 LED strips outlining the rooflines, a large rounded archway entrance backlit with magenta #C90288 neon, geometric paneling. The illuminated FROZEN 1000 logotype glows above the door. A few customers in silhouette outside. Photorealistic, cinematic, wet street reflection, no warm lights, only cool LED. 16:9 wide.` },
  life_kiosk:        { label: 'Kiosk de auto-atendimento', theme: 'mag', glyph: 'splash',
    prompt: `Photo of a sleek vertical self-service ordering kiosk inside a futuristic ice cream store. The kiosk has a tall touchscreen showing a colorful product menu, cyan and magenta LED accent strips along its sides, glossy white body. Soft cyan glow on the floor beneath. A person's hand is reaching to tap the screen, no faces visible. Background blurred futuristic interior. Cool LED lighting only. Vertical 4:5 crop, cinematic, 4K.` },
  life_couple:       { label: 'Casal com Frozen',     theme: 'ice',    glyph: 'splash',
    prompt: `Editorial lifestyle photo of two young friends laughing in a futuristic ice cream shop, each holding a clear domed-lid frozen drink (one pink-strawberry, one cyan-blue), bright cyan LED neon strips behind them out of focus. Cool color grading, no warm tones, modern streetwear, candid feel, shallow depth of field. Square crop. 4K, fashion-editorial style.` },
  life_hand:         { label: 'Frozen na mão',         theme: 'mix',   glyph: 'splash',
    prompt: `Close-up product-in-hand photo: a person's hand (no face) holding a frozen drink cup with a dome lid filled with magenta watermelon slushie, against a blurred backdrop of cyan LED light strips. Cool LED rim lighting, dramatic side-lit. No warm tones. Square crop, shallow DOF. 4K editorial.` },
  life_logo_panel:   { label: 'Painel LED',            theme: 'deep',  glyph: 'splash',
    prompt: `Photo of a large indoor LED video wall displaying the FROZEN 1000 logotype in glowing cyan and magenta, with subtle animated scanlines visible. The panel is mounted in a futuristic store interior, a few blurred shoppers in the foreground. Photorealistic, cinematic, no warm lighting. 16:9 wide.` },
  life_splash:       { label: 'Splash macro',          theme: 'mag',   glyph: 'splash',
    prompt: `Macro photo of a frozen strawberry drink mid-pour, dramatic frozen-in-time splash of bright pink slushie with droplets and chunks of strawberry suspended in the air. Pure clean magenta-to-navy gradient background with subtle cyan rim light. Hyperreal, no warm tones, no people, no logos. Square crop. 4K commercial.` },

  /* Franquia */
  franq: { label: 'Loja-nave aberta', theme: 'deep', glyph: 'splash',
    prompt: `Wide-angle interior photo of a futuristic 24m² ice cream shop. Glossy white floors and walls, cyan and magenta LED strips along the ceiling edges, a row of two tall self-service kiosks on the right, a digital menu LED panel on the back wall showing colorful products, and a serving counter on the left where a robotic-looking dispenser stands. Cool LED-only lighting, no warm tones. Cinematic, 16:9 wide, photorealistic, 4K.` },

  /* Instagram */
  ig_1: { label: 'Post · Novo sabor',  theme: 'mag', glyph: 'frozen', pin: 'Novo',
    prompt: `Square instagram post: hero shot of a frozen watermelon slushie cup with dome lid, pink-coral, splash effects, deep magenta background with cyan LED edge glow. Cool LED only, no warm tones, no logos. 4K product commercial.` },
  ig_2: { label: 'Reel · 90 segundos', theme: 'deep', glyph: 'splash', pin: 'Reel',
    prompt: `Square instagram thumbnail: dynamic close-up of a self-service kiosk screen mid-order in a futuristic Frozen 1000 store, cyan glow, motion blur, scanlines, magenta accent. No people's faces. Cool palette. 4K cinematic.` },
  ig_3: { label: 'Post · Açaí',        theme: 'mix', glyph: 'acai',
    prompt: `Square instagram product post: tall clear cup of dark purple açaí topped with granola and banana slices, deep cyan-to-magenta gradient background, cool LED rim lighting, no warm tones. 4K commercial.` },
  ig_4: { label: 'Post · Promo',       theme: 'ice', glyph: 'cup', pin: 'Promo',
    prompt: `Square instagram post: two yellow lemon-frozen cups side by side, ice-cyan radial background, condensation, mint sprig garnish, splash droplets. Cool LED only, no warm tones. 4K commercial.` },
  ig_5: { label: 'Post · Frizz',       theme: 'mag', glyph: 'splash',
    prompt: `Square instagram post: a friendly mascot-style astronaut robot character with a frozen-yogurt swirl on top of its helmet (Frizz mascot) holding a small ice cream cone, photo-real 3D render style, cyan-to-magenta studio backdrop, cool LED lighting, no warm tones. 4K render.` },
  ig_6: { label: 'Post · Casquinha',   theme: 'paper', glyph: 'cone',
    prompt: `Square instagram post: a hand holding a soft-serve waffle cone (half chocolate, half vanilla swirl) against an off-white #F1EDE6 backdrop with subtle cyan glow. Cool studio lighting, no warm tones. 4K commercial.` },
};

function Slot({ id, mod = '', big = false, onClick }) {
  const s = SLOTS[id];
  if (!s) return null;
  const themeClass = (s.theme || '') + ' ' + mod;
  const cls = "slot " + themeClass + (big ? " slot-hero" : "");
  return (
    <div className={cls} onClick={() => onClick && onClick(id)}>
      <div className="led-corner"></div>
      {s.pin && <span className="pin">{s.pin}</span>}
      <div className="slot-inner">
        <div className="slot-glyph">{GLYPHS[s.glyph] || GLYPHS.splash}</div>
        <span className="slot-id">IMG · {String(id).toUpperCase()}</span>
        <div className="slot-label">{s.label}</div>
      </div>
      <span className="slot-hint">▢ Ver prompt IA</span>
    </div>
  );
}

/* ============================================================
   TOP NAV
   ============================================================ */
function TopNav() {
  return (
    <nav className="l-nav" data-screen-label="00 Nav">
      <div className="l-container row">
        <a className="logo" href="#"><img src="assets/logo-horizontal.png" alt="Frozen 1000" /></a>
        <ul>
          <li><a href="#cardapio">Cardápio</a></li>
          <li><a href="#experiencia">Experiência</a></li>
          <li><a href="#como">Como funciona</a></li>
          <li><a href="#instagram">Instagram</a></li>
          <li><a href="#lojas">Lojas</a></li>
          <li><a href="#franquia">Franquias</a></li>
        </ul>
        <div className="right">
          <span className="pulse"><span className="dot"></span>12 lojas · ao vivo</span>
          <FXButton as="a" href="#cardapio" className="btn-mag">Pedir agora <Icon name="arrow-right" size={14} /></FXButton>
          <button className="btn btn-icon burger" aria-label="menu"><Icon name="menu" size={20} /></button>
        </div>
      </div>
    </nav>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ openSlot }) {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="l-container">
        <div className="hero-inner">
          <div>
            <span className="locator"><span className="dot"></span>Centro, Rio de Janeiro · Av. Rio Branco</span>
            <h1>Gelados<br/><span className="alt">inteligentes<span className="dot-end">.</span></span></h1>
            <p className="lead">Sabor e <a className="link" href="#como">tecnologia</a> na medida certa. Frozen, açaí, café e sundae prontos em 90 segundos.</p>
            <div className="ctas">
              <FXButton href="#cardapio" className="btn-mag btn-xl">Pedir agora <Icon name="arrow-right" size={16} /></FXButton>
              <FXButton href="#como" className="btn-ghost btn-xl">Como funciona</FXButton>
            </div>
            <div className="hours">
              <div>
                <div className="val">Seg–Sex</div>
                <div className="lab">Dias abertos</div>
              </div>
              <div>
                <div className="val mag">8:30 – 19:30</div>
                <div className="lab">Horário de funcionamento</div>
              </div>
            </div>
          </div>
          <div className="hero-photo">
            <Slot id="hero" big onClick={openSlot} />
            <img className="frizz-bot" src="assets/frizz.png" alt="Frizz" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MARQUEE
   ============================================================ */
const TICKER = [
  "Frozen Cream Morango", "Frozen Maçã Verde", "Sorvete Casquinha", "Frozen Morango",
  "Clube Frizz", "Pronto em 90s", "Açaí Cream", "Sundae Chocolate", "Mate Gelado",
];
function Marquee() {
  const items = TICKER.concat(TICKER);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => (
          <span className="marquee-item" key={i}>
            <svg className="star" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 7h7l-6 4 2 7-7-4-7 4 2-7-6-4h7z"/></svg>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   LAUNCH / Featured
   ============================================================ */
function Launch({ openSlot }) {
  return (
    <section className="launch" data-screen-label="02 Launch">
      <div className="l-container">
        <div className="launch-card">
          <div className="text">
            <span className="ey">Lançamento da estação</span>
            <h2>Frozen Cream<br/><span className="alt">Maçã Verde.</span></h2>
            <p>Cítrico, refrescante, cremoso. O lançamento da estação que está pronto em 90 segundos — receita exclusiva da loja-nave.</p>
            <div className="ingredients">
              <span className="chip hot">Maçã verde fresca</span>
              <span className="chip">Cream</span>
              <span className="chip">Hortelã</span>
              <span className="chip">Zero açúcar add.</span>
            </div>
            <div style={{display:'flex', gap: 10, flexWrap: 'wrap'}}>
              <FXButton href="#cardapio" className="btn-mag btn-xl">Provar agora <Icon name="arrow-right" size={16} /></FXButton>
              <FXButton href="#cardapio" className="btn-light-ghost btn-xl">Ver cardápio</FXButton>
            </div>
          </div>
          <div className="launch-photo">
            <Slot id="launch" big onClick={openSlot} />
            <div className="launch-stamp">
              <span className="big">90s</span>
              <span className="sm">na medida certa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ABOUT / Numbers
   ============================================================ */
function About() {
  return (
    <section className="about" id="experiencia" data-screen-label="03 Experiência">
      <div className="l-container about-inner">
        <div>
          <span className="ey">A marca</span>
          <h2>O lado <span className="alt">tecnológico</span><br/>do gelado.</h2>
          <p>Frozen 1000 transforma o consumo rápido numa experiência tecnológica, sensorial e memorável. Loja-nave de luz, som e velocidade — o sabor que você escolhe na tela, pronto em 90 segundos.</p>
          <p>Cada unidade é um portal de LED, painel digital e produto fresco. Sem fila, sem pressa, sem mistério.</p>
          <div className="signature">// Sabor e tecnologia. Na medida certa.</div>
        </div>
        <div className="numbers">
          <div className="num"><div className="v">90s</div><div className="lbl">Tempo de preparo</div><div className="desc">Do toque na tela ao copo na mão.</div></div>
          <div className="num"><div className="v mag">12</div><div className="lbl">Lojas-nave</div><div className="desc">SP, RJ e MG — em expansão.</div></div>
          <div className="num"><div className="v">7</div><div className="lbl">Categorias</div><div className="desc">Frozen, açaí, café, sundae, casquinha, mate, água.</div></div>
          <div className="num"><div className="v mag">240/h</div><div className="lbl">Pedidos em pico</div><div className="desc">Capacidade automatizada por unidade.</div></div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CARDÁPIO (with tabs)
   ============================================================ */
const CATS = [
  { id: 'todos',      nm: 'Todos',       cnt: 8 },
  { id: 'frozen',     nm: 'Frozen',      cnt: 3 },
  { id: 'acai',       nm: 'Açaí',        cnt: 1 },
  { id: 'cafe',       nm: 'Cafés',       cnt: 1 },
  { id: 'sundae',     nm: 'Sundae',      cnt: 1 },
  { id: 'casquinha',  nm: 'Casquinha',   cnt: 1 },
  { id: 'agua',       nm: 'Água & Mate', cnt: 1 },
];
const PRODUCTS = [
  { slot: 'm_frozen',    nm: 'Frozen Melancia',         desc: 'Frutado, cítrico e gelado. Splash de coral.', pr: 'R$ 12,90', cat: 'frozen', tag: 'POP' },
  { slot: 'm_zero',      nm: 'Frozen Zero Limão',       desc: 'Limão siciliano sem açúcar adicionado.',      pr: 'R$ 13,90', cat: 'frozen', tag: 'ZERO' },
  { slot: 'm_cream',     nm: 'Frozen Cream Caramelo',   desc: 'Cremoso com calda de caramelo salgado.',      pr: 'R$ 14,90', cat: 'frozen' },
  { slot: 'm_acai',      nm: 'Açaí Cream',              desc: 'Açaí cremoso com granola e frutas frescas.',  pr: 'R$ 16,90', cat: 'acai' },
  { slot: 'm_cafe',      nm: 'Chococream',              desc: 'Café gelado, calda de chocolate e creme.',    pr: 'R$ 9,90',  cat: 'cafe' },
  { slot: 'm_sundae',    nm: 'Sundae Chocolate',        desc: 'Soft-serve com calda quente e cobertura.',    pr: 'R$ 17,90', cat: 'sundae' },
  { slot: 'm_casquinha', nm: 'Casquinha Mista',         desc: 'Baunilha + chocolate em casquinha crocante.', pr: 'R$ 9,90',  cat: 'casquinha' },
  { slot: 'm_agua',      nm: 'Água com Hortelã',        desc: 'Água saborizada gelada, hortelã fresca.',     pr: 'R$ 5,00',  cat: 'agua', tag: 'NEW' },
];
function Cardapio({ openSlot }) {
  const [cat, setCat] = useState('todos');
  const list = cat === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
  return (
    <section className="menu" id="cardapio" data-screen-label="04 Cardápio">
      <div className="l-container">
        <div className="menu-head">
          <div>
            <span className="ey">Cardápio · 24 sabores</span>
            <h2>Toque, escolha,<br/><span className="alt">gele o dia.</span></h2>
          </div>
          <p className="sub">Sete categorias de gelados inteligentes. Todos prontos em 90 segundos no painel da loja-nave.</p>
        </div>
        <div className="tabs">
          {CATS.map(c => (
            <button key={c.id} className={"tab" + (cat === c.id ? " active" : "")} onClick={() => setCat(c.id)}>
              {c.nm}<span className="cnt">{c.cnt}</span>
            </button>
          ))}
        </div>
        <div className="menu-grid">
          {list.map((p, i) => (
            <div className="menu-card" key={i} onClick={() => openSlot(p.slot)}>
              <Slot id={p.slot} onClick={openSlot} />
              <div className="meta">
                {p.tag && <div className="badge-line"><span className="new">● {p.tag}</span></div>}
                <div className="nm">{p.nm}</div>
                <div className="desc">{p.desc}</div>
                <div className="pr-row">
                  <span className="pr">{p.pr}</span>
                  <span className="add"><Icon name="plus" size={18} color="#fff" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   COMO FUNCIONA
   ============================================================ */
const STEPS = [
  { ic: 'hand-metal',  nm: '01 · Toque',     desc: 'Aproxime-se do kiosk LED. Selecione categoria, sabor e tamanho.',  t: '00:00 – 00:25' },
  { ic: 'sparkles',    nm: '02 · Personaliza', desc: 'Adicione cobertura, frutas e topping. O painel calcula tudo.',     t: '00:25 – 00:40' },
  { ic: 'cpu',         nm: '03 · Prepara',   desc: 'A máquina central dispensa, mistura e finaliza em sincronia.',       t: '00:40 – 01:20' },
  { ic: 'package-check', nm: '04 · Retira', desc: 'Frizz anuncia. Você retira o copo pronto na bandeja-portal.',         t: '01:20 – 01:30' },
];
function Como() {
  return (
    <section className="how" id="como" data-screen-label="05 Como funciona">
      <div className="l-container">
        <div className="how-head">
          <div>
            <span className="ey" style={{color: 'var(--f1k-magenta-vibrante)', fontFamily:'var(--font-display)', fontWeight:700, fontSize:12, letterSpacing:'.2em', textTransform:'uppercase'}}>Pronto em 90 segundos</span>
            <h2>Como funciona<br/><span className="alt">a loja-nave.</span></h2>
          </div>
          <div className="timer">
            <span className="t" id="liveTimer">00:00</span>
            <span className="l">Cronômetro do ciclo</span>
          </div>
        </div>
        <div className="steps">
          {STEPS.map((s, i) => (
            <div className="step" key={i}>
              <span className="num-tag">/{String(i+1).padStart(2,'0')}</span>
              <div className="ic"><Icon name={s.ic} size={22} color="#fff" /></div>
              <h4>{s.nm}</h4>
              <p>{s.desc}</p>
              <div className="timing">{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LIFESTYLE GRID (Frizz-verse) — like Oakberry #RespectTheOAK
   ============================================================ */
function Lifestyle({ openSlot }) {
  return (
    <section className="lifestyle" data-screen-label="06 Lifestyle">
      <div className="l-container">
        <div className="head">
          <span className="ey">No universo Frozen</span>
          <h2>#Geleo<span className="alt">Dia</span></h2>
          <div className="hash">@frozen1000 · marque no seu post</div>
        </div>
        <div className="life-grid">
          <div className="life-wide life-tall"><Slot id="life_store_neon" onClick={openSlot} /></div>
          <div><Slot id="life_couple" onClick={openSlot} /></div>
          <div><Slot id="life_hand" onClick={openSlot} /></div>
          <div><Slot id="life_kiosk" onClick={openSlot} /></div>
          <div className="life-wide"><Slot id="life_logo_panel" onClick={openSlot} /></div>
          <div><Slot id="life_splash" onClick={openSlot} /></div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CLUBE FRIZZ
   ============================================================ */
function Clube() {
  return (
    <section className="clube" data-screen-label="07 Clube Frizz">
      <div className="l-container">
        <div className="clube-card">
          <div className="text">
            <span className="ey">Frizz Fidelidade</span>
            <h2>Seu copo<br/>vira <span style={{color:'#FFE100'}}>Frizzbits.</span></h2>
            <p>Cada gelado acumula pontos no Clube Frizz. Resgate combos, lançamentos antecipados e missões para subir de nível na loja-nave.</p>
            <div className="benefits">
              <div className="benefit"><Icon name="check" size={18} stroke={2.4} /> 1 ponto por R$1</div>
              <div className="benefit"><Icon name="check" size={18} stroke={2.4} /> Combos exclusivos</div>
              <div className="benefit"><Icon name="check" size={18} stroke={2.4} /> Sabores antecipados</div>
              <div className="benefit"><Icon name="check" size={18} stroke={2.4} /> Missões mensais</div>
            </div>
            <div style={{display: 'flex', gap: 10, flexWrap:'wrap'}}>
              <FXButton href="#" className="btn-mag btn-xl" style={{background:'#0A2438', color:'#FFE100'}}>Ativar Frizz Fidelidade <Icon name="arrow-right" size={16} /></FXButton>
              <FXButton href="#" className="btn-light-ghost btn-xl">Ver benefícios</FXButton>
            </div>
          </div>
          <div className="member-card-wrap">
            <div className="member-card">
              <div className="top">
                <div className="chip-c"></div>
                <div className="brand-c">FROZEN · 1000</div>
              </div>
              <div className="no">4242 · 1000 · 0090 · 7777</div>
              <div className="nm-c">HUMANO/A · MISSÃO #03</div>
              <div className="pts">
                <div className="v">1.240</div>
                <div className="l">FRIZZBITS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LOJAS / Map
   ============================================================ */
const STORES = [
  { nm: 'Centro · Rio de Janeiro',   ad: 'Av. Rio Branco, 1000', open: true,  cx: 235, cy: 215 },
  { nm: 'Vila Madalena · São Paulo', ad: 'Rua Aspicuelta, 442',  open: true,  cx: 195, cy: 240 },
  { nm: 'Pinheiros · São Paulo',     ad: 'Av. Faria Lima, 2400', open: false, cx: 192, cy: 245 },
  { nm: 'Savassi · Belo Horizonte',  ad: 'Av. do Contorno, 6200', open: true, cx: 215, cy: 195 },
  { nm: 'Brasília · Asa Sul',        ad: 'SCS Quadra 02',         open: false, cx: 180, cy: 170 },
];
function Lojas() {
  return (
    <section className="lojas" id="lojas" data-screen-label="08 Lojas">
      <div className="l-container lojas-inner">
        <div>
          <span className="ey">Frozen 1000 pelo Brasil</span>
          <h2>Cada loja é<br/><span className="alt">portal de luz.</span></h2>
          <p>Hoje em SP, RJ e BH. Em expansão para Curitiba, Brasília e Porto Alegre nos próximos 18 meses. Clique no pin para ver a unidade.</p>
          <div className="store-list">
            {STORES.map((s, i) => (
              <div key={i} className={"store" + (s.open ? " open" : "")}>
                <div className="pinico"><Icon name="map-pin" size={16} color="#fff" /></div>
                <div>
                  <div className="nm">{s.nm}</div>
                  <div className="ad">{s.ad}</div>
                </div>
                <span className="stat">{s.open ? 'ABERTO' : 'EM BREVE'}</span>
              </div>
            ))}
          </div>
          <FXButton href="#" className="btn-dark btn-xl">Ver todas as unidades <Icon name="arrow-right" size={16} /></FXButton>
        </div>
        <div className="map-wrap">
          <svg viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brazil-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3CAAC9" stopOpacity=".22"/>
                <stop offset="100%" stopColor="#103C5C" stopOpacity=".25"/>
              </linearGradient>
              <pattern id="grid-pat" width="14" height="14" patternUnits="userSpaceOnUse">
                <path d="M14 0H0V14" fill="none" stroke="rgba(16,60,92,.08)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="380" height="380" fill="url(#grid-pat)"/>
            <path d="M190 30 L230 28 L260 50 L280 80 L295 110 L310 145 L310 185 L295 215 L275 240 L255 260 L230 280 L210 300 L190 330 L165 350 L135 348 L110 330 L95 305 L80 275 L70 250 L62 220 L55 190 L60 160 L72 130 L88 100 L108 75 L133 55 L160 38 Z"
                  fill="url(#brazil-fill)" stroke="#103C5C" strokeOpacity=".4" strokeWidth="1.5"/>
            {STORES.map((s, i) => (
              <g key={i} className="map-pin">
                <circle className="map-pulse" cx={s.cx} cy={s.cy} r="14" fill={s.open ? '#C90288' : '#3CAAC9'} />
                <circle cx={s.cx} cy={s.cy} r="7" fill={s.open ? '#C90288' : '#3CAAC9'} />
                <circle cx={s.cx} cy={s.cy} r="2.5" fill="#fff" />
              </g>
            ))}
            <text x="290" y="200" fontFamily="Poppins" fontWeight="700" fontSize="11" fill="#103C5C">RJ</text>
            <text x="160" y="265" fontFamily="Poppins" fontWeight="700" fontSize="11" fill="#103C5C">SP · 6</text>
            <text x="240" y="180" fontFamily="Poppins" fontWeight="700" fontSize="11" fill="#103C5C">BH</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FRANQUIA
   ============================================================ */
function Franquia({ openSlot }) {
  return (
    <section className="franq" id="franquia" data-screen-label="09 Franquia">
      <div className="l-container">
        <div className="franq-card">
          <div className="text">
            <div className="pre">Fature até R$ 1,2mi/ano</div>
            <h2>Seja uma<br/><span className="alt">loja-nave.</span></h2>
            <p>Marca aplicada do brandbook ao copo. Operação enxuta de 24m², ticket médio alto e suporte completo da rede. Ponto de venda automatizado com preparo de 90 segundos.</p>
            <div className="franq-stats">
              <div className="franq-stat"><div className="v">24m²</div><div className="l">Área mínima</div></div>
              <div className="franq-stat"><div className="v">R$ 280k</div><div className="l">Investimento inicial</div></div>
              <div className="franq-stat"><div className="v">18 meses</div><div className="l">Payback médio</div></div>
              <div className="franq-stat"><div className="v">240/h</div><div className="l">Pedidos em pico</div></div>
            </div>
            <FXButton href="mailto:franquia@frozen1000.com" className="btn-ice btn-xl">Quero meu negócio <Icon name="arrow-right" size={16} /></FXButton>
          </div>
          <div className="franq-photo">
            <Slot id="franq" onClick={openSlot} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INSTAGRAM
   ============================================================ */
const IG_LIST = ['ig_1','ig_2','ig_3','ig_4','ig_5','ig_6'];
function Instagram({ openSlot }) {
  return (
    <section className="ig" id="instagram" data-screen-label="10 Instagram">
      <div className="l-container">
        <div className="head">
          <span className="ey">Divirta-se com a gente</span>
          <h2>No <span className="alt">@frozen1000</span></h2>
          <div className="handle">
            <div className="av"><img src="assets/frizz.png" alt="" /></div>
            <div>
              <div>@frozen1000</div>
              <div style={{fontFamily:'var(--font-text)', fontSize:12, color:'var(--f1k-ink-3)', marginTop:2, fontWeight:500}}>128k seguidores · frozen1000.com.br</div>
            </div>
          </div>
        </div>
        <div className="ig-grid">
          {IG_LIST.map(id => (
            <div className="ig-post" key={id}>
              <Slot id={id} onClick={openSlot} />
              <div className="ovr">▶ {SLOTS[id].label}</div>
            </div>
          ))}
        </div>
        <div className="ctas">
          <FXButton href="#" className="btn-ghost btn-xl">Ver mais</FXButton>
          <FXButton href="https://instagram.com/frozen1000" target="_blank" rel="noopener noreferrer" className="btn-mag btn-xl"><IGGlyph size={16} color="#fff" /> Seguir no Instagram</FXButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DELIVERY BAND
   ============================================================ */
function Delivery() {
  return (
    <section className="delivery" data-screen-label="11 Delivery">
      <div className="inner">
        <img className="frizz" src="assets/frizz.png" alt="Frizz" />
        <span className="ey">Delivery ou Retirada</span>
        <h2>Gele o dia <span style={{color:'#FFE100'}}>onde estiver.</span></h2>
        <p>Peça pelo app, retire na loja-nave ou receba em casa via iFood e Rappi. Pronto em 90 segundos no balcão, alguns minutos na sua porta.</p>
        <div className="ctas">
          <FXButton href="#" className="btn-mag btn-xl">Peça aqui seu Frozen <Icon name="arrow-right" size={16} /></FXButton>
          <FXButton href="#" className="btn-light-ghost btn-xl">Baixar o app</FXButton>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="foot" data-screen-label="12 Footer">
      <div className="l-container">
        <div className="foot-inner">
          <div className="brandcol">
            <img src="assets/logo-horizontal.png" alt="Frozen 1000" />
            <div className="tag">// Gelados inteligentes. Experiências do futuro. Sabor e tecnologia. Na medida certa.</div>
            <div className="socials">
              <a href="#" aria-label="Instagram"><IGGlyph size={18} color="#F1EDE6" /></a>
              <a href="#" aria-label="TikTok"><Icon name="music-2" size={18} color="#F1EDE6" stroke={2} /></a>
              <a href="#" aria-label="YouTube"><Icon name="youtube" size={18} color="#F1EDE6" stroke={2} /></a>
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={18} color="#F1EDE6" stroke={2} /></a>
            </div>
          </div>
          <div className="col">
            <h5>Frozen 1000</h5>
            <ul>
              <li><a href="#cardapio">Cardápio</a></li>
              <li><a href="#como">Como funciona</a></li>
              <li><a href="#experiencia">A marca</a></li>
              <li><a href="#">Frizz · Mascote</a></li>
              <li><a href="#">Nossas causas</a></li>
            </ul>
          </div>
          <div className="col">
            <h5>Negócios</h5>
            <ul>
              <li><a href="#franquia">Seja franqueado</a></li>
              <li><a href="#">Eventos corporativos</a></li>
              <li><a href="#">Imprensa</a></li>
              <li><a href="#">Trabalhe conosco</a></li>
            </ul>
          </div>
          <div className="col">
            <h5>Contato</h5>
            <ul>
              <li><a href="mailto:oi@frozen1000.com.br">oi@frozen1000.com.br</a></li>
              <li><a href="tel:+5511910000000">+55 11 9 1000-0000</a></li>
              <li><a href="#lojas">Encontrar uma loja</a></li>
              <li><a href="#">Política de privacidade</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 FROZEN 1000 · TODOS OS DIREITOS RESERVADOS</span>
          <span>v3.1 · BUILD 2026.05 · PT · EN</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   PROMPT MODAL
   ============================================================ */
function PromptModal({ openId, onClose }) {
  const [copied, setCopied] = useState(false);
  const s = openId ? SLOTS[openId] : null;

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const copy = () => {
    if (!s) return;
    navigator.clipboard?.writeText(s.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={"modal" + (openId ? " open" : "")} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="l-row">
            <span className="id-tag">IMG · {(openId || '').toUpperCase()}</span>
            <h3>{s ? s.label : ''}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="fechar"><Icon name="x" size={18} color="#fff" /></button>
        </div>
        <div className="modal-body">
          <div className="lab">Prompt IA · copie & cole no seu gerador</div>
          <div className="prompt-box">{s ? s.prompt : ''}</div>
        </div>
        <div className="modal-foot">
          <span className={"copy-msg" + (copied ? " show" : "")}>✓ Prompt copiado</span>
          <FXButton as="button" type="button" className="btn-ghost" onClick={onClose}>Fechar</FXButton>
          <FXButton as="button" type="button" className="btn-mag" onClick={copy}><Icon name="copy" size={14} color="#fff" /> Copiar prompt</FXButton>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [openId, setOpenId] = useState(null);
  const open = useCallback((id) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  /* Animated cycling timer in "Como funciona" */
  useEffect(() => {
    let t = 0; const el = document.getElementById('liveTimer');
    const id = setInterval(() => {
      t = (t + 1) % 91;
      const ss = String(t).padStart(2, '0');
      if (el) el.textContent = '00:' + ss;
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <TopNav />
      <Hero openSlot={open} />
      <Marquee />
      <Launch openSlot={open} />
      <About />
      <Cardapio openSlot={open} />
      <Como />
      <Lifestyle openSlot={open} />
      <Clube />
      <Lojas />
      <Franquia openSlot={open} />
      <Instagram openSlot={open} />
      <Delivery />
      <Footer />
      <PromptModal openId={openId} onClose={close} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
console.log('[Frozen 1000] landing mounted');
