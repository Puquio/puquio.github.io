(() => {
  const photoA = document.getElementById('heroPhoto');
  const photoB = document.getElementById('heroPhotoNext');
  const caption = document.getElementById('heroCaption');
  const dotsBox = document.getElementById('heroDots');
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  const pause = document.getElementById('heroPause');
  if (!photoA || !photoB || !dotsBox || !caption) return;

  const slides = [
    {
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Estatua%20de%20Jose%20Mar%C3%ADa%20Arguedas%20en%20la%20Plaza%20Mayor%20de%20Puquio%20junto%20a%20la%20catedral.jpg?width=2200",
      text: "Plaza de Armas de Puquio",
      alt: "Plaza Mayor de Puquio junto a la catedral"
    },
    {
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Plaza%20Yawar%20Fiesta%20en%20el%20barrio%20de%20Pichccachuri.jpg?width=2200",
      text: "Tradición y celebración en Puquio",
      alt: "Plaza Yawar Fiesta en el barrio de Pichccachuri"
    },
    {
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Catedral%20de%20Puquio%2001.jpg?width=2200",
      text: "Historia y arquitectura religiosa",
      alt: "Catedral de Puquio"
    },
    {
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Vista%20panor%C3%A1mica%20a%20la%20ciudad%20de%20Puquio.jpg?width=2200",
      text: "Puquio y sus paisajes andinos",
      alt: "Vista panorámica de la ciudad de Puquio"
    }
  ];

  let current = 0;
  let timer = null;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = photoA;
  let inactive = photoB;
  const duration = 5200;

  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Mostrar fotografía ' + (i + 1));
    dot.addEventListener('click', () => show(i));
    dotsBox.appendChild(dot);
  });
  const dots = [...dotsBox.querySelectorAll('.hero-dot')];

  function show(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    inactive.style.backgroundImage = `url("${slide.image}")`;
    inactive.style.opacity = '0';
    inactive.style.zIndex = '2';
    active.style.zIndex = '1';
    inactive.offsetWidth;
    inactive.style.opacity = '1';
    active.style.opacity = '0';
    const old = active;
    active = inactive;
    inactive = old;
    active.setAttribute('aria-label', slide.alt);
    caption.textContent = slide.text;
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === current ? 'true' : 'false'));
    restart();
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function start() { stop(); if (!paused) timer = setInterval(() => show(current + 1), 9000); }
  function restart() { if (!paused) start(); }

  active.style.backgroundImage = `url("${slides[0].image}")`;
  active.style.opacity = '1';
  active.style.zIndex = '2';
  inactive.style.opacity = '0';
  dots[0].setAttribute('aria-current','true');
  prev?.addEventListener('click', () => show(current - 1));
  next?.addEventListener('click', () => show(current + 1));
  pause?.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? 'Reanudar' : 'Pausar';
    pause.setAttribute('aria-pressed', String(paused));
    paused ? stop() : start();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  start();
})();
