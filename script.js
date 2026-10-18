/**
 * WEDDING FAVOR & CUSTOM GIFT COMPANY - SCRIPT.JS
 * Complete interactive suite: Favor Wishlist Drawer, Quick View Modal,
 * Real-time Custom Branding Simulator, Bulk Pricing Calculator,
 * Theme Filtering & Search, FAQ Accordion, and Enquiry Form Handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initRTLToggle();
  initNavigation();
  initWishlistDrawer();
  initQuickViewModal();
  initProductFilterAndSearch();
  initCustomBrandingStudio();
  initBulkPricingCalculator();
  initFAQAccordion();
  initContactEnquiryForm();
  initNewsletterForm();
  initProductDetailPage();
});

/* ==========================================================================
   0. THEME & RTL CONTROLS (LUXURY MIDNIGHT & DIRECTION TOGGLES)
   ========================================================================== */
function initThemeToggle() {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('wedding_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Resolve current active theme
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  updateThemeIcons(currentTheme === 'dark');

  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('wedding_theme', 'light');
        updateThemeIcons(false);
        showToast('Switched to Pearl Daylight luxury view');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('wedding_theme', 'dark');
        updateThemeIcons(true);
        showToast('Switched to Midnight Sapphire luxury view');
      }
    });
  });

  function updateThemeIcons(isDark) {
    themeBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (isDark) {
          icon.className = 'fas fa-sun';
          btn.setAttribute('title', 'Switch to Pearl Light Mode');
          btn.setAttribute('aria-label', 'Switch to Pearl Light Mode');
        } else {
          icon.className = 'fas fa-moon';
          btn.setAttribute('title', 'Switch to Midnight Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Midnight Dark Mode');
        }
      }
    });
  }
}

function initRTLToggle() {
  const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('wedding_direction') || 'ltr';

  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }

  updateRTLBadges(savedDir === 'rtl');

  rtlBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.documentElement.getAttribute('dir');
      const isRTL = currentDir === 'rtl';
      if (isRTL) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('wedding_direction', 'ltr');
        updateRTLBadges(false);
        showToast('Switched to Left-to-Right (LTR) layout');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('wedding_direction', 'rtl');
        updateRTLBadges(true);
        showToast('Switched to Right-to-Left (RTL) layout');
      }
    });
  });

  function updateRTLBadges(isRTL) {
    rtlBtns.forEach(btn => {
      const badge = btn.querySelector('.rtl-badge');
      if (badge) {
        badge.textContent = isRTL ? 'LTR' : 'RTL';
      }
      const icon = btn.querySelector('i');
      if (icon) {
        if (isRTL) {
          icon.className = 'fas fa-arrow-right';
        } else {
          icon.className = 'fas fa-arrow-left';
        }
      }
      btn.setAttribute('title', isRTL ? 'Switch to LTR Direction' : 'Switch to RTL Direction');
      btn.setAttribute('aria-label', isRTL ? 'Switch to LTR Direction' : 'Switch to RTL Direction');
    });
  }
}

/* ==========================================================================
   1. NAVIGATION & HEADER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  // Sticky header shadow
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking standard link (excluding dropdown toggles)
    navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Home Dropdown Click Toggle (Desktop & Mobile)
  const dropdownToggles = document.querySelectorAll('.has-dropdown .dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentDropdown = toggle.closest('.has-dropdown');
      if (parentDropdown) {
        const isOpen = parentDropdown.classList.contains('open');
        // Close any other open dropdowns
        document.querySelectorAll('.has-dropdown.open').forEach(d => {
          if (d !== parentDropdown) {
            d.classList.remove('open');
            const btn = d.querySelector('.dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle this dropdown
        parentDropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
      }
    });
  });

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.has-dropdown.open').forEach(d => {
        d.classList.remove('open');
        const btn = d.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdown on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.has-dropdown.open').forEach(d => {
        d.classList.remove('open');
        const btn = d.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==========================================================================
   2. WISHLIST / SAMPLE FAVOR DRAWER (WITH LOCAL STORAGE)
   ========================================================================== */
const DEFAULT_WISHLIST = [
  {
    id: 'favor-box',
    name: 'Bespoke Monogram Wedding Favor Box with Silk Ribbon',
    theme: 'Modern Luxe',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80',
    quantity: 1
  },
  {
    id: 'favor-2',
    name: 'Pure Wildflower Honey Miniature Jars with Custom Label',
    theme: 'Gourmet & Edibles',
    price: 5.25,
    image: 'assets/images/wildflower-honey-jars.jpg',
    quantity: 1
  }
];

function getWishlist() {
  try {
    const saved = localStorage.getItem('wedding_favor_wishlist');
    let items = saved ? JSON.parse(saved) : DEFAULT_WISHLIST;
    // Migrate any legacy cached URLs to authentic wedding favor images
    items = items.map(item => {
      if (item.image && (item.image.includes('1587049352846-4a222e784d38') || item.image.includes('1647470226350-df0050ca1979'))) {
        item.image = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80';
        item.name = 'Bespoke Monogram Wedding Favor Box with Silk Ribbon';
      }
      if (item.image && item.image.includes('1513519245088-0e12902e5a38')) {
        item.image = 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80';
      }
      if (item.image && item.image.includes('1558642452-9d2a7deb7f62')) {
        item.image = 'assets/images/wildflower-honey-jars.jpg';
        item.name = 'Pure Wildflower Honey Miniature Jars with Custom Label';
      }
      return item;
    });
    return items;
  } catch (e) {
    return DEFAULT_WISHLIST;
  }
}

function saveWishlist(items) {
  try {
    localStorage.setItem('wedding_favor_wishlist', JSON.stringify(items));
  } catch (e) {
    console.error('Error saving wishlist:', e);
  }
  updateWishlistUI();
}

function updateWishlistUI() {
  const items = getWishlist();
  const badges = document.querySelectorAll('.wishlist-count-badge');
  const cartBody = document.querySelector('.drawer-body');
  const totalElem = document.querySelector('.drawer-total-amount');

  // Update counts
  const totalCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  badges.forEach(b => {
    b.textContent = totalCount;
  });

  // Render items inside drawer
  if (cartBody) {
    if (items.length === 0) {
      cartBody.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--color-muted);">
          <i class="far fa-heart" style="font-size: 3rem; margin-bottom: 16px; color: var(--color-gold-light);"></i>
          <p style="font-size: 1rem; margin-bottom: 12px; font-weight: 500;">Your favor wishlist is empty.</p>
          <p style="font-size: 0.85rem; margin-bottom: 24px;">Explore our curated collections and save your favorite keepsakes or sample requests!</p>
          <a href="products.html" class="btn btn-outline btn-sm">Explore Favors</a>
        </div>
      `;
    } else {
      cartBody.innerHTML = items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h5 class="cart-item-title">${item.name}</h5>
            <div style="font-size: 0.75rem; color: var(--color-gold-dark); text-transform: uppercase; margin-bottom: 4px;">${item.theme || 'Custom Favor'}</div>
            <div class="cart-item-price">$${Number(item.price).toFixed(2)} / unit</div>
            <button class="cart-item-remove" onclick="removeWishlistItem('${item.id}')">
              <i class="far fa-trash-alt"></i> Remove
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // Update total
  if (totalElem) {
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    totalElem.textContent = `$${total.toFixed(2)}`;
  }
}

window.removeWishlistItem = function(id) {
  let items = getWishlist();
  items = items.filter(item => item.id !== id);
  saveWishlist(items);
  showToast('Item removed from favor inquiry list');
};

window.addToWishlist = function(product) {
  let items = getWishlist();
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
    showToast(`Updated quantity for ${product.name}`);
  } else {
    items.push({
      id: product.id || 'favor-' + Date.now(),
      name: product.name,
      theme: product.theme || 'Wedding Favor',
      price: parseFloat(product.price) || 4.50,
      image: product.image,
      quantity: 1
    });
    showToast(`Added "${product.name}" to your wishlist!`);
  }
  saveWishlist(items);
};

function initWishlistDrawer() {
  const triggerBtns = document.querySelectorAll('.open-wishlist-btn');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerPanel = document.querySelector('.drawer-panel');
  const closeBtn = document.querySelector('.close-drawer-btn');

  function openDrawer() {
    updateWishlistUI();
    if (drawerOverlay && drawerPanel) {
      drawerOverlay.classList.add('active');
      drawerPanel.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (drawerOverlay && drawerPanel) {
      drawerOverlay.classList.remove('active');
      drawerPanel.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  triggerBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDrawer();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  updateWishlistUI();
}

/* ==========================================================================
   3. QUICK VIEW MODAL
   ========================================================================== */
function initQuickViewModal() {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (!modalOverlay) return;

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // Attach quick view click listeners
  document.querySelectorAll('.btn-quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;

      const title = card.querySelector('.product-title')?.innerText || 'Personalized Favor Keepsake';
      const priceText = card.querySelector('.product-price')?.innerText || '$4.50';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 4.50;
      const theme = card.querySelector('.product-theme-tag')?.innerText || 'Wedding Collection';
      const imgSrc = card.querySelector('.product-media img')?.src || '';
      const moq = card.querySelector('.product-moq')?.innerText || 'Min. order: 30 pcs';

      // Populate modal
      const modalImg = modalOverlay.querySelector('.modal-img');
      const modalTitle = modalOverlay.querySelector('.modal-product-title');
      const modalPrice = modalOverlay.querySelector('.modal-product-price');
      const modalTheme = modalOverlay.querySelector('.modal-product-theme');
      const modalMoq = modalOverlay.querySelector('.modal-product-moq');
      const modalAddBtn = modalOverlay.querySelector('.modal-add-wishlist-btn');

      if (modalImg) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.innerText = title;
      if (modalPrice) modalPrice.innerText = priceText;
      if (modalTheme) modalTheme.innerText = theme;
      if (modalMoq) modalMoq.innerText = moq;

      if (modalAddBtn) {
        modalAddBtn.onclick = () => {
          addToWishlist({
            id: 'qv-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: title,
            theme: theme,
            price: price,
            image: imgSrc
          });
          closeModal();
        };
      }

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
}

/* ==========================================================================
   4. PRODUCT FILTERING, SEARCH & SORTING (PRODUCTS.HTML)
   ========================================================================== */
function initProductFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.theme-filter-nav .filter-btn');
  const searchInput = document.querySelector('#productSearchInput');
  const sortSelect = document.querySelector('#productSortSelect');
  const productCards = document.querySelectorAll('.products-grid .product-card');
  const noResultsMsg = document.querySelector('#noProductsFound');

  if (!productCards.length) return;

  let activeTheme = 'all';
  let searchTerm = '';
  let sortBy = 'featured';

  function filterAndSortProducts() {
    let visibleCount = 0;
    const cardsArray = Array.from(productCards);

    // Sort logic
    if (sortBy === 'price-low') {
      cardsArray.sort((a, b) => getCardPrice(a) - getCardPrice(b));
    } else if (sortBy === 'price-high') {
      cardsArray.sort((a, b) => getCardPrice(b) - getCardPrice(a));
    } else if (sortBy === 'name') {
      cardsArray.sort((a, b) => getCardTitle(a).localeCompare(getCardTitle(b)));
    }

    // Re-append sorted cards
    const grid = document.querySelector('.products-grid');
    if (grid && (sortBy === 'price-low' || sortBy === 'price-high' || sortBy === 'name')) {
      cardsArray.forEach(card => grid.appendChild(card));
    }

    // Filter display logic
    cardsArray.forEach(card => {
      const cardTheme = (card.getAttribute('data-theme') || '').toLowerCase();
      const cardTitle = getCardTitle(card).toLowerCase();
      const cardDesc = (card.querySelector('.product-desc')?.innerText || '').toLowerCase();

      const matchesTheme = activeTheme === 'all' || cardTheme.includes(activeTheme.toLowerCase());
      const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);

      if (matchesTheme && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  function getCardPrice(card) {
    const text = card.querySelector('.product-price')?.innerText || '0';
    return parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
  }

  function getCardTitle(card) {
    return card.querySelector('.product-title')?.innerText || '';
  }

  // Filter click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTheme = btn.getAttribute('data-filter') || 'all';
      filterAndSortProducts();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      filterAndSortProducts();
    });
  }

  // Sort select handler
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      filterAndSortProducts();
    });
  }

  // Quick Add Button Click
  document.querySelectorAll('.btn-add-favor').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;

      const title = card.querySelector('.product-title')?.innerText || 'Wedding Favor';
      const price = getCardPrice(card);
      const theme = card.querySelector('.product-theme-tag')?.innerText || 'Custom Favor';
      const image = card.querySelector('.product-media img')?.src || '';

      addToWishlist({
        id: 'prod-' + title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: title,
        theme: theme,
        price: price,
        image: image
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE LIVE CUSTOM BRANDING STUDIO (CUSTOM-BRANDING.HTML)
   ========================================================================== */
function initCustomBrandingStudio() {
  const customizer = document.querySelector('.customizer-layout');
  if (!customizer) return;

  // Form Inputs
  const namesInput = document.querySelector('#inputCoupleNames');
  const monogramInput = document.querySelector('#inputMonogram');
  const dateInput = document.querySelector('#inputEventDate');
  const taglineInput = document.querySelector('#inputTagline');

  // Preview elements
  const previewBox = document.querySelector('.mockup-favor-box');
  const previewNames = document.querySelector('.mockup-names');
  const previewMonogram = document.querySelector('.mockup-monogram');
  const previewDate = document.querySelector('.mockup-date');
  const previewTagline = document.querySelector('.mockup-tagline');
  const previewRibbon = document.querySelector('.mockup-ribbon');
  const previewWaxSeal = document.querySelector('.mockup-wax-seal');
  const livePriceTag = document.querySelector('.custom-price-tag');

  // Base pricing
  let basePrice = 4.20;
  let foilAddon = 0.80;
  let waxSealAddon = 0.60;
  let ribbonAddon = 0.40;

  function updateMockupText() {
    if (previewNames && namesInput) {
      previewNames.textContent = namesInput.value || 'Charlotte & Alexander';
    }
    if (previewMonogram && monogramInput) {
      previewMonogram.textContent = monogramInput.value || 'C & A';
    }
    if (previewDate && dateInput) {
      previewDate.textContent = dateInput.value || 'October 24, 2026';
    }
    if (previewTagline && taglineInput) {
      previewTagline.textContent = taglineInput.value || 'Forever & Always';
    }
  }

  // Attach text listeners
  [namesInput, monogramInput, dateInput, taglineInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateMockupText);
  });

  // Foil finish handler
  document.querySelectorAll('input[name="foilFinish"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const foil = e.target.value; // 'rose', 'sapphire', 'teal', 'purple'
      const foilClasses = [
        'foil-text-gold', 'foil-text-rosegold', 'foil-text-silver', 
        'foil-text-emerald', 'foil-text-rose', 'foil-text-sapphire', 
        'foil-text-teal', 'foil-text-purple'
      ];
      const targetClass = `foil-text-${foil}`;

      [previewMonogram, previewNames, previewTagline, previewDate].forEach(el => {
        if (el) {
          foilClasses.forEach(c => el.classList.remove(c));
          el.classList.add(targetClass);
        }
      });
      calculateCustomPrice();
    });
  });

  // Typography font style handler
  document.querySelectorAll('input[name="fontStyle"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const font = e.target.value; // 'script', 'serif', 'sans'
      const fontClasses = ['font-style-script', 'font-style-serif', 'font-style-sans'];
      const targetClass = `font-style-${font}`;

      if (previewNames) {
        fontClasses.forEach(c => previewNames.classList.remove(c));
        previewNames.classList.add(targetClass);
      }
    });
  });

  // Box Color Swatches
  document.querySelectorAll('input[name="boxColor"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const color = e.target.value;
      if (previewBox) {
        previewBox.style.backgroundColor = color;
      }
    });
  });

  // Ribbon Color Swatches
  document.querySelectorAll('input[name="ribbonColor"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const color = e.target.value;
      if (previewRibbon) {
        if (color === 'none') {
          previewRibbon.style.display = 'none';
          ribbonAddon = 0;
        } else {
          previewRibbon.style.display = 'block';
          previewRibbon.style.backgroundColor = color;
          ribbonAddon = 0.40;
        }
        calculateCustomPrice();
      }
    });
  });

  // Wax Seal stamp icon & color
  document.querySelectorAll('input[name="waxSealColor"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const color = e.target.value;
      if (previewWaxSeal) {
        if (color === 'none') {
          previewWaxSeal.style.display = 'none';
          waxSealAddon = 0;
        } else {
          previewWaxSeal.style.display = 'flex';
          previewWaxSeal.style.background = color;
          waxSealAddon = 0.60;
        }
        calculateCustomPrice();
      }
    });
  });

  document.querySelectorAll('input[name="waxSealStamp"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const iconClass = e.target.value;
      if (previewWaxSeal) {
        previewWaxSeal.innerHTML = `<i class="${iconClass}"></i>`;
      }
    });
  });

  function calculateCustomPrice() {
    const totalUnit = basePrice + foilAddon + waxSealAddon + ribbonAddon;
    if (livePriceTag) {
      livePriceTag.textContent = `$${totalUnit.toFixed(2)}`;
    }
  }

  // Save custom favor design button
  const saveDesignBtn = document.querySelector('#saveCustomDesignBtn');
  if (saveDesignBtn) {
    saveDesignBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const names = namesInput?.value || 'Charlotte & Alexander';
      const totalUnit = basePrice + foilAddon + waxSealAddon + ribbonAddon;

      addToWishlist({
        id: 'custom-' + Date.now(),
        name: `Bespoke Favor Box: ${names}`,
        theme: 'Custom Branding Suite',
        price: totalUnit,
        image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80'
      });
      showToast('Custom branded favor saved to your quote request!');
    });
  }
}

/* ==========================================================================
   6. INTERACTIVE BULK PRICING CALCULATOR
   ========================================================================== */
function initBulkPricingCalculator() {
  const slider = document.querySelector('#bulkQuantitySlider');
  const countDisplay = document.querySelector('#bulkCountDisplay');
  const unitRateDisplay = document.querySelector('#bulkUnitRate');
  const totalDisplay = document.querySelector('#bulkTotalDisplay');
  const discountTierBadge = document.querySelector('#bulkDiscountBadge');

  if (!slider) return;

  function updateCalculator() {
    const count = parseInt(slider.value, 10);
    if (countDisplay) countDisplay.textContent = `${count} Favors`;

    let baseRate = 5.00;
    let discountPercent = 0;
    let badgeText = 'Standard Tier (1-49 pcs)';

    if (count >= 50 && count < 100) {
      discountPercent = 0.05;
      badgeText = '5% Tier Savings (50-99 pcs)';
    } else if (count >= 100 && count < 200) {
      discountPercent = 0.12;
      badgeText = '12% Tier Savings (100-199 pcs)';
    } else if (count >= 200 && count < 350) {
      discountPercent = 0.18;
      badgeText = '18% Tier Savings (200-349 pcs)';
    } else if (count >= 350) {
      discountPercent = 0.25;
      badgeText = '25% Luxury Bulk Savings (350+ pcs)';
    }

    const discountedUnit = baseRate * (1 - discountPercent);
    const totalCost = discountedUnit * count;

    if (unitRateDisplay) unitRateDisplay.textContent = `$${discountedUnit.toFixed(2)} / favor (Reg. $${baseRate.toFixed(2)})`;
    if (totalDisplay) totalDisplay.textContent = `$${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (discountTierBadge) discountTierBadge.textContent = badgeText;
  }

  slider.addEventListener('input', updateCalculator);
  updateCalculator();
}

/* ==========================================================================
   7. FAQ ACCORDION
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherAns = other.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (!isActive) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        } else {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    }
  });
}

/* ==========================================================================
   8. CONTACT & WEDDING ENQUIRY FORM (STRICT FORMAT VALIDATION)
   ========================================================================== */
function initContactEnquiryForm() {
  const form = document.querySelector('#weddingEnquiryForm');
  if (!form) return;

  const slider = document.querySelector('#contactGuestCountSlider');
  const countText = document.querySelector('#contactGuestCountDisplay');
  const quoteEstimateDisplay = document.querySelector('#estimatedEnquiryTotal');

  const coupleNameInput = form.querySelector('#coupleName');
  const clientEmailInput = form.querySelector('#clientEmail');
  const clientPhoneInput = form.querySelector('#clientPhone');
  const weddingDateInput = form.querySelector('#weddingDate');
  const weddingVenueInput = form.querySelector('#weddingVenue');

  const coupleNameError = form.querySelector('#coupleNameError');
  const clientEmailError = form.querySelector('#clientEmailError');
  const clientPhoneError = form.querySelector('#clientPhoneError');
  const weddingDateError = form.querySelector('#weddingDateError');
  const weddingVenueError = form.querySelector('#weddingVenueError');

  // Dynamically set minimum wedding date to today (past dates are invalid)
  if (weddingDateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    weddingDateInput.min = todayStr;
    weddingDateInput.max = `${yyyy + 10}-12-31`;
  }

  // Real-time keypress restrictions: block invalid characters at keystroke
  if (coupleNameInput) {
    coupleNameInput.addEventListener('keypress', (e) => {
      // Disallow numbers and special symbols that cannot be in names
      if (/[\d@#$%^*_+=~<>\[\]{}?!;"\\]/.test(e.key)) {
        e.preventDefault();
        setStatus(coupleNameInput, coupleNameError, false, 'Names cannot contain numbers or special symbols.');
      }
    });
  }

  if (clientPhoneInput) {
    clientPhoneInput.addEventListener('keypress', (e) => {
      // Disallow alphabetic characters or symbols not used in phone numbers
      if (!/[\d\s+\-().]/.test(e.key)) {
        e.preventDefault();
        setStatus(clientPhoneInput, clientPhoneError, false, 'Phone numbers can only contain digits, spaces, and + - ( ) .');
      }
    });
  }

  if (clientEmailInput) {
    clientEmailInput.addEventListener('keypress', (e) => {
      // Disallow spaces in email
      if (/\s/.test(e.key)) {
        e.preventDefault();
        setStatus(clientEmailInput, clientEmailError, false, 'Email address cannot contain spaces.');
      }
    });
  }

  function setStatus(input, errEl, isValid, message = '') {
    if (!input) return;
    const span = errEl ? errEl.querySelector('span') : null;

    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      if (errEl) errEl.classList.remove('active');
      if (span) span.textContent = '';
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      if (span) span.textContent = message;
      if (errEl) errEl.classList.add('active');
    }
  }

  function validateCoupleName(showError = true) {
    if (!coupleNameInput) return true;
    const val = coupleNameInput.value.trim();

    if (!val) {
      if (showError) setStatus(coupleNameInput, coupleNameError, false, 'Couple or planner name is required.');
      return false;
    }
    if (val.length < 3) {
      if (showError) setStatus(coupleNameInput, coupleNameError, false, 'Name must be at least 3 characters long.');
      return false;
    }
    if (/\d/.test(val)) {
      if (showError) setStatus(coupleNameInput, coupleNameError, false, 'Names cannot contain numbers. Please enter letters only.');
      return false;
    }
    // Must contain at least two letters (English or accented/international)
    if (!/[A-Za-zÀ-ÿ].*[A-Za-zÀ-ÿ]/.test(val)) {
      if (showError) setStatus(coupleNameInput, coupleNameError, false, 'Please enter a valid couple or planner name.');
      return false;
    }
    // Only letters, spaces, and &, ', -, ., ,, /, (, )
    const nameRegex = /^[A-Za-zÀ-ÿ\s&'.,/\-()]+$/;
    if (!nameRegex.test(val)) {
      if (showError) setStatus(coupleNameInput, coupleNameError, false, 'Only letters, spaces, &, -, /, and () are allowed.');
      return false;
    }

    setStatus(coupleNameInput, coupleNameError, true);
    return true;
  }

  function validateEmail(showError = true) {
    if (!clientEmailInput) return true;
    const val = clientEmailInput.value.trim();

    if (!val) {
      if (showError) setStatus(clientEmailInput, clientEmailError, false, 'Email address is required.');
      return false;
    }
    if (/\s/.test(val)) {
      if (showError) setStatus(clientEmailInput, clientEmailError, false, 'Email address cannot contain spaces.');
      return false;
    }
    if (!val.includes('@')) {
      if (showError) setStatus(clientEmailInput, clientEmailError, false, "Email address must include an '@' symbol.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) {
      if (showError) setStatus(clientEmailInput, clientEmailError, false, 'Please enter a valid email format (e.g. yourname@domain.com).');
      return false;
    }

    setStatus(clientEmailInput, clientEmailError, true);
    return true;
  }

  function validatePhone(showError = true) {
    if (!clientPhoneInput) return true;
    const val = clientPhoneInput.value.trim();

    if (!val) {
      if (showError) setStatus(clientPhoneInput, clientPhoneError, false, 'Phone or WhatsApp number is required.');
      return false;
    }
    if (/[a-zA-Z]/.test(val)) {
      if (showError) setStatus(clientPhoneInput, clientPhoneError, false, 'Phone number cannot contain letters.');
      return false;
    }

    const phoneCharsRegex = /^[\d\s+\-().]+$/;
    if (!phoneCharsRegex.test(val)) {
      if (showError) setStatus(clientPhoneInput, clientPhoneError, false, 'Only digits, spaces, and + - ( ) . are allowed.');
      return false;
    }

    const digitsOnly = val.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      if (showError) setStatus(clientPhoneInput, clientPhoneError, false, 'Phone number is too short (at least 7 digits required).');
      return false;
    }
    if (digitsOnly.length > 15) {
      if (showError) setStatus(clientPhoneInput, clientPhoneError, false, 'Phone number is too long (maximum 15 digits allowed).');
      return false;
    }

    setStatus(clientPhoneInput, clientPhoneError, true);
    return true;
  }

  function validateWeddingDate(showError = true) {
    if (!weddingDateInput) return true;
    const val = weddingDateInput.value.trim();

    if (!val) {
      if (showError) setStatus(weddingDateInput, weddingDateError, false, 'Wedding date is required.');
      return false;
    }

    const selectedDate = new Date(val + 'T00:00:00');
    if (isNaN(selectedDate.getTime())) {
      if (showError) setStatus(weddingDateInput, weddingDateError, false, 'Please enter a valid date.');
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      if (showError) setStatus(weddingDateInput, weddingDateError, false, 'Wedding date cannot be in the past. Please select an upcoming date.');
      return false;
    }

    const maxFuture = new Date();
    maxFuture.setFullYear(maxFuture.getFullYear() + 10);
    if (selectedDate > maxFuture) {
      if (showError) setStatus(weddingDateInput, weddingDateError, false, 'Please select a date within the next 10 years.');
      return false;
    }

    setStatus(weddingDateInput, weddingDateError, true);
    return true;
  }

  function validateVenue() {
    if (!weddingVenueInput) return true;
    const val = weddingVenueInput.value.trim();
    if (val && val.length > 0 && val.length < 2) {
      setStatus(weddingVenueInput, weddingVenueError, false, 'Venue name must be at least 2 characters.');
      return false;
    }
    setStatus(weddingVenueInput, weddingVenueError, true);
    return true;
  }

  // Interactive Live Validation Events
  if (coupleNameInput) {
    coupleNameInput.addEventListener('blur', () => validateCoupleName(true));
    coupleNameInput.addEventListener('input', () => {
      if (coupleNameInput.classList.contains('is-invalid') || coupleNameInput.value.length >= 3) {
        validateCoupleName(true);
      }
    });
  }

  if (clientEmailInput) {
    clientEmailInput.addEventListener('blur', () => validateEmail(true));
    clientEmailInput.addEventListener('input', () => {
      if (clientEmailInput.classList.contains('is-invalid') || clientEmailInput.value.includes('@')) {
        validateEmail(true);
      }
    });
  }

  if (clientPhoneInput) {
    clientPhoneInput.addEventListener('blur', () => validatePhone(true));
    clientPhoneInput.addEventListener('input', () => {
      if (clientPhoneInput.classList.contains('is-invalid') || clientPhoneInput.value.replace(/\D/g, '').length >= 7) {
        validatePhone(true);
      }
    });
  }

  if (weddingDateInput) {
    weddingDateInput.addEventListener('blur', () => validateWeddingDate(true));
    weddingDateInput.addEventListener('change', () => validateWeddingDate(true));
    weddingDateInput.addEventListener('input', () => validateWeddingDate(true));
  }

  if (weddingVenueInput) {
    weddingVenueInput.addEventListener('blur', validateVenue);
    weddingVenueInput.addEventListener('input', () => {
      if (weddingVenueInput.classList.contains('is-invalid')) validateVenue();
    });
  }

  // Range Slider & estimate calculation
  if (slider && countText) {
    slider.addEventListener('input', () => {
      const guests = parseInt(slider.value, 10);
      countText.textContent = `${guests} Guests / Favors`;
      updateEstimatedQuote();
    });
  }

  function updateEstimatedQuote() {
    if (!slider || !quoteEstimateDisplay) return;
    const guests = parseInt(slider.value, 10);
    const est = guests * 4.80;
    quoteEstimateDisplay.textContent = `~$${est.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  // Form submission with strict validation enforcement
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateCoupleName(true);
    const isEmailValid = validateEmail(true);
    const isPhoneValid = validatePhone(true);
    const isDateValid = validateWeddingDate(true);
    const isVenueValid = validateVenue();

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isDateValid || !isVenueValid) {
      // Find first invalid input and focus/shake it
      const firstInvalid = form.querySelector('.form-control.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.classList.remove('shake-field');
        void firstInvalid.offsetWidth; // Trigger reflow for animation restart
        firstInvalid.classList.add('shake-field');
      }
      return;
    }

    const name = coupleNameInput.value.trim();
    const date = weddingDateInput.value;
    const guests = slider ? slider.value : '120';

    // Show charming confirmation popup
    showEnquirySuccessModal(name, date, guests);

    // Reset form and clear validation classes
    form.reset();
    form.querySelectorAll('.form-control').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid', 'shake-field');
    });
    form.querySelectorAll('.field-error-msg').forEach(el => {
      el.classList.remove('active');
    });

    if (slider && countText) {
      slider.value = 120;
      countText.textContent = '120 Guests / Favors';
      updateEstimatedQuote();
    }
  });
}

function showEnquirySuccessModal(name, date, guests) {
  let modal = document.querySelector('#enquirySuccessModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'enquirySuccessModal';
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 540px; text-align: center; padding: 45px 35px;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--color-blush); color: var(--color-gold); display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px auto;">
          <i class="fas fa-heart"></i>
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-display);">Thank You, ${name}!</h3>
        <p style="color: var(--color-muted); font-size: 0.95rem; margin-bottom: 24px; line-height: 1.7;">
          Your wedding favor consultation enquiry for <strong>${guests} favors</strong> has been received with delight! Our bespoke concierge will curate your personalized concept board and complimentary sample options within <strong>24 business hours</strong>.
        </p>
        <div style="background-color: var(--color-ivory); border: 1px dashed var(--color-gold); border-radius: var(--radius-sm); padding: 18px; margin-bottom: 26px; font-size: 0.85rem; color: var(--color-charcoal);">
          ✨ <strong>What's Next:</strong> Keep an eye on your inbox for your digital moodboard and wedding favor design portfolio.
        </div>
        <button class="btn btn-gold btn-pill" onclick="closeEnquirySuccessModal()" style="width: 100%;">Return to Boutique</button>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    modal.classList.add('active');
  }
}

window.closeEnquirySuccessModal = function() {
  const modal = document.querySelector('#enquirySuccessModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 400);
  }
};

/* ==========================================================================
   9. NEWSLETTER SUBSCRIPTION (STRICT EMAIL FORMAT VALIDATION)
   ========================================================================== */
function initNewsletterForm() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input) return;
      const email = input.value.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !emailRegex.test(email)) {
        showToast('Please enter a valid email format (e.g. yourname@domain.com).');
        input.focus();
        input.classList.add('is-invalid');
        return;
      }
      input.classList.remove('is-invalid');
      showToast('Thank you! Your 10% sample kit code is on its way.');
      input.value = '';
    });
  });
}

/* ==========================================================================
   10. TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-sparkles" style="color: var(--color-accent);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   11. PRODUCT DETAIL PAGE (PDP) INTERACTIVE ENGINE
   ========================================================================== */
const PDP_CATALOG = {
  'favor-card': {
    id: 'favor-card',
    sku: 'LAM-BOX-01',
    name: 'Bespoke Monogram Wedding Favor Box with Silk Ribbon & Custom Tag',
    category: 'Luxury Favor Boxes & Keepsakes',
    theme: 'Modern Luxe',
    basePrice: 5.25,
    moq: 30,
    rating: '5.0',
    reviewsCount: 168,
    badge: 'Bestseller ★ Hand-Tied Silk Ribbon',
    shortDesc: 'Handcrafted luxury rigid favor box featuring your personalized wedding monogram in hot-pressed metallic foil, tied with handmade crinkle silk chiffon ribbon and a bespoke escort tag. The signature keepsake vessel for gourmet chocolates, macarons, or luxury bridal jewelry.',
    mainImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1577217534079-41d6bb68ac50?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80'
    ]
  },
  'favor-2': {
    id: 'favor-2',
    sku: 'LAM-HONEY-02',
    name: 'Pure Wildflower Honey Miniature Jars with Custom Label',
    category: 'Gourmet & Edibles',
    theme: 'Gourmet & Edible',
    basePrice: 5.25,
    moq: 30,
    rating: '4.9',
    reviewsCount: 142,
    badge: 'Bestseller ★ 100% Raw Honey',
    shortDesc: 'Artisanal organic wildflower honey gathered from local sun-drenched apiaries, housed in miniature glass jars with gold twist lids. Finished with personalized guest label tags and hand-tied luxury cord bows.',
    mainImage: 'assets/images/wildflower-honey-jars.jpg',
    gallery: [
      'assets/images/wildflower-honey-jars.jpg',
      'assets/images/wedding-sweet-keepsake-jar.jpg',
      'assets/images/mini-champagne-favor.jpg',
      'assets/images/curated-sample-favor-box.jpg'
    ]
  },
  'favor-1': {
    id: 'favor-1',
    sku: 'LAM-CANDLE-01',
    name: 'Artisan Frosted Glass Botanical Scented Candle',
    category: 'Rustic & Boho',
    theme: 'Rustic & Boho',
    basePrice: 4.80,
    moq: 30,
    rating: '5.0',
    reviewsCount: 118,
    badge: 'Popular ★ Hand-Poured',
    shortDesc: 'Handcrafted 100% natural soy wax candle poured in frosted luxury glass, infused with bergamot, thyme, and white tea botanicals with custom matches and personalized crest.',
    mainImage: 'assets/images/artisan-frosted-soy-candle.jpg',
    gallery: [
      'assets/images/artisan-frosted-soy-candle.jpg',
      'assets/images/botanical-artisan-soap.jpg',
      'assets/images/engraved-wood-coasters.jpg',
      'assets/images/velvet-favor-pouches.jpg'
    ]
  },
  'favor-3': {
    id: 'favor-3',
    sku: 'LAM-BOX-03',
    name: 'Champagne Gold Glitter Keepsake Favor Box with Cord',
    category: 'Modern Luxe',
    theme: 'Modern Luxe',
    basePrice: 3.90,
    moq: 40,
    rating: '4.9',
    reviewsCount: 96,
    badge: 'Luxe Edition ★ Hot Stamped',
    shortDesc: 'Lustrous square gold glitter keepsake gift box tied with white satin cord, ideal for gourmet confectionery, custom macarons, or heirloom bridal jewelry.',
    mainImage: 'assets/images/champagne-gold-glitter-box.jpg',
    gallery: [
      'assets/images/champagne-gold-glitter-box.jpg',
      'assets/images/wax-sealed-macaron-box.jpg',
      'assets/images/crimson-velvet-ribbon-box.jpg',
      'assets/images/bespoke-bridal-keepsake-box.jpg'
    ]
  },
  'favor-4': {
    id: 'favor-4',
    sku: 'LAM-KEY-04',
    name: 'Antique Brass Key Bottle Opener & Escort Tag',
    category: 'Vintage Glamour',
    theme: 'Vintage Glamour',
    basePrice: 4.10,
    moq: 30,
    rating: '4.8',
    reviewsCount: 84,
    badge: 'Heirloom Keepsake',
    shortDesc: 'Solid vintage brass skeleton key bottle opener tied to letterpress escort cards with pure silk chiffon ribbon.',
    mainImage: 'assets/images/antique-key-bottle-opener.jpg',
    gallery: [
      'assets/images/antique-key-bottle-opener.jpg',
      'assets/images/groomsmen-flask-gift-set.jpg',
      'assets/images/engraved-wood-coasters.jpg',
      'assets/images/banquet-table-place-favors.jpg'
    ]
  }
};

function initProductDetailPage() {
  const pdpWrapper = document.querySelector('.pdp-section');
  if (!pdpWrapper) return; // Only execute on product detail page

  // Check URL query param ?id=favor-X (defaults to wedding card suite)
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 'favor-card';
  const currentProduct = PDP_CATALOG[productId] || PDP_CATALOG['favor-card'];

  // Elements
  const mainImg = document.getElementById('pdpMainImg');
  const thumbBtns = document.querySelectorAll('.pdp-thumb-btn');
  const titleElem = document.getElementById('pdpTitle');
  const skuElem = document.getElementById('pdpSku');
  const badgeElem = document.getElementById('pdpBadge');
  const descElem = document.getElementById('pdpDesc');
  const unitPriceElem = document.getElementById('pdpUnitPrice');
  const tierBoxes = document.querySelectorAll('.pdp-tier-box');
  const qtyInput = document.getElementById('pdpQtyInput');
  const qtyMinusBtn = document.getElementById('pdpQtyMinus');
  const qtyPlusBtn = document.getElementById('pdpQtyPlus');
  const liveTotalElem = document.getElementById('pdpLiveTotal');
  const liveSavingsElem = document.getElementById('pdpLiveSavings');

  // Customizer Inputs
  const coupleNamesInput = document.getElementById('pdpCoupleNames');
  const eventDateInput = document.getElementById('pdpEventDate');
  const monogramInput = document.getElementById('pdpMonogram');
  const foilSwatches = document.querySelectorAll('.pdp-foil-swatch');
  const ribbonSwatches = document.querySelectorAll('.pdp-ribbon-swatch');
  const selectedFoilLabel = document.getElementById('pdpSelectedFoil');
  const selectedRibbonLabel = document.getElementById('pdpSelectedRibbon');

  // Tag Preview
  const tagMonogram = document.getElementById('pdpTagMonogram');
  const tagNames = document.getElementById('pdpTagNames');
  const tagDate = document.getElementById('pdpTagDate');

  // Action Buttons
  const addWishlistBtn = document.getElementById('pdpAddWishlistBtn');
  const orderSampleBtn = document.getElementById('pdpOrderSampleBtn');
  const requestQuoteBtn = document.getElementById('pdpRequestQuoteBtn');

  // Tab Triggers
  const tabTriggers = document.querySelectorAll('.pdp-tab-trigger');
  const tabContents = document.querySelectorAll('.pdp-tab-content');

  // Populate product info if different from default template
  if (currentProduct) {
    if (titleElem) titleElem.textContent = currentProduct.name;
    if (skuElem) skuElem.textContent = `${currentProduct.category} • SKU: ${currentProduct.sku}`;
    if (badgeElem) badgeElem.textContent = currentProduct.badge;
    if (descElem) descElem.textContent = currentProduct.shortDesc;
    if (mainImg) mainImg.src = currentProduct.mainImage;
    if (thumbBtns.length > 0 && currentProduct.gallery) {
      thumbBtns.forEach((btn, idx) => {
        if (currentProduct.gallery[idx]) {
          btn.setAttribute('data-img', currentProduct.gallery[idx]);
          const img = btn.querySelector('img');
          if (img) img.src = currentProduct.gallery[idx];
        }
      });
    }
  }

  const basePrice = currentProduct ? currentProduct.basePrice : 5.25;

  // 1. Gallery Thumbnail Switcher
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const targetSrc = btn.getAttribute('data-img');
      if (mainImg && targetSrc) {
        mainImg.style.opacity = '0.3';
        mainImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });

  // 2. Pricing & Tier Calculations
  function calculatePricing(quantity) {
    let discount = 0;
    let tierKey = '30-49';

    if (quantity >= 500) {
      discount = 0.25;
      tierKey = '500+';
    } else if (quantity >= 250) {
      discount = 0.18;
      tierKey = '250-499';
    } else if (quantity >= 100) {
      discount = 0.12;
      tierKey = '100-249';
    } else if (quantity >= 50) {
      discount = 0.05;
      tierKey = '50-99';
    } else {
      discount = 0;
      tierKey = '30-49';
    }

    const unitPrice = basePrice * (1 - discount);
    const totalPrice = unitPrice * quantity;
    const baseTotal = basePrice * quantity;
    const savings = baseTotal - totalPrice;

    return {
      discount,
      tierKey,
      unitPrice,
      totalPrice,
      savings
    };
  }

  function updatePricingUI() {
    let qty = parseInt(qtyInput.value) || 30;
    if (qty < 30) qty = 30;

    const calc = calculatePricing(qty);

    if (unitPriceElem) {
      unitPriceElem.textContent = `$${calc.unitPrice.toFixed(2)}`;
    }

    if (liveTotalElem) {
      liveTotalElem.textContent = `$${calc.totalPrice.toFixed(2)}`;
    }

    if (liveSavingsElem) {
      if (calc.savings > 0) {
        liveSavingsElem.innerHTML = `<span style="color: #0D7E84; font-weight: 600;">You save $${calc.savings.toFixed(2)} (${Math.round(calc.discount * 100)}% tier discount) + Free digital proof!</span>`;
      } else {
        liveSavingsElem.textContent = 'Complimentary luxury gift box packaging & digital proof included';
      }
    }

    // Highlight corresponding tier card
    tierBoxes.forEach(box => {
      const tierRange = box.getAttribute('data-tier');
      if (tierRange === calc.tierKey) {
        box.classList.add('active');
      } else {
        box.classList.remove('active');
      }
    });
  }

  // Tier Card Click Handler
  tierBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const minQty = parseInt(box.getAttribute('data-min')) || 30;
      if (qtyInput) {
        qtyInput.value = minQty;
        updatePricingUI();
      }
    });
  });

  // Quantity Counter Buttons
  if (qtyMinusBtn && qtyInput) {
    qtyMinusBtn.addEventListener('click', () => {
      let cur = parseInt(qtyInput.value) || 30;
      if (cur > 30) {
        qtyInput.value = cur - 10;
        if (parseInt(qtyInput.value) < 30) qtyInput.value = 30;
        updatePricingUI();
      }
    });
  }

  if (qtyPlusBtn && qtyInput) {
    qtyPlusBtn.addEventListener('click', () => {
      let cur = parseInt(qtyInput.value) || 30;
      qtyInput.value = cur + 10;
      updatePricingUI();
    });
  }

  if (qtyInput) {
    qtyInput.addEventListener('input', () => {
      updatePricingUI();
    });
  }

  // 3. Live Tag Personalization
  if (coupleNamesInput && tagNames) {
    coupleNamesInput.addEventListener('input', () => {
      tagNames.textContent = coupleNamesInput.value.trim() || 'Elena & Marcus';
    });
  }

  if (eventDateInput && tagDate) {
    eventDateInput.addEventListener('input', () => {
      tagDate.textContent = eventDateInput.value.trim() || 'October 24, 2026';
    });
  }

  if (monogramInput && tagMonogram) {
    monogramInput.addEventListener('input', () => {
      tagMonogram.textContent = (monogramInput.value.trim() || 'E & M').toUpperCase();
    });
  }

  // Foil Swatches
  foilSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      foilSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const foilName = swatch.getAttribute('data-foil') || 'Rubellite Rose Gold';
      const foilColor = swatch.getAttribute('data-color') || '#D93B58';
      if (selectedFoilLabel) selectedFoilLabel.textContent = foilName;
      if (tagMonogram) tagMonogram.style.color = foilColor;
    });
  });

  // Ribbon Swatches
  ribbonSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      ribbonSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const ribbonName = swatch.getAttribute('data-ribbon') || 'Champagne Chiffon';
      if (selectedRibbonLabel) selectedRibbonLabel.textContent = ribbonName;
    });
  });

  // 4. Tab Navigation
  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetTab = trigger.getAttribute('data-tab');
      tabTriggers.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      trigger.classList.add('active');
      const activeContent = document.getElementById(`tab-${targetTab}`);
      if (activeContent) activeContent.classList.add('active');
    });
  });

  // 5. Action Buttons & Cart Integration
  if (addWishlistBtn) {
    addWishlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const qty = parseInt(qtyInput ? qtyInput.value : 30) || 30;
      const calc = calculatePricing(qty);
      const couple = coupleNamesInput ? coupleNamesInput.value.trim() || 'Elena & Marcus' : 'Elena & Marcus';
      const foil = selectedFoilLabel ? selectedFoilLabel.textContent : 'Rose Gold Foil';

      addToWishlist({
        id: currentProduct.id,
        name: `${currentProduct.name} (${qty} pcs - ${foil})`,
        theme: currentProduct.theme,
        price: calc.unitPrice,
        image: currentProduct.mainImage,
        quantity: 1
      });

      // Open drawer to confirm
      const drawerOverlay = document.querySelector('.drawer-overlay');
      const drawerPanel = document.querySelector('.drawer-panel');
      if (drawerOverlay && drawerPanel) {
        drawerOverlay.classList.add('active');
        drawerPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (orderSampleBtn) {
    orderSampleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addToWishlist({
        id: `sample-${currentProduct.id}`,
        name: `Single Sample Box: ${currentProduct.name}`,
        theme: 'Physical Sample Kit',
        price: 9.50,
        image: currentProduct.mainImage,
        quantity: 1
      });

      const drawerOverlay = document.querySelector('.drawer-overlay');
      const drawerPanel = document.querySelector('.drawer-panel');
      if (drawerOverlay && drawerPanel) {
        drawerOverlay.classList.add('active');
        drawerPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (requestQuoteBtn) {
    requestQuoteBtn.addEventListener('click', (e) => {
      const qty = parseInt(qtyInput ? qtyInput.value : 100) || 100;
      window.location.href = `contact.html?favor=${encodeURIComponent(currentProduct.name)}&guests=${qty}`;
    });
  }

  // Initial calculation
  updatePricingUI();
}

