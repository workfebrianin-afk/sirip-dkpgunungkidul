async function loadLinks() {
  const res = await fetch('data/links.json');
  const data = await res.json();
  const container = document.getElementById('links-container');
  const search = document.getElementById('search');
  
  function render(filter='') {
    container.innerHTML = '';
    Object.keys(data).forEach(category => {
      let section = document.createElement('section');
      let title = document.createElement('h2');
      title.textContent = category;
      section.appendChild(title);
      data[category].forEach(link => {
        if (link.title.toLowerCase().includes(filter.toLowerCase())) {
          let card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `<a href="${link.url}" target="_blank" rel="noopener">
              ${link.title}</a><p>${link.desc || ''}</p>`;
          section.appendChild(card);
        }
      });
      container.appendChild(section);
    });
  }
  
  render();
  search.addEventListener('input', e => render(e.target.value));
}
document.addEventListener('DOMContentLoaded', loadLinks);