# Frozen 1000 — Landing

Landing page institucional da Frozen 1000 ("Gelados inteligentes. Experiências do futuro.")
Construída em **Django + Bootstrap 5 + JS puro/HTML/CSS** — sem React, sem build step.

---

## Stack

- **Django 5.x** — renderização server-side, organização de dados em Python.
- **Bootstrap 5.3** — utilitários, grid e o offcanvas do menu mobile (via CDN).
- **Lucide Icons** — ícones SVG (via CDN).
- **CSS custom** — todo o design original preservado em `static/css/styles.css`
  (com tokens em `static/css/colors_and_type.css` — brandbook v2 Frozen 1000).
- **JS vanilla** — `static/js/main.js` substitui o React 1:1
  (spotlight, ripple, abas, modal de prompt, timer 90s).

---

## Estrutura

```
Frozen1000/
├── manage.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── config/                    # Configuração do projeto Django
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── landing/                   # App principal
│   ├── apps.py
│   ├── views.py               # IndexView (TemplateView)
│   ├── urls.py
│   ├── data.py                # SLOTS, PRODUCTS, CATS, STORES, STEPS, TICKER, IG_LIST
│   └── templatetags/
│       └── landing_extras.py  # filtro |get_slot
│
├── templates/
│   ├── base.html              # Shell HTML + Bootstrap + CSS chain
│   └── landing/
│       ├── index.html         # Composição de partials
│       └── partials/
│           ├── nav.html       hero.html      marquee.html
│           ├── launch.html    about.html     cardapio.html
│           ├── como.html      lifestyle.html clube.html
│           ├── lojas.html     franquia.html  instagram.html
│           ├── delivery.html  footer.html    modal.html
│           └── slot.html      # Card reutilizável (placeholder de imagem)
│
├── static/
│   ├── css/
│   │   ├── colors_and_type.css   # tokens da marca
│   │   └── styles.css            # estilos da landing
│   ├── js/
│   │   └── main.js               # comportamento de toda a página
│   └── images/
│       ├── frizz.png
│       ├── logo-horizontal.png
│       └── logo-vertical.png
│
└── _legacy/                   # Originais (HTML+JSX+CSS) preservados para referência
```

---

## Rodando localmente

### 1 · Pré-requisitos
- Python 3.10+
- pip

### 2 · Setup

```bash
# Criar e ativar um virtualenv
python -m venv .venv

# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
```

### 3 · Subir o servidor

```bash
python manage.py runserver
```

Acesse <http://127.0.0.1:8000/>.

> Não há banco de dados nesta landing — `manage.py migrate` é opcional
> (Django cria `db.sqlite3` vazio apenas para satisfazer o `check`).

### 4 · Produção (collectstatic)

```bash
python manage.py collectstatic --noinput
```

Defina `DJANGO_DEBUG=0` e `DJANGO_SECRET_KEY=...` no ambiente.

---

## Como o design foi preservado

- **CSS** — `styles.css` e `colors_and_type.css` foram migrados sem alteração
  visual. A única mudança de nome de classe foi `.modal` → `.f1k-modal`
  para evitar colisão com o `.modal` do Bootstrap. A aparência é idêntica.
- **Bootstrap** carrega **antes** do CSS customizado, então qualquer regra
  do design original vence a cascata.
- **Tokens da marca** (cores, tipografia, espaçamentos, raios, sombras,
  durações de motion) seguem 100% o brandbook v2.

## Como o comportamento React foi portado

| Comportamento original (React)        | Implementação atual (JS puro)                       |
|---------------------------------------|------------------------------------------------------|
| `Slot` component                      | `partials/slot.html` + `data-slot-id`                |
| `FXButton` ripple                     | Event-delegation em `.btn` (`initRipple`)            |
| `PromptModal` (state)                 | `f1k-modal` + `initModal()`                          |
| `Cardapio` tabs (useState filter)     | `data-cat` em cards + `initTabs()`                   |
| `Como` live timer (useEffect)         | `initLiveTimer()`                                    |
| Lucide `createIcons()`                | `initLucide()`                                       |
| Mouse spotlight (inline `<script>`)   | `initSpotlight()`                                    |
| `SLOTS` (prompts gigantes)            | `landing/data.py` → JSON em `<script id="slot-data">`|

---

## Onde adicionar coisas

- **Novo produto no cardápio** → `landing/data.py` (`PRODUCTS` + um item em
  `SLOTS` com o prompt de IA da foto).
- **Nova categoria** → `landing/data.py` (`CATS`); o filtro de abas já lida.
- **Nova seção** → crie `templates/landing/partials/xxx.html` e
  `{% include %}` no `index.html`.
- **Nova rota** → registre em `landing/urls.py` e crie a view correspondente.

---

## Notas de build

- Não há bundler. Tudo é carregado direto (Bootstrap e Lucide via CDN,
  Django serve o `static/` em dev). Para produção use `collectstatic` +
  um servidor de assets (Nginx, S3+CloudFront, WhiteNoise, etc.).
- Não há banco. Caso futuramente o cardápio venha do banco, basta
  trocar `landing/data.py` por um modelo Django e ajustar a view.
