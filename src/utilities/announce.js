export const announce = msg => {
  const announcer = document.getElementById('announcer');
  const previous = announcer.children[0];
  if (previous !== undefined) {
    announcer.removeChild(previous);
  }
  const p = document.createElement('p');
  p.textContent = msg;
  announcer.appendChild(p);
};
