const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const navToggle = $('.nav-toggle');
const navLinks = $('#nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

$$('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    const cover = $('.book-cover', card);
    if (cover) cover.style.transform = `perspective(800px) rotateX(${y*-7}deg) rotateY(${x*8}deg)`;
  });
  card.addEventListener('pointerleave', () => {
    const cover = $('.book-cover', card);
    if (cover) cover.style.transform = '';
  });
});

const storyCards = $$('.story-card');
const tabs = $$('.tab');
const search = $('#storySearch');
function filterStories() {
  const active = $('.tab.active')?.dataset.filter || 'all';
  const q = (search.value || '').toLowerCase().trim();
  let visible = 0;
  storyCards.forEach(card => {
    const okCat = active === 'all' || card.dataset.category === active;
    const okText = !q || `${card.dataset.title} ${card.textContent}`.toLowerCase().includes(q);
    card.hidden = !(okCat && okText);
    if (!card.hidden) visible++;
  });
  $('#storyEmpty').hidden = visible !== 0;
}
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); filterStories();
}));
search.addEventListener('input', filterStories);

const stories = {
  moon: {title:'The Moon Keeps Letters', body:`<p>Some nights, I imagine the moon is an old post office.</p><p>It receives all the letters we never sent: the apology folded into a drawer, the confession hidden behind a book, the “I miss you” typed and deleted at 2:13 a.m.</p><p>Perhaps that is why moonlight feels gentle. It knows what it means to hold a secret without asking for an explanation.</p>`},
  post: {title:'The Post Office at 7 PM', body:`<p>At seven, the post office smelled of rain, paper and someone's jasmine perfume.</p><p>She arrived with one envelope and a promise to herself that she would not turn around.</p><p>Someone behind the counter said, “Still time.” So she smiled, paid for the stamp, and let the letter leave her hands.</p>`},
  letters: {title:'Why I Still Write Letters', body:`<p>Writing a letter asks us to slow down enough to notice our own handwriting.</p><p>There is something wonderfully imperfect about ink: the pressure changes, a word leans, a thought gets crossed out and rewritten. A letter carries evidence that a person sat somewhere and thought of you.</p><p>Maybe that is the whole magic.</p>`},
  book: {title:'A Book I Carried Home', body:`<p>I finished the last page and did not immediately close the book.</p><p>Some books end when the story ends. Others keep opening themselves in your mind while you make tea, wait for the bus, or look out of a window.</p><p>This was the second kind.</p>`}
};
const reader = $('#readerModal');
const readerContent = $('#readerContent');
$$('.reader-btn').forEach(btn => btn.addEventListener('click', () => {
  const s = stories[btn.dataset.story];
  readerContent.innerHTML = `<h2>${s.title}</h2>${s.body}`;
  reader.showModal();
}));
$$('[data-close]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
$('#readerTheme').addEventListener('click', () => reader.classList.toggle('reader-dark'));

$$('.magazine-btn').forEach(btn => btn.addEventListener('click', () => {
  const src = btn.dataset.src;
  if (!src || src.includes('YOUR_')) {
    showToast('Add your Heyzine or PDF URL in the HTML first.');
    return;
  }
  $('#magFrame').src = src;
  $('#magModal').showModal();
}));

const upi = $('#upiId').textContent.trim();
$('#copyUpi').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(upi);
    showToast('UPI ID copied ✦');
  } catch { showToast('Copy failed — please select the UPI ID manually.'); }
});

const quotes = [
  'A story is a room you can return to.',
  'Write the sentence you wish someone had sent you.',
  'Small letters can carry very large feelings.',
  'Keep a little sunlight between the pages.',
  'Somewhere, a future reader is waiting for your words.',
  'Let your unfinished thoughts breathe.'
];
let quoteIndex = Math.floor(Math.random()*quotes.length);
function renderQuote(){ $('#quote').textContent = quotes[quoteIndex]; }
$('#newQuote').addEventListener('click', () => { quoteIndex=(quoteIndex+1)%quotes.length; renderQuote(); });
renderQuote();
$('#year').textContent = new Date().getFullYear();

let toastTimer;
function showToast(text) {
  const toast = $('#toast');
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
