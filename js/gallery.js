// ── Photography ──
var PHOTOGRAPHY = [
  { src: 'assets/photos/yosemite-peaks.jpg', alt: 'Yosemite granite peaks through the trees' },
  { src: 'assets/photos/golden-hour-hills.jpg', alt: 'California hills at golden hour' },
  { src: 'assets/photos/bay-wetlands.jpg', alt: 'Bay wetlands with a lone tree' },
  { src: 'assets/photos/marshland-waterways.jpg', alt: 'Marshland waterways panorama' },
  { src: 'assets/photos/cherry-blossoms.jpg', alt: 'Cherry blossoms macro' },
  { src: 'assets/photos/nasturtium-macro.jpg', alt: 'Yellow nasturtium in sunlight' },
  { src: 'assets/photos/sunflower.jpg', alt: 'Sunflower against blue sky' },
  { src: 'assets/photos/tidal-pools.jpg', alt: 'Mossy tidal pools' },
];

// ── Digital Art ──
var DIGITAL_ART = [];

// ── Render + Lightbox ──
function renderMasonry(containerId, items) {
  var container = document.getElementById(containerId);
  if (!items.length) {
    var p = document.createElement('p');
    p.style.cssText = 'font-size:15px;color:#8A8580;font-weight:300;';
    p.textContent = 'Coming soon.';
    container.appendChild(p);
    return;
  }
  items.forEach(function(item, i) {
    var div = document.createElement('div');
    div.className = 'masonry-item';
    div.setAttribute('data-index', i);
    div.setAttribute('data-section', containerId);
    var img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    div.appendChild(img);
    container.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  var lightbox = document.getElementById('lightbox');
  var lbImg = lightbox.querySelector('img');
  var currentItems = [];
  var currentIndex = 0;

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    lbImg.src = items[index].src;
    lbImg.alt = items[index].alt;
    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lbImg.src = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + currentItems.length) % currentItems.length;
    lbImg.src = currentItems[currentIndex].src;
    lbImg.alt = currentItems[currentIndex].alt;
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function() { navigate(-1); });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function() { navigate(1); });

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  document.addEventListener('click', function(e) {
    var item = e.target.closest('.masonry-item');
    if (!item) return;
    var section = item.getAttribute('data-section');
    var index = parseInt(item.getAttribute('data-index'), 10);
    var items = section === 'photo-grid' ? PHOTOGRAPHY : DIGITAL_ART;
    openLightbox(items, index);
  });

  renderMasonry('photo-grid', PHOTOGRAPHY);
  renderMasonry('art-grid', DIGITAL_ART);
});
