document.addEventListener('DOMContentLoaded', () => {
  // Floating navbar hide on scroll down / reveal on scroll up, scroll-spy, scroll-to-top visibility
  let lastScrollY = window.scrollY;
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const navIconLinks = document.querySelectorAll('.nav-icon-link');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      if (navbarWrapper) navbarWrapper.classList.add('nav-hidden');
    } else if (navbarWrapper) {
      navbarWrapper.classList.remove('nav-hidden');
    }
    lastScrollY = currentScrollY;

    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', currentScrollY > 300);
    }

    navIconLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      const top = target.offsetTop;
      const height = target.offsetHeight;
      if (currentScrollY >= top - 120 && currentScrollY < top + height - 120) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Dark mode toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('minimal-theme') || 'light';

  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
    localStorage.setItem('minimal-theme', theme);
  }

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Copy-to-clipboard for code blocks
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const codeEl = document.getElementById(btn.getAttribute('data-target'));
      if (!codeEl) return;
      navigator.clipboard.writeText(codeEl.textContent).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(() => { btn.textContent = original; }, 1800);
      });
    });
  });

  // Accessibility & display controls popover
  const a11yToggleBtn = document.getElementById('a11y-toggle-btn');
  const a11yPopover = document.getElementById('a11y-popover');
  const a11yCloseBtn = document.getElementById('a11y-close');

  if (a11yToggleBtn && a11yPopover) {
    a11yToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      a11yPopover.classList.toggle('active');
    });
  }
  if (a11yCloseBtn && a11yPopover) {
    a11yCloseBtn.addEventListener('click', () => a11yPopover.classList.remove('active'));
  }
  document.addEventListener('click', (e) => {
    if (a11yPopover && !a11yPopover.contains(e.target) && e.target !== a11yToggleBtn) {
      a11yPopover.classList.remove('active');
    }
  });

  const a11ySizeBtns = document.querySelectorAll('.a11y-btn');
  const savedFontSize = localStorage.getItem('minimal-fontsize') || 'default';

  function setFontSize(size) {
    document.documentElement.setAttribute('data-fontsize', size);
    a11ySizeBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-size') === size));
    localStorage.setItem('minimal-fontsize', size);
  }
  setFontSize(savedFontSize);
  a11ySizeBtns.forEach(btn => btn.addEventListener('click', () => setFontSize(btn.getAttribute('data-size'))));

  const underlineToggle = document.getElementById('underline-toggle');
  const savedUnderline = localStorage.getItem('minimal-underline') === 'true';

  function setUnderline(enabled) {
    if (enabled) {
      document.documentElement.setAttribute('data-underline', 'true');
    } else {
      document.documentElement.removeAttribute('data-underline');
    }
    if (underlineToggle) underlineToggle.checked = enabled;
    localStorage.setItem('minimal-underline', enabled ? 'true' : 'false');
  }
  setUnderline(savedUnderline);
  if (underlineToggle) underlineToggle.addEventListener('change', (e) => setUnderline(e.target.checked));

  const highcontrastToggle = document.getElementById('highcontrast-toggle');
  const savedHighcontrast = localStorage.getItem('minimal-highcontrast') === 'true';

  function setHighcontrast(enabled) {
    if (enabled) {
      document.documentElement.setAttribute('data-highcontrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-highcontrast');
    }
    if (highcontrastToggle) highcontrastToggle.checked = enabled;
    localStorage.setItem('minimal-highcontrast', enabled ? 'true' : 'false');
  }
  setHighcontrast(savedHighcontrast);
  if (highcontrastToggle) highcontrastToggle.addEventListener('change', (e) => setHighcontrast(e.target.checked));
});
