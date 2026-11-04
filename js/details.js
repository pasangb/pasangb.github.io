// Read descriptions from the cards so the overview and detail view stay in sync.
const detailDialog = document.getElementById('detail-modal');
const detailContent = document.getElementById('detail-content');
const detailTitle = document.getElementById('detail-title');
let detailTrigger;
let previousBodyOverflow = '';
let disposeCADViewer;
let detailSession = 0;

function detailHeading(text) {
  const heading = document.createElement('h3');
  heading.textContent = text;
  return heading;
}

function openDetails(card, trigger) {
  detailSession += 1;
  const project = card.classList.contains('project-card');
  const lab = card.classList.contains('lab-card');
  const club = card.classList.contains('club-card');
  detailTrigger = trigger;
  detailTitle.textContent = card.querySelector('h3').textContent;
  document.getElementById('detail-eyebrow').textContent = lab ? 'From the learning lab' : project ? 'The quest, in detail' : club ? 'Clubs & leadership' : 'From the experience archive';
  detailContent.replaceChildren();

  const metadata = document.createElement('div');
  metadata.className = 'detail-metadata';
  const metadataSelectors = project ? '.project-type' : club ? '.role' : '.company, .date-badge';
  card.querySelectorAll(metadataSelectors).forEach(item => {
    const badge = document.createElement('span');
    badge.className = 'pill';
    badge.textContent = item.textContent;
    metadata.append(badge);
  });
  detailContent.append(metadata);
  if (card.dataset.orgDescription) {
    detailContent.append(detailHeading(club ? 'About the club' : 'About the organization'));
    const introduction = document.createElement('p');
    introduction.textContent = card.dataset.orgDescription;
    detailContent.append(introduction);
    if (card.dataset.orgUrl) {
      const website = document.createElement('a');
      website.className = 'modal-source';
      website.href = card.dataset.orgUrl;
      website.target = '_blank';
      website.rel = 'noopener noreferrer';
      website.textContent = 'Organization website \u2197';
      detailContent.append(website);
    }
  }
  detailContent.append(detailHeading(project ? 'About this project' : 'My contributions'));

  if (project) {
    detailContent.append(card.querySelector('.project-body > p').cloneNode(true));
    if (lab) detailContent.append(card.querySelector('.lab-actions').cloneNode(true));
  } else if (club) {
    detailContent.append(card.querySelector('.role + p').cloneNode(true));
  } else {
    detailContent.append(card.querySelector('.achievements').cloneNode(true));
  }

  const tags = card.querySelector('.project-tags, .card-footer');
  if (tags) {
    detailContent.append(detailHeading('Skills & tools'));
    const skills = document.createElement('div');
    skills.className = 'detail-skills';
    tags.querySelectorAll('.pill').forEach(tag => skills.append(tag.cloneNode(true)));
    detailContent.append(skills);
  }

  if (card.id === 'canoe-club') {
    detailContent.append(document.getElementById('canoe-gallery').content.cloneNode(true));
  }
  if (card.id === 'hack-chip-project') {
    detailContent.append(document.getElementById('hack-chip-details').content.cloneNode(true));
  }
  if (card.id === 'pipeline-lab') {
    detailContent.append(detailHeading('How it works'));
    detailContent.append(document.getElementById('pipeline-diagram').content.cloneNode(true));
  }
  if (card.id === 'posture-project') {
    detailContent.append(document.getElementById('posture-gallery').content.cloneNode(true));
  }
  if (card.id === 'solar-project') {
    detailContent.append(document.getElementById('solar-gallery').content.cloneNode(true));
  }
  if (card.id === 'buck-project') {
    detailContent.append(document.getElementById('buck-gallery').content.cloneNode(true));
  }

  previousBodyOverflow = document.body.style.overflow;
  detailDialog.showModal();
  document.body.style.overflow = 'hidden';
  detailDialog.scrollTop = 0;
}

detailContent.addEventListener('click', async event => {
  const loadButton = event.target.closest('[data-cad-load]');
  if (!loadButton) return;
  const panel = loadButton.closest('.cad-panel');
  const session = detailSession;
  const status = panel.querySelector('.cad-status');
  loadButton.disabled = true;
  loadButton.textContent = 'Loading model…';
  panel.querySelector('.cad-viewport').setAttribute('aria-busy', 'true');
  status.textContent = 'Preparing the interactive model…';
  try {
    const { mountCADViewer } = await import('./cad-viewer.js?v=2');
    const dispose = await mountCADViewer(panel);
    if (session !== detailSession || !detailDialog.open) dispose();
    else disposeCADViewer = dispose;
  } catch (error) {
    panel.querySelector('.cad-viewport').setAttribute('aria-busy', 'false');
    loadButton.disabled = false;
    loadButton.textContent = 'Try loading again';
    status.textContent = location.protocol === 'file:'
      ? 'The 3D viewer needs a local web server. Run python -m http.server 8000 in the website folder, then open http://localhost:8000.'
      : 'The 3D viewer could not load. Check that WebGL is enabled, or download the OBJ using the link below.';
    console.warn('CAD viewer:', error);
  }
});

document.querySelectorAll('.project-card, .experience-card, .club-card').forEach(card => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'detail-open';
  button.textContent = 'View full details ↗';
  button.setAttribute('aria-label', 'View details: ' + card.querySelector('h3').textContent);
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'detail-modal');

  const projectLink = card.querySelector('.project-bottom a');
  if (projectLink) projectLink.replaceWith(button);
  else (card.querySelector('.project-bottom, .club-emblem + div') || card).append(button);

  button.addEventListener('click', () => openDetails(card, button));
  card.classList.add('has-details');
  card.addEventListener('click', event => {
    if (event.target.closest('a, button') || window.getSelection()?.toString()) return;
    openDetails(card, button);
  });
});

detailDialog.querySelector('.detail-close').addEventListener('click', () => detailDialog.close());
detailDialog.addEventListener('click', event => {
  if (event.target !== detailDialog) return;
  const rect = detailDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) detailDialog.close();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && detailDialog.open) {
    event.preventDefault();
    detailDialog.close();
  }
});
detailDialog.addEventListener('close', () => {
  detailSession += 1;
  disposeCADViewer?.();
  disposeCADViewer = undefined;
  detailDialog.querySelectorAll('video').forEach(video => video.pause());
  document.body.style.overflow = previousBodyOverflow;
  detailTrigger?.focus({ preventScroll: true });
});
detailDialog.querySelector('.detail-contact').addEventListener('click', () => detailDialog.close());
