const resumeDialog = document.getElementById('resume-modal');
const resumeTrigger = document.getElementById('view-resume');
const resumeViewer = document.getElementById('resume-viewer');
let resumeBodyOverflow = '';
resumeTrigger.addEventListener('click', () => {
  resumeBodyOverflow = document.body.style.overflow;
  resumeViewer.src = resumeViewer.dataset.src;
  resumeDialog.showModal();
  resumeDialog.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  document.getElementById('close-resume').focus();
});
document.getElementById('close-resume').addEventListener('click', () => resumeDialog.close());
resumeDialog.addEventListener('click', event => {
  if (event.target !== resumeDialog) return;
  const rect = resumeDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) resumeDialog.close();
});
resumeDialog.addEventListener('close', () => {
  document.body.style.overflow = resumeBodyOverflow;
  resumeViewer.removeAttribute('src');
  resumeTrigger.focus({ preventScroll: true });
});
