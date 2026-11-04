// Verified contact links from Pasang Bhote’s resume.
const CONTACT = { email: 'plb6363@nyu.edu', linkedin: 'https://www.linkedin.com/in/pasang-bhote/' };
document.getElementById('linkedin-link').href = CONTACT.linkedin;
document.getElementById('email-link').href = 'mailto:' + CONTACT.email;
document.getElementById('year').textContent = new Date().getFullYear();

const themeToggle = document.getElementById('theme-toggle');
let chosenSeason;
function syncAccent() {
  const selected = chosenSeason || document.querySelector('#season-menu [aria-pressed="true"]');
  if (!selected) return;
  document.documentElement.style.setProperty('--accent', document.documentElement.dataset.theme === 'dark' ? selected.dataset.glow : selected.dataset.accent);
}
function syncTheme() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  document.getElementById('theme-icon').textContent = dark ? '☀' : '☾';
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
  syncAccent();
}
themeToggle.addEventListener('click', () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', document.documentElement.dataset.theme); } catch (_) {}
  syncTheme();
});
syncTheme();
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
function closeNav() { navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
menuToggle.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

const seasonToggle = document.querySelector('.season-toggle');
const seasonMenu = document.getElementById('season-menu');
function closeSeason() { seasonMenu.hidden = true; seasonToggle.setAttribute('aria-expanded', 'false'); }
seasonToggle.addEventListener('click', () => { seasonMenu.hidden = !seasonMenu.hidden; seasonToggle.setAttribute('aria-expanded', String(!seasonMenu.hidden)); });
function applySeason(button) {
  chosenSeason = button; syncAccent();
  document.documentElement.style.setProperty('--glow', button.dataset.glow);
  document.getElementById('season-name').textContent = button.dataset.season;
  document.querySelector('.season-symbol').textContent = button.dataset.symbol;
  document.documentElement.dataset.season = button.dataset.season.toLowerCase();
  document.documentElement.style.setProperty('--season-start', button.dataset.start);
  document.documentElement.style.setProperty('--season-end', button.dataset.end);
  seasonToggle.setAttribute('aria-label', 'Season Switcher: ' + button.dataset.season);
  seasonMenu.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  try { localStorage.setItem('portfolio-season', button.dataset.season); } catch (_) {}
}
seasonMenu.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { applySeason(button); closeSeason(); seasonToggle.focus(); }));
try { const saved = localStorage.getItem('portfolio-season'); const choice = [...seasonMenu.querySelectorAll('button')].find(item => item.dataset.season === saved); applySeason(choice || seasonMenu.querySelector('[aria-pressed="true"]')); } catch (_) {}
document.addEventListener('click', event => { if (!event.target.closest('.season-wrap')) closeSeason(); if (!event.target.closest('.nav')) closeNav(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!seasonMenu.hidden) { closeSeason(); seasonToggle.focus(); } if (navLinks.classList.contains('open')) { closeNav(); menuToggle.focus(); } } });
const navItems = [...navLinks.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) navItems.forEach(link => { const current = link.hash === '#' + entry.target.id; link.classList.toggle('active', current); if (current) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

const expeditionData = {
  "bull-hill": {"title": "Bull Hill Full Loop", "location": "NY", "category": "Hikes", "photoSrc": "assets/expeditions/bull-hill/summer-river-view.jpg", "alt": "Summer view of the river and green mountain framed by trees.", "story": "I completed the Bull Hill Full Loop twice: once in winter and once in summer.", "spec": "Two hikes \u00b7 Winter & Summer", "galleryTitle": "Winter & Summer", "photos": [{"src": "assets/expeditions/bull-hill/summer-river-view.jpg", "alt": "Summer view of the river and green mountain framed by trees.", "caption": "Summer: river views through the trees", "width": 768, "height": 1024}, {"src": "assets/expeditions/bull-hill/summer-forest.jpg", "alt": "Sunlight filtering through the leafy summer forest on Bull Hill.", "caption": "Summer: sunlight on the forest trail", "width": 768, "height": 1024}, {"src": "assets/expeditions/bull-hill/winter-river-view.jpg", "alt": "Winter river and mountain view through bare trees.", "caption": "Winter: the river through bare branches", "width": 768, "height": 1024}, {"src": "assets/expeditions/bull-hill/winter-overlook.jpg", "alt": "Winter overlook above the river and town, framed by leafless branches.", "caption": "Winter: a pause at the overlook", "width": 768, "height": 1024}]},
  "mount-marcy": {"title": "Mount Marcy", "location": "NY", "category": "Hikes", "photoSrc": "assets/expeditions/mount-marcy/summit-view.jpg", "alt": "A stone cairn on the rocky summit with forested mountains stretching into the distance.", "story": "Mount Marcy was a very long and muddy hike. Here are a few moments from along the trail and at the summit.", "photos": [{"src": "assets/expeditions/mount-marcy/summit-view.jpg", "alt": "A stone cairn on the rocky summit with forested mountains stretching into the distance.", "caption": "The view from the summit", "width": 768, "height": 1024}, {"src": "assets/expeditions/mount-marcy/summit-plaque.jpg", "alt": "Mount Marcy summit plaque set into a lichen-covered rock.", "caption": "The summit plaque", "width": 768, "height": 1024}, {"src": "assets/expeditions/mount-marcy/valley-stream.jpg", "alt": "A stream winding through a green valley beneath forested mountains.", "caption": "A stream through the valley", "width": 768, "height": 1024}, {"src": "assets/expeditions/mount-marcy/rocky-cascade.jpg", "alt": "Water flowing across broad rock slabs with mountains beyond.", "caption": "Water over the rock slabs", "width": 768, "height": 1024}, {"src": "assets/expeditions/mount-marcy/forest-cascade.jpg", "alt": "A forest stream cascading around rocks beneath evergreen trees.", "caption": "Cascades in the forest", "width": 768, "height": 1024}, {"src": "assets/expeditions/mount-marcy/muddy-trail.jpg", "alt": "A muddy woodland trail crossed by a narrow path of logs.", "caption": "Logs across the muddy trail", "width": 768, "height": 1024}, {"src": "assets/expeditions/mount-marcy/woodland-stream.jpg", "alt": "Sunlight falling on a rocky stream surrounded by leafy forest.", "caption": "Sunlight on the woodland stream", "width": 768, "height": 1024}]},
  "ceiba": {"title": "Ceiba", "location": "Puerto Rico", "category": "Hikes", "photoSrc": "assets/expeditions/ceiba/forest-trail.jpg", "alt": "Hikers descending a narrow earthen trail through lush green forest in Ceiba, Puerto Rico.", "story": "A short and fun hike in Ceiba, Puerto Rico.", "photos": [{"src": "assets/expeditions/ceiba/forest-trail.jpg", "alt": "Hikers descending a narrow earthen trail through lush green forest in Ceiba, Puerto Rico.", "caption": "Along the forest trail", "width": 768, "height": 1024}]},
  "acatenango": {"title": "Acatenango Volcano", "location": "Guatemala", "category": "Hikes", "photoSrc": "assets/expeditions/acatenango/eruption-view.jpg", "alt": "A glowing volcanic eruption and ash plume viewed from the Acatenango hike.", "story": "It was really cold, but worth it. A few moments from my Acatenango volcano hike.", "photos": [{"src": "assets/expeditions/acatenango/eruption-view.jpg", "alt": "A glowing volcanic eruption and ash plume viewed from the Acatenango hike.", "caption": "An eruption across the ridge", "width": 768, "height": 1024}, {"src": "assets/expeditions/acatenango/volcano-golden-sky.jpg", "alt": "A volcanic peak framed by trees under a golden sky.", "caption": "Golden light over the volcano", "width": 768, "height": 1024}, {"src": "assets/expeditions/acatenango/vista-tres-volcanes.jpg", "alt": "Wooden welcome sign for Centro Turistico Vista Tres Volcanes.", "caption": "Vista Tres Volcanes", "width": 768, "height": 1024}, {"src": "assets/expeditions/acatenango/twilight-silhouette.jpg", "alt": "A volcanic silhouette beneath an orange horizon and deep blue sky.", "caption": "A quiet moment in the twilight", "width": 768, "height": 1024}, {"src": "assets/expeditions/acatenango/sun-above-clouds.jpg", "alt": "The sun on an orange horizon above a sea of clouds.", "caption": "Above the clouds", "width": 768, "height": 1024}]},
  "sams-point": {"title": "Sam's Point", "location": "NY", "category": "Hikes", "photoSrc": "assets/expeditions/sams-point/overlook.png", "alt": "Green forest stretching toward the horizon beneath sunlit clouds at Sam's Point", "story": "Waterfall views, forest overlooks, a bee hotel, and ducks by the water. A few moments from Sam's Point.", "photos": [{"src": "assets/expeditions/sams-point/overlook.png", "alt": "Green forest stretching toward the horizon beneath sunlit clouds at Sam's Point", "caption": "The forest overlook", "width": 1024, "height": 768}, {"src": "assets/expeditions/sams-point/waterfall.png", "alt": "Water falling down a layered rock cliff surrounded by green trees at Sam's Point", "caption": "Waterfall and rock faces", "width": 768, "height": 1024}, {"src": "assets/expeditions/sams-point/bee-hotel.png", "alt": "A wooden bee hotel filled with drilled blocks beside a garden at Sam's Point", "caption": "A bee hotel beside the trail", "width": 768, "height": 1024}, {"src": "assets/expeditions/sams-point/lakeside-ducks.png", "alt": "Two ducks resting on a rocky lakeshore under a blue sky at Sam's Point", "caption": "Ducks by the water", "width": 768, "height": 1024}]},
  "manhattan-bridge": {"title": "Manhattan Bridge", "location": "NYC", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/manhattan-bridge-sunset.jpg", "alt": "The skyline, bridge, and riverside traffic viewed from Manhattan Bridge beneath a cloud-filled sunset sky.", "story": "The skyline, bridge, and riverside traffic viewed from Manhattan Bridge beneath a cloud-filled sunset sky.", "photos": [{"src": "assets/expeditions/photographs/manhattan-bridge-sunset.jpg", "alt": "The skyline, bridge, and riverside traffic viewed from Manhattan Bridge beneath a cloud-filled sunset sky.", "caption": "Manhattan Bridge, NYC", "width": 1024, "height": 768}]},
  "ocean-park": {"title": "Ocean Park", "location": "San Juan", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/ocean-park.jpg", "alt": "Waves along the beach at Ocean Park beneath a pastel evening sky.", "story": "Waves along the beach at Ocean Park beneath a pastel evening sky.", "photos": [{"src": "assets/expeditions/photographs/ocean-park.jpg", "alt": "Waves along the beach at Ocean Park beneath a pastel evening sky.", "caption": "Ocean Park", "width": 768, "height": 1024}]} ,
  "boudha": {"title": "Boudha", "location": "Kathmandu, Nepal", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/boudha.jpg", "alt": "The white stupa at Boudha with colorful prayer flags beneath a cloudy blue sky.", "story": "Prayer flags and the white stupa at Boudha, in daylight and illuminated against the evening sky.", "photos": [{"src": "assets/expeditions/photographs/boudha.jpg", "alt": "The white stupa at Boudha with colorful prayer flags beneath a cloudy blue sky.", "caption": "Boudha in daylight", "width": 1024, "height": 768}, {"src": "assets/expeditions/photographs/boudha-evening.jpg", "alt": "Boudha stupa illuminated beneath a deep blue evening sky, with prayer flags stretching outward.", "caption": "Boudha in the evening", "width": 1024, "height": 768}], "galleryTitle": "Boudha, day & evening", "slider": true},
  "botanical-garden": {"title": "New York Botanical Garden", "location": "NYC", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/botanical-garden.jpg", "alt": "A reflecting pool surrounded by trees, flowers, and greenery at the New York Botanical Garden.", "story": "A reflecting pool surrounded by trees, flowers, and greenery at the New York Botanical Garden.", "photos": [{"src": "assets/expeditions/photographs/botanical-garden.jpg", "alt": "A reflecting pool surrounded by trees, flowers, and greenery at the New York Botanical Garden.", "caption": "New York Botanical Garden", "width": 768, "height": 1024}]},
  "cloud": {"title": "Cloud", "location": "", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/cloud.png", "alt": "Layered clouds rolling across a gray sky above green treetops.", "story": "Layered clouds rolling across a gray sky above green treetops.", "photos": [{"src": "assets/expeditions/photographs/cloud.png", "alt": "Layered clouds rolling across a gray sky above green treetops.", "caption": "Cloud", "width": 768, "height": 1024}]},
  "pokhara": {"title": "Pokhara", "location": "Nepal", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/pokhara.jpg", "alt": "A lake and mountain silhouettes beneath a blue evening sky in Pokhara.", "story": "A lake and mountain silhouettes beneath a blue evening sky in Pokhara.", "photos": [{"src": "assets/expeditions/photographs/pokhara.jpg", "alt": "A lake and mountain silhouettes beneath a blue evening sky in Pokhara.", "caption": "Pokhara", "width": 768, "height": 1024}]},
  "basantapur": {"title": "Basantapur Durbar Square", "location": "Nepal", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/basantapur.jpg", "alt": "A tiered temple and lively square beneath an evening sky at Basantapur Durbar Square.", "story": "A tiered temple and lively square beneath an evening sky at Basantapur Durbar Square.", "photos": [{"src": "assets/expeditions/photographs/basantapur.jpg", "alt": "A tiered temple and lively square beneath an evening sky at Basantapur Durbar Square.", "caption": "Basantapur Durbar Square", "width": 768, "height": 1024}]},
  "new-jersey": {"title": "New Jersey", "location": "New Jersey", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/new-jersey.jpg", "alt": "Sunset light reflected in water beside buildings and trees in New Jersey.", "story": "Sunset light reflected in water beside buildings and trees in New Jersey.", "photos": [{"src": "assets/expeditions/photographs/new-jersey.jpg", "alt": "Sunset light reflected in water beside buildings and trees in New Jersey.", "caption": "New Jersey", "width": 768, "height": 1024}]},
  "kandbari": {"title": "Kandbari", "location": "Nepal", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/kandbari.jpg", "alt": "Green terraced fields and boulders beneath forested mountains and clouds in Kandbari.", "story": "Green terraced fields and boulders beneath forested mountains and clouds in Kandbari.", "photos": [{"src": "assets/expeditions/photographs/kandbari.jpg", "alt": "Green terraced fields and boulders beneath forested mountains and clouds in Kandbari.", "caption": "Kandbari", "width": 768, "height": 1024}]},
  "darjeeling": {"title": "Darjeeling", "location": "India", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/darjeeling.jpg", "alt": "Dogs and pedestrians sharing a rain-darkened shopping street in Darjeeling.", "story": "Dogs and pedestrians sharing a rain-darkened shopping street in Darjeeling.", "photos": [{"src": "assets/expeditions/photographs/darjeeling.jpg", "alt": "Dogs and pedestrians sharing a rain-darkened shopping street in Darjeeling.", "caption": "Darjeeling", "width": 768, "height": 1024}]},
  "pittsburgh": {"title": "Pittsburgh", "location": "PA", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/pittsburgh.png", "alt": "Sunset glowing between city buildings in Pittsburgh.", "story": "Sunset glowing between city buildings in Pittsburgh.", "photos": [{"src": "assets/expeditions/photographs/pittsburgh.png", "alt": "Sunset glowing between city buildings in Pittsburgh.", "caption": "Pittsburgh", "width": 768, "height": 1024}]},
  "panajachel": {"title": "Panajachel", "location": "Guatemala", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/panajachel.jpg", "alt": "Boats on calm water beneath mountain silhouettes and a soft evening sky in Panajachel.", "story": "Boats on calm water beneath mountain silhouettes and a soft evening sky in Panajachel.", "photos": [{"src": "assets/expeditions/photographs/panajachel.jpg", "alt": "Boats on calm water beneath mountain silhouettes and a soft evening sky in Panajachel.", "caption": "Panajachel", "width": 1024, "height": 768}]},
  "delaware-river": {"title": "Delaware River", "location": "NY", "category": "Photographs", "photoSrc": "assets/expeditions/photographs/delaware-river.jpg", "alt": "Clouds and trees reflected in the calm Delaware River.", "story": "Clouds and trees reflected in the calm Delaware River.", "photos": [{"src": "assets/expeditions/photographs/delaware-river.jpg", "alt": "Clouds and trees reflected in the calm Delaware River.", "caption": "Delaware River", "width": 1024, "height": 768}]}
};
const expeditionCards = [...document.querySelectorAll('.expedition-card')];
const expeditionPageSize = 6;
let expeditionFilter = 'All';
let expeditionLimit = expeditionPageSize;
const showMoreExpeditions = document.getElementById('show-more-expeditions');
function renderExpeditions() {
  const matching = expeditionCards.filter(card => expeditionFilter === 'All' || card.dataset.category === expeditionFilter);
  expeditionCards.forEach(card => { card.hidden = true; });
  matching.slice(0, expeditionLimit).forEach(card => { card.hidden = false; });
  const shown = Math.min(expeditionLimit, matching.length);
  document.getElementById('expedition-count').textContent = `Showing ${shown} of ${matching.length} ${expeditionFilter === 'Photographs' ? 'photographs' : expeditionFilter === 'Hikes' ? 'hikes' : 'expeditions'}`;
  showMoreExpeditions.hidden = shown >= matching.length;
}
document.querySelectorAll('.filter-tab').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-tab').forEach(tab => tab.setAttribute('aria-pressed', String(tab === button)));
  expeditionFilter = button.dataset.filter;
  expeditionLimit = expeditionPageSize;
  renderExpeditions();
}));
showMoreExpeditions.addEventListener('click', () => {
  const matching = expeditionCards.filter(card => expeditionFilter === 'All' || card.dataset.category === expeditionFilter);
  const firstNewCard = matching[expeditionLimit];
  expeditionLimit += expeditionPageSize;
  renderExpeditions();
  firstNewCard?.focus({ preventScroll: true });
});
renderExpeditions();
const modal = document.getElementById('expedition-modal');
let lastExpedition;
let slidePhotos = [];
let slideIndex = 0;
const slideControls = document.getElementById('photo-slider-controls');
function showExpeditionSlide(index) {
  slideIndex = (index + slidePhotos.length) % slidePhotos.length;
  const photo = slidePhotos[slideIndex];
  const image = document.getElementById('modal-image');
  image.src = photo.src;
  image.alt = photo.alt;
  document.getElementById('modal-source').href = photo.src;
  document.getElementById('photo-slide-caption').textContent = `${photo.caption} (${slideIndex + 1} of ${slidePhotos.length})`;
  slideControls.querySelectorAll('[data-slide]').forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === slideIndex)));
}
document.getElementById('photo-slide-prev').addEventListener('click', () => showExpeditionSlide(slideIndex - 1));
document.getElementById('photo-slide-next').addEventListener('click', () => showExpeditionSlide(slideIndex + 1));
modal.addEventListener('keydown', event => {
  if (!slideControls.hidden && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    showExpeditionSlide(slideIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
document.querySelectorAll('[data-expedition]').forEach(card => card.addEventListener('click', () => {
  const data = expeditionData[card.dataset.expedition]; lastExpedition = card;
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-location').textContent = '⌖ ' + data.location;
    document.getElementById('modal-location').hidden = !data.location;
  document.getElementById('modal-date').textContent = data.date || '';
  document.getElementById('modal-date').hidden = !data.date;
  document.getElementById('modal-category').textContent = data.category + (data.sample ? ' · Sample' : '');
  document.getElementById('modal-story').textContent = data.story;
  document.getElementById('modal-spec').textContent = data.spec || '';
  document.getElementById('modal-spec').hidden = !data.spec;
  const photoUrl = data.photo ? 'https://images.unsplash.com/' + data.photo : null;
  const image = document.getElementById('modal-image'); image.src = data.photoSrc || photoUrl + '?auto=format&fit=max&w=2400&q=95'; image.alt = data.alt;
  const fullResolutionLink = document.getElementById('modal-source');
  if (data.placeholder) fullResolutionLink.removeAttribute('href');
  else fullResolutionLink.href = data.photoSrc || photoUrl + '?auto=format&q=100';
  document.getElementById('modal-source').hidden = !!data.placeholder;
  const gallery = document.getElementById('modal-gallery');
  gallery.replaceChildren();
  slidePhotos = data.slider ? data.photos : [];
  slideControls.hidden = !slidePhotos.length;
  const dots = document.getElementById('photo-slide-dots');
  dots.replaceChildren();
  if (slidePhotos.length) {
    slidePhotos.forEach((photo, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.dataset.slide = index;
      dot.setAttribute('aria-label', 'Show photo ' + (index + 1) + ': ' + photo.caption);
      dot.addEventListener('click', () => showExpeditionSlide(index));
      dots.append(dot);
    });
    showExpeditionSlide(0);
  }
  const galleryPhotos = data.slider ? [] : (data.photos || []).filter(photo => photo.src !== data.photoSrc);
    gallery.hidden = !galleryPhotos.length;
  modal.classList.toggle('has-gallery', !!data.photos?.length);
  if (galleryPhotos.length) {
    const heading = document.createElement('h3');
    heading.textContent = data.galleryTitle || 'Along the trail';
    gallery.append(heading);
    galleryPhotos.forEach(photo => {
      const figure = document.createElement('figure');
      const link = document.createElement('a');
      link.href = photo.src;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Open full-size photo: ' + photo.caption);
      const image = document.createElement('img');
      image.src = photo.src;
      image.alt = photo.alt;
      image.loading = 'lazy';
      image.width = photo.width;
      image.height = photo.height;
      const caption = document.createElement('figcaption');
      caption.textContent = photo.caption + ' · Select to open full size.';
      link.append(image);
      figure.append(link, caption);
      gallery.append(figure);
    });
  }
  modal.showModal(); document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.open) { event.preventDefault(); modal.close(); } });
modal.addEventListener('click', event => { if (event.target === modal) { const rect = modal.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close(); } });
modal.addEventListener('close', () => { document.body.style.overflow = ''; if (lastExpedition) lastExpedition.focus(); });
document.querySelectorAll('.photo-wrap img').forEach(img => img.addEventListener('error', () => { img.hidden = true; const fallback = document.createElement('span'); fallback.className = 'photo-fallback'; fallback.textContent = 'A moment worth keeping ✧'; img.parentElement.prepend(fallback); }, { once: true }));
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('form-status');
function updateContactDraft() {
  const values = new FormData(contactForm);
  const subject = '[Portfolio] ' + values.get('topic');
  const body = 'From: ' + values.get('name') + '\nEmail: ' + values.get('email') + '\n\n' + values.get('message');
  document.getElementById('gmail-compose').href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(CONTACT.email) + '&su=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}
contactForm.addEventListener('input', updateContactDraft);
contactForm.addEventListener('change', updateContactDraft);
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  updateContactDraft();
  const draftUrl = document.getElementById('gmail-compose').href;
  const draftWindow = window.open(draftUrl, '_blank');
  if (draftWindow) draftWindow.opener = null;
  contactStatus.dataset.state = 'pending';
  contactStatus.textContent = 'Your Gmail draft was requested. Review it and click Send in Gmail. If a new tab did not open, use the Open Gmail Draft link below. Your message stays here until you are done.';
});
