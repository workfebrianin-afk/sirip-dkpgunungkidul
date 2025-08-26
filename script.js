// app.js — module
script.async = true;
document.head.appendChild(script);


window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments)}
gtag('js', new Date());
gtag('config', id);
console.log('GA4 enabled', id);
}
}catch(e){console.warn('GA init failed', e)}
}


function render(){
const out = el('#content');
out.innerHTML = '';
const categories = state.data?.categories || [];


categories.forEach(cat => {
// filter links by query
const filtered = cat.links.filter(l => matchesQuery(l));
if(filtered.length === 0) return;


const section = createEl('section',{class:'category','aria-label': cat[`title_${state.lang}`]});
const h = createEl('h2',{}, cat[`title_${state.lang}`]);
section.appendChild(h);


if(state.view === 'grid'){
const grid = createEl('div',{class:'grid'});
filtered.forEach(link => grid.appendChild(cardFor(link)));
section.appendChild(grid);
}else{
const list = createEl('div',{class:'list'});
filtered.forEach(link => list.appendChild(listItemFor(link)));
section.appendChild(list);
}


out.appendChild(section);
});
}


function matchesQuery(link){
if(!state.query) return true;
const q = state.query;
const fields = [link[`title_${state.lang}`], link[`desc_${state.lang}`] || '', link.title_id, link.title_en];
return fields.join(' ').toLowerCase().includes(q);
}


function cardFor(link){
const c = createEl('div',{class:'card'});
const iconWrap = createEl('div',{class:'icon'});
iconWrap.innerHTML = getIconSVG(link.icon);
c.appendChild(iconWrap);


const meta = createEl('div',{class:'meta'});
const title = createEl('h3',{},
