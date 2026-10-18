# L'Amour Atelier & Wedding Gifts — Luxury Wedding Favor & Custom Keepsake Website

A charming, personalized, and luxury responsive website created for a premier **Wedding Favor & Custom Gift Company**. Featuring a romantic aesthetic with champagne gold accents, rich botanical sage, warm ivory paper tones, real-time custom branding simulation, and an interactive wedding favor planning suite.

---

## 🌟 Project Highlights & Features

- **No Dashboard required**: Crafted as an elegant bridal customer-facing boutique and bespoke consultation experience.
- **Two Unique Home Page Layouts**:
  - `index.html` (**Home 1 - Classic Elegance**): Romantic hero banner, curated theme collection cards, featured bestsellers, mini customizer teaser, 4-step artisanal process, and real bride & groom love stories.
  - `home-2.html` (**Home 2 - Botanical Luxe & Editorial**): Modern split-screen hero layout, seasonal favor palettes (Spring, Summer Riviera, Autumn Harvest, Winter Opulence), VIP bridal party proposal gifting suites, visual wedding timeline roadmap, and interactive FAQ accordion.
- **`products.html` (Favors by Theme)**:
  - 16+ handcrafted favor products with high-resolution imagery and specifications.
  - Instant theme filtering: *Rustic & Boho, Modern Luxe, Coastal & Beach, Vintage Glamour, Minimalist Chic, Gourmet & Edibles, Bridal Party Suites*.
  - Real-time search by keyword and sorting by price or title.
  - Interactive **Bulk Quantity Discount Estimator** with dynamic tier badges (5%, 12%, 18%, and 25% savings).
- **`product.html` (Bespoke Product Detail Page & Live Configurator)**:
  - Interactive multi-angle product gallery (main image + 4 thumbnail views with smooth transition & hover zoom hint).
  - Dynamic bulk quantity savings matrix (30–49 pcs, 50–99 pcs [5% off], 100–249 pcs [12% off], 250–499 pcs [18% off], and 500+ pcs [25% off]) with instant click-to-apply.
  - Interactive +/- quantity stepper with live total order pricing and real-time savings counter.
  - Bespoke personalization studio: live text inputs for couple names, wedding date, and monogram tag crest.
  - Interactive metallic hot foil swatches (*Rubellite Rose Gold, Royal Sapphire Blue, Peacock Teal Metallic, Orchid Amethyst, Sterling Silver*) and handmade chiffon ribbon swatches.
  - Real-time digital proof tag preview card updating as couples type their names and wedding date.
  - 4-tab specifications breakdown (*Artisanal Story & Sourcing, Personalization Process, Dimensions & Ingredients, Wedding Timeline & Shipping*).
  - Verified bride & groom photo review cards and complementary favor recommendations.
  - Full support for `?id=favor-X` URL query parameter to load different favor styles dynamically.
- **`custom-branding.html` (Interactive Live Customizer Studio)**:
  - **Live Proof Simulator**: Couples can type their names, monogram initials, event date, and wedding venue/quote to see it render live on a simulated favor box.
  - **Real-Time Metallic Foil Shimmer**: Switch between *Royal Champagne Gold*, *Romantic Rose Gold*, *Sterling Silver*, and *Forest Emerald* foil finishes.
  - **Typography Switcher**: Real-time toggling between *Romantic Calligraphy Script*, *Classic Serif*, and *Modern Minimalist Sans*.
  - **Packaging & Ribbon Customizer**: Live swatch picker for linen box color, hand-dyed silk ribbon, and sealing wax shades with botanical/crest stamp motifs.
  - **Live Unit Price Breakdown**: Calculates real-time price based on chosen finishes and allows one-click saving to the inquiry wishlist.
- **`contact.html` (Interactive Wedding Favor Consultation & Enquiry Form)**:
  - Comprehensive wedding favor questionnaire (couple/planner name, venue destination, wedding date).
  - Interactive guest count slider (20 to 500+ guests) with real-time investment calculation.
  - Checkbox selection for favor styles and custom branding finishes (foil stamping, wax seals, silk ribbons, laser engraving).
  - Instant interactive submission celebration modal with customized summary.
  - Atelier showroom details, appointment booking hours, and sample kit order card.
- **Dark Mode & Light Mode (Midnight Sapphire & Pearl Daylight)**:
  - Header toggle button with real-time icon animation (`fa-moon` / `fa-sun`).
  - **Pearl Daylight**: Luminous crystal pearl, petal orchid blush, and rubellite rose luxury.
  - **Midnight Sapphire**: Deep velvet midnight navy surfaces (`#091321`, `#111F33`), high-contrast luminous pearl typography (`#F1F4F9`), jewel-tone borders, and glowing accents.
  - Non-flash initialization snippet in `<head>` ensures smooth rendering upon refresh.
- **RTL (Right-to-Left) Language & Layout Support**:
  - Global `[dir="rtl"]` toggle with animated indicator badge (`RTL` / `LTR`).
  - Complete directional mirroring: text alignments, slide-out sample drawer (slides in from left), inverted breadcrumb chevrons, floating badges, wax seal placement, and toast animations.
  - Persistent state saved to `localStorage` (`wedding_direction`).
- **Impeccable Navbar Alignment & Unified Home Dropdown**:
  - Replaced separate "Home 1" and "Home 2" links with a single elegant **"Home" dropdown button** with chevron animation (`fa-chevron-down`).
  - Clicking or hovering the **Home** button reveals an interactive luxury popover displaying both home layouts (**Home 1 - Classic Elegance** and **Home 2 - Botanical Luxe**).
  - Single-line alignment with `white-space: nowrap` on brand logo, navigation links, and call-to-action buttons.
  - Fluid responsive spacing (`gap: clamp()`) and dedicated mobile hamburger drawer breakpoint at `1040px`.
  - Accessible click-outside closing and `Escape` key dismissal.
- **Bespoke Luxury Favicon Suite**:
  - Custom vector [`favicon.svg`](file:///c:/Users/L%20E%20N%20O%20V%20O/Documents/Wedding-Favor-Custom-Gift/favicon.svg) featuring a handcrafted luxury gift box with ribbon bow, jewel-tone squircle gradient, and celestial bridal sparkles.
  - Paired with high-resolution [`favicon.png`](file:///c:/Users/L%20E%20N%20O%20V%20O/Documents/Wedding-Favor-Custom-Gift/favicon.png) and [`favicon.ico`](file:///c:/Users/L%20E%20N%20O%20V%20O/Documents/Wedding-Favor-Custom-Gift/favicon.ico) for universal cross-browser and mobile bookmark compatibility.
- **Global Interactive Elements (`script.js` & `style.css`)**:
  - **Favor Wishlist / Sample Cart Drawer**: Slide-out drawer with persistent `localStorage` storage, quantity adjustments, and inquiry checkout trigger.
  - **Quick View Modal**: Inspect any favor's details, minimum order quantity, and tier discounts with one click.
  - **Toast Notifications**: Gentle, non-intrusive alerts when favors or custom designs are added to the list, or when theme/direction is toggled.
  - **Fully Responsive**: Adapts across mobile smartphones, tablets, laptops, and ultra-wide desktop screens.

---

## 📁 File Structure

```text
Wedding-Favor-Custom-Gift/
│
├── index.html              # Home Page 1 (Classic Elegance layout)
├── home-2.html             # Home Page 2 (Botanical Luxe & Editorial layout)
├── products.html           # Products Catalog filterable by Theme & Search
├── product.html            # Bespoke Product Detail Page & Live Configurator
├── custom-branding.html    # Interactive Custom Branding Studio & Simulator
├── contact.html            # Wedding Favor Enquiry & Consultation Form
├── style.css               # Design System, Responsive Media Queries & Styling
├── script.js               # Interactive JS Engine (Customizer, Wishlist, Filter, Modal)
├── favicon.svg             # Vector Luxury Gift Box Favicon (Crisp at any DPI)
├── favicon.png             # 192x192 High-Res Raster Favicon & Apple Touch Icon
├── favicon.ico             # Native Windows & Cross-Browser Icon
└── README.md               # Project Documentation
```

---

## 🎨 Design System & Aesthetics

### Typography
- **Headings & Titles**: `Playfair Display` & `Cormorant Garamond` (Classic, timeless serif luxury).
- **Romantic Monograms & Names**: `Great Vibes` (Fluid, handcrafted calligraphy script).
- **Body & UI Controls**: `Montserrat` (Clean, legible, modern geometric sans-serif).

### Color Palette (Colorful Haute Luxury — "Le Jardin des Gemmes")
- **Royal Sapphire Azure**: `#193863` / `#0E223F` (Majestic, deep luxury foundation replacing dull neutrals)
- **Rubellite Rose Coral**: `#D93B58` / `#FFA1B2` / `#A9233D` (Vibrant, joyful bridal coral-rose replacing traditional gold)
- **Royal Amethyst & Orchid Violet**: `#742A68` / `#C479B9` / `#4F1645` (Opulent jewel-tone gemstone elegance)
- **Peacock Teal & Mediterranean Opal**: `#0D7E84` / `#48CBD1` (Vibrant exotic coastal radiance)
- **Crystal Pearl Silk & Soft Rose-Cashmere**: `#FCFAF6` / `#F8F3F7` (Luminous, tactile luxury paper backdrops)
- **Midnight Obsidian Navy**: `#141A24` (Deep velvet midnight contrast for typography)
- **Vibrant Metallic Foils**: Multi-stop metallic foil simulations in Rubellite Rose, Royal Sapphire, Peacock Teal, and Orchid Amethyst. Free of yellow gold!

---

## 🚀 Quick Start / How to View

1. **No build step required**: Pure, vanilla HTML5, CSS3, and modern JavaScript.
2. Open any `.html` file (e.g. `index.html`) directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, launch a local web server from this directory:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using Node.js / npx
   npx serve .
   ```
4. Navigate to `http://localhost:8000` in your web browser.

---

## 💍 Key Interactions to Try

1. **Test the Live Custom Branding Studio (`custom-branding.html`)**:
   - Change the couple's names and wedding date in the input fields; watch the mockup update in real time.
   - Switch foil finish to *Rose Gold* or *Forest Emerald* to see metallic text gradients transform.
   - Select different box colors, silk ribbon swatches, and wax seal motifs.
   - Click **Save Branded Design to Inquiry** to persist your custom box into your favor drawer.
2. **Explore Theme Filtering & Bulk Calculator (`products.html`)**:
   - Filter by *Rustic & Boho*, *Gourmet & Edibles*, or *Modern Luxe*.
   - Use the live search bar to search for `"candle"`, `"honey"`, or `"wood"`.
   - Drag the Bulk Quantity Slider to observe automatic tier discount recalculations.
3. **Submit a Custom Enquiry (`contact.html`)**:
   - Move the guest count slider to see the estimated production investment adjust dynamically.
   - Fill in your details and hit submit to view the interactive celebration modal.

---

© 2026 L'Amour Atelier & Wedding Favors Inc. Handcrafted for unforgettable celebrations.
