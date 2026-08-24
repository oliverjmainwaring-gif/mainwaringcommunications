/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
document.addEventListener('DOMContentLoaded', function () {
  const isPro = true;
  const THEMES = ['classic', 'elegant'];
  const GAP = 10; // px gap between logo item and tooltip

  // ── Helper: detect template ──────────────────────────────────────
  function getTemplate(el) {
    for (const t of THEMES) {
      if ([`logo-carousel--${t}`, `logo-grid--${t}`, `logo-masonry--${t}`].some(cls => el.classList.contains(cls))) return t;
    }
    return 'free';
  }

  // ================================================================
  // TOOLTIP — position:fixed to escape overflow:hidden
  // ================================================================

  // Create ONE shared tooltip node appended to <body>
  const tooltip = document.createElement('div');
  tooltip.className = 'wlc-tooltip-bubble';
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.style.cssText = `
		position: fixed;
		z-index: 999999;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.18s ease, transform 0.18s ease;
		background: rgba(17,17,17,0.90);
		color: #fff;
		font-size: 12px;
		line-height: 1.5;
		padding: 7px 12px;
		border-radius: 6px;
		max-width: 220px;
		text-align: center;
		box-shadow: 0 4px 14px rgba(0,0,0,0.28);
		word-break: break-word;
	`;

  // Arrow element inside the bubble
  const arrow = document.createElement('span');
  arrow.className = 'wlc-tooltip-arrow';
  arrow.style.cssText = `
		position: absolute;
		width: 0;
		height: 0;
		border: 6px solid transparent;
	`;
  tooltip.appendChild(arrow);
  document.body.appendChild(tooltip);

  // Text span (so arrow stays separate)
  const tooltipText = document.createElement('span');
  tooltipText.className = 'wlc-tooltip-text';
  tooltip.insertBefore(tooltipText, arrow);
  let hideTimer = null;

  /**
   * Position the tooltip relative to the hovered item.
   * Uses getBoundingClientRect() → works with position:fixed → no overflow:hidden problem.
   *
   * @param {HTMLElement} item   — the .has-tooltip element
   * @param {string}      pos    — 'top' | 'bottom' | 'left' | 'right'
   */
  function positionTooltip(item, pos) {
    const r = item.getBoundingClientRect();
    const tw = tooltip.offsetWidth;
    const th = tooltip.offsetHeight;

    // Reset arrow styles
    arrow.style.cssText = `
			position: absolute;
			width: 0;
			height: 0;
			border: 6px solid transparent;
		`;
    let top, left;
    switch (pos) {
      case 'bottom':
        top = r.bottom + GAP;
        left = r.left + r.width / 2 - tw / 2;
        // Arrow points UP (triangle at top of tooltip, pointing toward item below it)
        arrow.style.top = '-12px';
        arrow.style.left = '50%';
        arrow.style.transform = 'translateX(-50%)';
        arrow.style.borderBottomColor = 'rgba(17,17,17,0.90)';
        tooltip.style.transformOrigin = 'top center';
        tooltip.style.transform = 'translateY(4px)';
        break;
      case 'left':
        top = r.top + r.height / 2 - th / 2;
        left = r.left - tw - GAP;
        // Arrow points RIGHT (triangle on right side of tooltip)
        arrow.style.top = '50%';
        arrow.style.right = '-12px';
        arrow.style.transform = 'translateY(-50%)';
        arrow.style.borderLeftColor = 'rgba(17,17,17,0.90)';
        tooltip.style.transformOrigin = 'right center';
        tooltip.style.transform = 'translateX(-4px)';
        break;
      case 'right':
        top = r.top + r.height / 2 - th / 2;
        left = r.right + GAP;
        // Arrow points LEFT (triangle on left side of tooltip)
        arrow.style.top = '50%';
        arrow.style.left = '-12px';
        arrow.style.transform = 'translateY(-50%)';
        arrow.style.borderRightColor = 'rgba(17,17,17,0.90)';
        tooltip.style.transformOrigin = 'left center';
        tooltip.style.transform = 'translateX(4px)';
        break;
      case 'top':
      default:
        top = r.top - th - GAP;
        left = r.left + r.width / 2 - tw / 2;
        // Arrow points DOWN (triangle at bottom of tooltip, pointing toward item above it)
        arrow.style.bottom = '-12px';
        arrow.style.left = '50%';
        arrow.style.transform = 'translateX(-50%)';
        arrow.style.borderTopColor = 'rgba(17,17,17,0.90)';
        tooltip.style.transformOrigin = 'bottom center';
        tooltip.style.transform = 'translateY(-4px)';
        break;
    }

    // Clamp to viewport so tooltip never goes off screen
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    left = Math.max(8, Math.min(left, vw - tw - 8));
    top = Math.max(8, Math.min(top, vh - th - 8));
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }
  function showTooltip(item) {
    clearTimeout(hideTimer);
    const text = item.getAttribute('data-tooltip');
    const pos = item.getAttribute('data-tooltip-position') || 'top';
    if (!text) return;
    tooltipText.textContent = text;
    tooltip.style.opacity = '0';
    tooltip.style.display = 'block';

    // Let the browser calculate dimensions first, then position
    requestAnimationFrame(() => {
      positionTooltip(item, pos);
      tooltip.style.opacity = '1';
      tooltip.style.transform += ' scale(1)';
    });
  }
  function hideTooltip() {
    tooltip.style.opacity = '0';
    hideTimer = setTimeout(() => {
      tooltip.style.display = 'none';
    }, 200);
  }

  // Attach hover events to all .has-tooltip items
  function initTooltips() {
    document.querySelectorAll('.has-tooltip[data-tooltip]:not(.tooltip-initialized)').forEach(item => {
      item.classList.add('tooltip-initialized');
      // Remove any inline .logo-tooltip bubble (was for fallback — we use the fixed one now)
      const inlineBubble = item.querySelector('.logo-tooltip');
      if (inlineBubble) inlineBubble.style.display = 'none';
      item.addEventListener('mouseenter', () => showTooltip(item));
      item.addEventListener('mouseleave', hideTooltip);
      // Reposition on scroll/resize in case layout shifts
      item.addEventListener('mousemove', () => {
        const pos = item.getAttribute('data-tooltip-position') || 'top';
        positionTooltip(item, pos);
      });
    });
  }

  // ================================================================
  // CAROUSEL
  // ================================================================
  document.querySelectorAll('.logo-carousel').forEach(carousel => {
    const track = carousel.querySelector('.logo-carousel__track');
    const duration = carousel.getAttribute('data-animation-duration') || 30;
    if (track) track.style.setProperty('--animation-duration', `${duration}s`);
  });

  // ================================================================
  // INIT TOOLTIPS — after all layout init
  // ================================================================
  initTooltips();

  // Reposition on window scroll / resize so tooltip follows correctly
  window.addEventListener('scroll', () => {
    const active = document.querySelector('.has-tooltip:hover');
    if (active) {
      const pos = active.getAttribute('data-tooltip-position') || 'top';
      positionTooltip(active, pos);
    }
  }, {
    passive: true
  });
  window.addEventListener('resize', () => {
    tooltip.style.opacity = '0';
  }, {
    passive: true
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map