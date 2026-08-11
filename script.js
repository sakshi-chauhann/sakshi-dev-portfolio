// Cascading letter reveal for the hero name
  const nameText = "SAKSHI CHAUHAN";
  const nameEl = document.getElementById('animatedName');
  nameEl.textContent = '';
  let delay = 0;
  [...nameText].forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'letter' + (ch === ' ' ? ' space' : '');
    span.textContent = ch === ' ' ? '\u00A0' : ch;
    span.style.animationDelay = delay + 'ms';
    nameEl.appendChild(span);
    delay += 45;
  });
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  nameEl.appendChild(cursor);

  // Scroll-spy nav (desktop tabs + mobile menu links)
  const tabs = document.querySelectorAll('nav.tabs a, .mobile-menu a');
  const sectionIds = [...new Set([...tabs].map(t => t.getAttribute('href')))];
  const sections = sectionIds.map(id => document.querySelector(id));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = '#' + entry.target.id;
        tabs.forEach(t => t.classList.toggle('active', t.getAttribute('href') === id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => s && spy.observe(s));

  // Mobile hamburger menu
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burgerBtn.classList.toggle('open', open);
    burgerBtn.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal (progressive enhancement: only hide once JS confirms it can reveal)
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(el => el.classList.add('pre'));
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        entry.target.classList.remove('pre');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));