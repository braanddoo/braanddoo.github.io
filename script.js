const img=(name,alt,cls='')=>`<img class="${cls}" src="assets/${name}.webp" alt="${alt.replaceAll('"','&quot;')}" loading="lazy">`;
const brandStory=`<section class="brand-story" aria-label="Brand evolution"><div class="brand-section-head"><span class="eyebrow">01 / THE ORIGINAL IDENTITY</span><h2>It started with VTGZILLA.</h2><p>Inspired by a love of Godzilla, VTGZILLA was the first identity for my vintage clothing business. These original Logo 1 studies capture the brand's early personality and experimentation.</p></div><div class="brand-images"><figure>${img('vtg-concept','VTGZILLA original Logo 1 concept sketches')}<figcaption>Original VTGZILLA logo exploration</figcaption></figure><figure>${img('vtg-a','VTGZILLA Logo 1A development')}<figcaption>VTGZILLA logo development</figcaption></figure><figure>${img('vtg-b','VTGZILLA alternate Logo 1B development')}<figcaption>Alternate VTGZILLA treatment</figcaption></figure></div><div class="brand-section-head"><span class="eyebrow">02 / THE REBRAND</span><h2>A cleaner, more mature direction.</h2><p>Wanting a more refined name and identity, I transitioned the business to Wants & Needs. The Logo 2 explorations and finished applications below document that change.</p></div><div class="brand-images"><figure>${img('wn-concept','Wants and Needs Logo 2 concept')}<figcaption>Wants & Needs concept</figcaption></figure><figure>${img('wn-stamp','Wants and Needs stamped logo application')}<figcaption>Brand application</figcaption></figure><figure>${img('wn-in-hand','Wants and Needs hang tags held in hand')}<figcaption>Physical hang tags</figcaption></figure></div><div class="brand-section-head"><span class="eyebrow">03 / A YEAR IN MOTION</span><h2>A personal retrospective, frame by frame.</h2><p>To commemorate a year of the business, I illustrated and edited photos in Procreate, drew original elements, and painstakingly assembled the images into an animation. This is the original piece, presented as part of the brand's story.</p></div><div class="brand-video"><video controls playsinline preload="metadata" aria-label="Wants and Needs year in review animation"><source src="assets/wants-year-in-motion.mp4" type="video/mp4">Your browser does not support HTML5 video.</video><p class="video-caption">Original artwork, photo edits and frame-by-frame assembly by Brandon Mendibles.</p></div></section>`;

const leagueViewer = `
<section class="league-reader" aria-label="Read The League handbook">
  <div class="league-reader-heading">
    <div>
      <p class="eyebrow">THE COMPLETE PUBLICATION / FIVE PAGES</p>
      <h2>Inside The League.</h2>
      <p>Browse every page of the original handbook, or open the full-resolution PDF.</p>
    </div>
    <a class="league-pdf-link" href="assets/the-league-handybook.pdf" target="_blank" rel="noopener">OPEN FULL PDF ↗</a>
  </div>
  <div class="league-viewer" id="league-viewer">
    <button class="league-arrow" id="league-prev" type="button" aria-label="Previous page">←</button>
    <div class="league-page">
      <a id="league-fullpage" href="assets/league-page-1.webp" target="_blank" rel="noopener" aria-label="Open current page full size">
        <img id="league-page-image" src="assets/league-page-1.webp" alt="The League handbook, page 1 of 5" loading="lazy">
      </a>
    </div>
    <button class="league-arrow" id="league-next" type="button" aria-label="Next page">→</button>
  </div>
  <div class="league-reader-footer">
    <span id="league-page-count" aria-live="polite">PAGE 01 / 05</span>
    <div class="league-thumbnails" aria-label="Choose handbook page">
      ${Array.from({length:5}, (_,i)=>`<button type="button" class="league-thumb ${i===0?'active':''}" data-league-page="${i}" aria-label="Show page ${i+1}" aria-pressed="${i===0}"><img src="assets/league-page-${i+1}.webp" alt="" loading="lazy"></button>`).join('')}
    </div>
    <a href="assets/the-league-handybook.pdf" download="The-League-Handybook.pdf" class="league-download">DOWNLOAD PDF ↓</a>
  </div>
  <p class="league-hint">Use the arrows, page thumbnails, or left/right keyboard keys while viewing the handbook. Select a page to see it full size.</p>
</section>`;
function initLeagueViewer(){
  const root=document.getElementById('league-viewer');
  if(!root) return;
  let current=0;
  const image=document.getElementById('league-page-image');
  const link=document.getElementById('league-fullpage');
  const count=document.getElementById('league-page-count');
  const thumbs=[...document.querySelectorAll('[data-league-page]')];
  function show(index){
    current=(index+5)%5;
    const src=`assets/league-page-${current+1}.webp`;
    image.src=src;
    image.alt=`The League handbook, page ${current+1} of 5`;
    link.href=src;
    count.textContent=`PAGE ${String(current+1).padStart(2,'0')} / 05`;
    thumbs.forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-pressed',String(i===current));});
  }
  document.getElementById('league-prev').addEventListener('click',()=>show(current-1));
  document.getElementById('league-next').addEventListener('click',()=>show(current+1));
  thumbs.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.leaguePage))));
  document.addEventListener('keydown',e=>{
    if(!root.matches(':hover') && !root.contains(document.activeElement)) return;
    if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);}
    if(e.key==='ArrowRight'){e.preventDefault();show(current+1);}
  });
  let startX=null;
  root.addEventListener('touchstart',e=>{startX=e.touches[0].clientX;},{passive:true});
  root.addEventListener('touchend',e=>{
    if(startX===null)return;
    const delta=e.changedTouches[0].clientX-startX;
    if(Math.abs(delta)>50)show(current+(delta<0?1:-1));
    startX=null;
  },{passive:true});
}


const purrPressViewer = `
<section class="league-reader" aria-label="Browse Purrfect Defense press kit">
  <div class="league-reader-heading"><div><p class="eyebrow">THE COMPLETE PRESS KIT / FIVE PAGES</p><h2>Inside the Press Kit.</h2><p>Explore the original illustrated pitch, game features, and interface concepts.</p></div><a class="league-pdf-link" href="assets/purrfect-defense-press-kit.pdf" target="_blank" rel="noopener">OPEN FULL PDF ↗</a></div>
  <div class="league-viewer" id="purr-press-viewer"><button class="league-arrow" id="purr-press-prev" type="button" aria-label="Previous page">←</button><div class="league-page"><a id="purr-press-fullpage" href="assets/purr-press-page-1.webp" target="_blank" rel="noopener" aria-label="Open current page full size"><img id="purr-press-page-image" src="assets/purr-press-page-1.webp" alt="Purrfect Defense press kit, page 1 of 5" loading="lazy"></a></div><button class="league-arrow" id="purr-press-next" type="button" aria-label="Next page">→</button></div>
  <div class="league-reader-footer"><span id="purr-press-page-count" aria-live="polite">PAGE 01 / 05</span><div class="league-thumbnails" aria-label="Choose press kit page">${Array.from({length:5},(_,i)=>`<button type="button" class="league-thumb ${i===0?'active':''}" data-purr-press-page="${i}" aria-label="Show page ${i+1}" aria-pressed="${i===0}"><img src="assets/purr-press-page-${i+1}.webp" alt="" loading="lazy"></button>`).join('')}</div><a href="assets/purrfect-defense-press-kit.pdf" download="Purrfect-Defense-Press-Kit.pdf" class="league-download">DOWNLOAD PDF ↓</a></div>
  <p class="league-hint">Use the arrows, thumbnails, or swipe to browse. Click the page to view it full size.</p>
</section>`;
function initPurrPressViewer(){
 const root=document.getElementById('purr-press-viewer');if(!root)return;
 let current=0;const image=document.getElementById('purr-press-page-image');const link=document.getElementById('purr-press-fullpage');const count=document.getElementById('purr-press-page-count');const thumbs=[...document.querySelectorAll('[data-purr-press-page]')];
 function show(index){current=(index+5)%5;const src=`assets/purr-press-page-${current+1}.webp`;image.src=src;image.alt=`Purrfect Defense press kit, page ${current+1} of 5`;link.href=src;count.textContent=`PAGE ${String(current+1).padStart(2,'0')} / 05`;thumbs.forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-pressed',String(i===current));});}
 document.getElementById('purr-press-prev').addEventListener('click',()=>show(current-1));document.getElementById('purr-press-next').addEventListener('click',()=>show(current+1));thumbs.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.purrPressPage))));
 document.addEventListener('keydown',e=>{if(!root.matches(':hover')&&!root.contains(document.activeElement))return;if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}});
 let startX=null;root.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});root.addEventListener('touchend',e=>{if(startX===null)return;const delta=e.changedTouches[0].clientX-startX;if(Math.abs(delta)>50)show(current+(delta<0?1:-1));startX=null},{passive:true});
}

const projects=[
{id:'wants',title:'VTGZILLA → Wants & Needs',type:'BRAND EVOLUTION / APPAREL',year:'01',cover:'wants-cover',images:['wants-detail','wants-logo','wants-concept','wants-tag'],subtitle:'From a playful vintage shop identity to a cleaner, more mature brand.',description:'I founded a vintage clothing business under the name VTGZILLA, inspired by my love of Godzilla. As the business evolved, I wanted its name and visual identity to feel cleaner and more mature. I independently conceived and produced the rebrand as Wants & Needs, including logo explorations, brand applications, and physical hang tags.',role:'Founder, creative director, designer and animator',tools:'Illustrator, Procreate, Photoshop',note:'All logo concepts, illustrations, and finished branding were created from scratch.'},
{id:'market',title:'Vintage Market',type:'EVENT PROMOTION / PRINT',year:'02',cover:'market-cover',images:['market-2','market-3','market-4'],subtitle:'Promotional graphics for real-world vintage events.',description:'A selection of event flyers and promotional materials created to communicate event details while building a distinctive visual atmosphere.',role:'Graphic designer',tools:'Illustrator, Photoshop',note:'A collection of event promotions; individual event context can be added as the case study develops.'},
{id:'league',title:'The League',type:'EDITORIAL / VISUAL IDENTITY',year:'03',cover:'league-cover',images:[],subtitle:'A sports-inspired visual system for a classroom.',description:'An original classroom identity and reward system inspired by retro sports magazines. The project combines editorial design, information hierarchy, and a recurring visual language.',role:'Creative direction, design, writing',tools:'Photoshop, Illustrator; editorial design and layout',note:'The featured image is the opening page of the original handbook.'},
{id:'sports',title:'Selected Sports Posters',type:'POSTER DESIGN / COMPOSITING',year:'04',cover:'sports-cover',images:['sports-2','sports-3'],subtitle:'High-energy compositions inspired by sports culture.',description:'A selection of original poster designs, inspired by vintage posters, exploring composition, typography, imagery, and dramatic visual hierarchy.',role:'Graphic designer',tools:'Illustrator, Photoshop',note:'posters were all created with a combination of Illustrator and Photoshop.'},
{id:'systems',title:'Systems Offline',type:'GAME CONCEPT / WORLD BUILDING',year:'05',cover:'systems-cover',images:['systems-2','systems-3'],subtitle:'A solo science-fiction horror game concept.',description:'A self-directed game concept exploring an isolated mining operation, corporate power, and atmospheric horror. I developed the concept, writing, and presentation independently.',role:'Sole creator',tools:'Procreate; game concept development and visual presentation',note:'This is a concept project, not a claim of a released playable game.',link:'https://sites.google.com/arizona.edu/systems-offline-game251final/identificationcontext?read_current=1'},
{id:'dark',title:'In The Dark',type:'UNITY / INTERACTIVE EXPERIENCE',year:'06',cover:'dark-cover',images:['dark-2','dark-3'],subtitle:'An atmospheric horror experience built in Unity.',description:'A solo game project combining environment mood, gameplay systems, and interactive presentation.',role:'Solo developer',tools:'Unity, VSCode',note:'Visit the playable project page for further details.',link:'https://braanddoo.itch.io/in-the-dark'},
{id:'litter',title:'Litter Boxing',type:'GAME ART / COLLABORATIVE DESIGN',year:'07',cover:'litter-cover',images:['litter-2','litter-3'],subtitle:'Game art and mechanics for a collaborative concept.',description:'For this team project, I created the artwork shown here, designed the controls, and contributed to parts of the mechanics section.',role:'Game artist; controls and mechanics contributor',tools:'Procreate; digital art and game design',note:'Other parts of the team project were created collaboratively.',link:'https://sites.google.com/arizona.edu/litter-boxing/identificationcontext'},
{id:'purr',title:'Purrfect Defense',type:'GAME ART / UI',year:'08',cover:'purr-cover',images:['purr-2', 'purr-3', 'purr-4', 'purr-5'],subtitle:'An original game project, from concept and artwork to the finished experience.',description:'I independently created Purrfect Defense, including its original game concept, artwork, and interface visuals. This case study showcases the project’s playful art direction and game design.',role:'Sole creator, game designer and artist',tools:'Procreate, Photoshop; game art and UI',note:'All project work was created independently.'}
];
// Display every project as an equal-sized tile on the homepage.
const grid = document.getElementById('project-grid');
if (grid) {
  grid.innerHTML = projects.map(p => `
    <a class="project-card" href="project.html?id=${p.id}">
      <div class="card-image">
        ${img(p.cover, p.title + ' project image')}
        <span class="card-arrow">↗</span>
      </div>
      <div class="card-title"><h3>${p.title}</h3><span>${p.year}</span></div>
      <p>${p.type}</p>
    </a>
  `).join('');
}

const content=document.getElementById('project-content');if(content){const id=new URLSearchParams(location.search).get('id');const p=projects.find(x=>x.id===id);if(!p){content.innerHTML='<h1>Project not found.</h1><p><a href="index.html#work">Return to work →</a></p>'}else{document.title=p.title+' | Brandon Mendibles';content.innerHTML=`<a class="back-link" href="index.html#work">← ALL PROJECTS</a><div class="project-head"><p class="eyebrow">${p.type}</p><h1>${p.title}<span class="period">.</span></h1><p class="project-subtitle">${p.subtitle}</p></div><div class="project-hero">${img(p.cover,p.title+' featured project artwork')}</div><div class="project-info"><div><p class="eyebrow">THE PROJECT</p><h2>Overview</h2><p>${p.description}</p><p class="project-note">${p.note}</p>${p.link?`<a class="text-link" href="${p.link}" target="_blank" rel="noopener">VISIT ORIGINAL PROJECT ↗</a>`:''}</div><aside><p class="eyebrow">MY ROLE</p><p>${p.role}</p><p class="eyebrow">TOOLS / DISCIPLINES</p><p>${p.tools}</p></aside></div>${p.id==='wants'?brandStory:''}${p.id==='league'?leagueViewer:''}${p.id==='purr'?purrPressViewer:''}${p.images.length?`<div class="project-gallery">${p.images.map((x,i)=>img(x,p.title+' additional design '+(i+1))).join('')}</div>`:''}<a class="next-link" href="index.html#work">← BACK TO ALL WORK</a>`}}
initLeagueViewer();
initPurrPressViewer();
document.querySelectorAll('#year').forEach(e=>e.textContent=new Date().getFullYear());
