const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  }
});

const classButtons = document.querySelectorAll('.class-button');
classButtons.forEach(button => button.addEventListener('click', () => {
  classButtons.forEach(item => {
    const selected = item === button;
    item.classList.toggle('is-selected', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('#class-name').textContent = button.dataset.class;
  document.querySelector('#class-desc').textContent = button.dataset.desc;
  document.querySelector('#class-role').textContent = button.dataset.role;
}));

const dialog = document.querySelector('.play-dialog');
document.querySelectorAll('.play-trigger').forEach(button => button.addEventListener('click', () => {
  const status = dialog.querySelector('#gpu-status');
  status.textContent = 'gpu' in navigator
    ? 'WebGPU is available in this browser. The game still needs a compatible GPU adapter.'
    : 'WebGPU is not detected here. Try a current Chrome, Edge, or supported Safari browser.';
  dialog.showModal();
}));
dialog?.querySelectorAll('.dialog-close, .dialog-stay').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
