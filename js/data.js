/* ================================================
   UTSAVAM — Data Layer & localStorage Utilities
   ================================================ */

const STORAGE_KEYS = {
  VENUES: 'utsavam_venues',
  INTERESTS: 'utsavam_interests',
  CONTACTS: 'utsavam_contacts',
  REGISTRATIONS: 'utsavam_registrations',
  ADMIN_PASS: 'utsavam_admin_pass',
};

/* ── Sample Seed Data ── */
const SEED_VENUES = [
  {
    id: 'v001',
    name: 'The Royal Mahal',
    type: 'wedding_hall',
    city: 'Hyderabad',
    area: 'Banjara Hills',
    address: '8-2-293, Road No. 14, Banjara Hills, Hyderabad – 500034',
    capacity: 800,
    price: 250000,
    priceUnit: 'day',
    description: 'An opulent wedding hall draped in traditional grandeur. The Royal Mahal combines the splendour of Nizam-era architecture with modern amenities. Its sprawling lawns, marble interiors, and customisable décor make it the most sought-after wedding venue in Hyderabad.',
    amenities: ['Air Conditioning', 'Valet Parking', 'In-house Catering', 'Bridal Suite', 'DJ & Sound System', 'Floral Decoration', 'Generator Backup', 'CCTV', 'Wi-Fi', 'Changing Rooms'],
    photos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
      'https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=80',
    ],
    phone: '+91 98765 43210',
    email: 'info@royalmahal.com',
    featured: true,
    approved: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ['Featured', 'Popular'],
  },
  {
    id: 'v002',
    name: 'Green Valley Farmhouse',
    type: 'farm_house',
    city: 'Hyderabad',
    area: 'Shamshabad',
    address: 'Survey No. 44, Shamshabad, Hyderabad – 501218',
    capacity: 400,
    price: 120000,
    priceUnit: 'day',
    description: 'Nestled amidst 12 acres of lush greenery, Green Valley Farmhouse offers a serene escape for your special occasions. Perfect for intimate weddings, corporate retreats, and milestone celebrations set in nature.',
    amenities: ['Outdoor Lawn', 'Swimming Pool', 'Parking for 200 Cars', 'Catering Available', "Children's Play Area", 'Bonfire Area', 'Cottages', 'Outdoor Stage', 'Generator Backup'],
    photos: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    ],
    phone: '+91 90000 12345',
    email: 'bookings@greenvalley.in',
    featured: true,
    approved: true,
    rating: 4.6,
    reviewCount: 87,
    tags: ['Trending'],
  },
  {
    id: 'v003',
    name: 'Vaibhav Convention Centre',
    type: 'convention_center',
    city: 'Hyderabad',
    area: 'HITEC City',
    address: 'Plot 12, Cyber Towers Rd, HITEC City, Hyderabad – 500081',
    capacity: 1200,
    price: 450000,
    priceUnit: 'day',
    description: 'A state-of-the-art convention centre equipped for large-scale corporate events, product launches, conferences, and grand celebrations. Features multiple halls, high-speed internet, and professional AV support.',
    amenities: ['Multiple Halls', 'High-Speed Wi-Fi', 'Professional AV', 'Stage & Podium', 'Conference Rooms', 'Catering', 'Valet Parking', 'Hotel Tie-up', 'Live Streaming Setup', 'AC'],
    photos: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    ],
    phone: '+91 40 6789 0123',
    email: 'events@vaibhav.in',
    featured: true,
    approved: true,
    rating: 4.7,
    reviewCount: 210,
    tags: ['Top Rated'],
  },
  {
    id: 'v004',
    name: 'Celebration Party Lounge',
    type: 'party_hall',
    city: 'Hyderabad',
    area: 'Jubilee Hills',
    address: '12-2-786, Jubilee Hills, Hyderabad – 500033',
    capacity: 200,
    price: 60000,
    priceUnit: 'day',
    description: 'The perfect intimate setting for birthdays, anniversaries, baby showers, and social gatherings. Celebration Party Lounge offers a chic, contemporary ambiance with flexible packages to suit every budget.',
    amenities: ['AC', 'DJ Setup', 'Dance Floor', 'Customised Décor', 'In-house Catering', 'Projector & Screen', 'Parking', 'Cake & Dessert Bar'],
    photos: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    ],
    phone: '+91 98123 45678',
    email: 'hello@celebrationlounge.in',
    featured: false,
    approved: true,
    rating: 4.4,
    reviewCount: 56,
    tags: [],
  },
  {
    id: 'v005',
    name: 'Heritage Resort & Banquet',
    type: 'resort',
    city: 'Hyderabad',
    area: 'Shankarpally',
    address: 'Shankarpally Rd, Near Biopharma Colony, Hyderabad – 501203',
    capacity: 600,
    price: 380000,
    priceUnit: 'day',
    description: 'A heritage resort blending Rajasthani architecture with Deccan warmth. Sprawling across 25 acres, Heritage Resort offers destination wedding packages, poolside events, and luxury overnight stays.',
    amenities: ['Luxury Rooms', 'Swimming Pool', 'Spa', 'Multiple Banquet Halls', 'Lawns', 'Fine Dining', 'Horse Rides', 'Décor Services', 'DJ & Band', 'Helipad'],
    photos: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    ],
    phone: '+91 99887 76655',
    email: 'reservations@heritageresort.com',
    featured: true,
    approved: true,
    rating: 4.9,
    reviewCount: 178,
    tags: ['Premium', 'Featured'],
  },
  {
    id: 'v006',
    name: 'Kalyana Vedika – Ameerpet',
    type: 'wedding_hall',
    city: 'Hyderabad',
    area: 'Ameerpet',
    address: 'Plot No. 5, Yellareddy Guda, Ameerpet, Hyderabad – 500016',
    capacity: 500,
    price: 95000,
    priceUnit: 'day',
    description: "A budget-friendly yet elegant Kalyana Vedika (wedding hall) in the heart of Ameerpet. Ideal for traditional Telugu and Hindu weddings with a dedicated priest's stage, Mandap setup, and guest services.",
    amenities: ['AC', 'Mandap Stage', 'Generator', 'Parking', 'Catering Kitchen', 'Guest Rooms', 'Sound System', 'Changing Rooms'],
    photos: [
      'https://images.unsplash.com/photo-1511795409834-432f7b1728b2?w=800&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
      'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&q=80',
      'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&q=80',
    ],
    phone: '+91 96547 89012',
    email: 'contact@kalyanavedika.com',
    featured: false,
    approved: true,
    rating: 4.3,
    reviewCount: 91,
    tags: ['Budget Friendly'],
  },
  {
    id: 'v007',
    name: 'Sunrise Corporate Arena',
    type: 'convention_center',
    city: 'Hyderabad',
    area: 'Gachibowli',
    address: 'Plot 88, Financial District, Gachibowli, Hyderabad – 500032',
    capacity: 900,
    price: 320000,
    priceUnit: 'day',
    description: 'Sunrise Corporate Arena is the premier destination for corporate conferences, exhibitions, product launches, and award ceremonies. Modern infrastructure with top-notch AV, breakout rooms, and on-site hospitality.',
    amenities: ['Conference Halls', '4K Projection', 'Broadcast Studio', 'Green Room', 'Executive Lounge', 'Parking', 'Hospitality Services', 'Secure Wi-Fi', 'Interpretation Booths'],
    photos: [
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
    ],
    phone: '+91 40 4455 6677',
    email: 'events@sunrisearena.in',
    featured: false,
    approved: true,
    rating: 4.5,
    reviewCount: 143,
    tags: [],
  },
  {
    id: 'v008',
    name: 'Mango Grove Farmstay',
    type: 'farm_house',
    city: 'Hyderabad',
    area: 'Chevella',
    address: 'Sy No. 128, Pudur Village, Chevella, Hyderabad – 501503',
    capacity: 300,
    price: 85000,
    priceUnit: 'day',
    description: 'Surrounded by over 500 mango trees, this rustic farmstay offers an authentic countryside experience. Ideal for pre-wedding shoots, mehendi ceremonies, musical evenings, and team-building activities.',
    amenities: ['Mango Orchard', 'Bonfire Pit', 'Outdoor Stage', 'Tent Accommodation', 'Catering Available', 'Parking', 'Bullock Cart Rides', 'Rain Dance'],
    photos: [
      'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
      'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&q=80',
    ],
    phone: '+91 95555 67890',
    email: 'stay@mangogrove.in',
    featured: false,
    approved: true,
    rating: 4.5,
    reviewCount: 62,
    tags: ['Nature'],
  },
  {
    id: 'v009',
    name: 'City Stars Banquet Hall',
    type: 'party_hall',
    city: 'Hyderabad',
    area: 'Kukatpally',
    address: '12-6-87, KPHB Colony, Kukatpally, Hyderabad – 500072',
    capacity: 350,
    price: 75000,
    priceUnit: 'day',
    description: 'City Stars is a versatile banquet hall in Kukatpally offering flexible configurations for weddings, receptions, corporate parties, and cultural events. Fully equipped with modern amenities and a dedicated events team.',
    amenities: ['AC', 'Parking', 'Catering', 'DJ', 'Décor', 'Stage', 'Bridal Room', 'Generator'],
    photos: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80',
    ],
    phone: '+91 93344 55667',
    email: 'info@citystars.in',
    featured: false,
    approved: true,
    rating: 4.2,
    reviewCount: 48,
    tags: [],
  },
  {
    id: 'v010',
    name: 'Signature Wedding Resort',
    type: 'resort',
    city: 'Hyderabad',
    area: 'Mokila',
    address: 'Survey No. 72, Mokila Village, Sangareddy Dist., Hyderabad – 502325',
    capacity: 700,
    price: 500000,
    priceUnit: 'day',
    description: 'Signature Wedding Resort is the ultimate destination for extravagant celebrations. With 10 acres of manicured lawns, a grand ballroom, rooftop terrace, and full-service hospitality, every event here becomes a legendary memory.',
    amenities: ['Grand Ballroom', 'Rooftop Terrace', 'Luxury Suites', 'Pool', 'Multi-cuisine Restaurant', 'Full Décor Team', 'Photography Services', 'DJ & Live Band', 'Fireworks Coordination', 'Valet'],
    photos: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80',
    ],
    phone: '+91 91234 56789',
    email: 'weddings@signatureresort.com',
    featured: true,
    approved: true,
    rating: 4.9,
    reviewCount: 231,
    tags: ['Premium', 'Top Rated'],
  },
];

/* ── Storage Helpers ── */
const Storage = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || null; } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
  },
};

/* ── Initialise Data ── */
function initData() {
  if (!Storage.get(STORAGE_KEYS.VENUES)) {
    Storage.set(STORAGE_KEYS.VENUES, SEED_VENUES);
  }
  if (!Storage.get(STORAGE_KEYS.INTERESTS))     Storage.set(STORAGE_KEYS.INTERESTS, []);
  if (!Storage.get(STORAGE_KEYS.CONTACTS))      Storage.set(STORAGE_KEYS.CONTACTS, []);
  if (!Storage.get(STORAGE_KEYS.REGISTRATIONS)) Storage.set(STORAGE_KEYS.REGISTRATIONS, []);
}

/* ── Venue CRUD ── */
const VenueDB = {
  all()             { return Storage.get(STORAGE_KEYS.VENUES) || []; },
  approved()        { return this.all().filter(v => v.approved); },
  featured()        { return this.approved().filter(v => v.featured); },
  byId(id)          { return this.all().find(v => v.id === id) || null; },
  add(venue) {
    const list = this.all();
    venue.id = 'v' + Date.now();
    venue.approved = true;
    venue.rating = 0;
    venue.reviewCount = 0;
    venue.tags = venue.featured ? ['Featured'] : [];
    list.push(venue);
    Storage.set(STORAGE_KEYS.VENUES, list);
    return venue;
  },
  update(id, data) {
    const list = this.all();
    const idx  = list.findIndex(v => v.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...data };
    Storage.set(STORAGE_KEYS.VENUES, list);
    return list[idx];
  },
  delete(id) {
    const list = this.all().filter(v => v.id !== id);
    Storage.set(STORAGE_KEYS.VENUES, list);
  },
  search({ query = '', type = '', city = '', maxPrice = Infinity, minCapacity = 0 } = {}) {
    return this.approved().filter(v => {
      const q = query.toLowerCase();
      const matchQuery = !q ||
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.area.toLowerCase().includes(q) ||
        v.type.toLowerCase().includes(q);
      const matchType  = !type  || v.type === type;
      const matchCity  = !city  || v.city === city;
      const matchPrice = v.price <= maxPrice;
      const matchCap   = v.capacity >= minCapacity;
      return matchQuery && matchType && matchCity && matchPrice && matchCap;
    });
  },
};

/* ── Interest Submissions ── */
const InterestDB = {
  all()   { return Storage.get(STORAGE_KEYS.INTERESTS) || []; },
  add(interest) {
    const list = this.all();
    interest.id   = 'i' + Date.now();
    interest.date = new Date().toISOString();
    interest.read = false;
    list.unshift(interest);
    Storage.set(STORAGE_KEYS.INTERESTS, list);
    return interest;
  },
  markRead(id) {
    const list = this.all();
    const item = list.find(i => i.id === id);
    if (item) { item.read = true; Storage.set(STORAGE_KEYS.INTERESTS, list); }
  },
  delete(id) {
    Storage.set(STORAGE_KEYS.INTERESTS, this.all().filter(i => i.id !== id));
  },
};

/* ── Contact Messages ── */
const ContactDB = {
  all()   { return Storage.get(STORAGE_KEYS.CONTACTS) || []; },
  add(msg) {
    const list = this.all();
    msg.id   = 'c' + Date.now();
    msg.date = new Date().toISOString();
    msg.read = false;
    list.unshift(msg);
    Storage.set(STORAGE_KEYS.CONTACTS, list);
    return msg;
  },
  delete(id) {
    Storage.set(STORAGE_KEYS.CONTACTS, this.all().filter(m => m.id !== id));
  },
};

/* ── Venue Registration Requests ── */
const RegistrationDB = {
  all()   { return Storage.get(STORAGE_KEYS.REGISTRATIONS) || []; },
  add(reg) {
    const list = this.all();
    reg.id     = 'r' + Date.now();
    reg.date   = new Date().toISOString();
    reg.status = 'pending';
    list.unshift(reg);
    Storage.set(STORAGE_KEYS.REGISTRATIONS, list);
    return reg;
  },
  approve(id) {
    const list = this.all();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = 'approved';
      Storage.set(STORAGE_KEYS.REGISTRATIONS, list);
      // Also add to venues
      VenueDB.add({
        name: item.venueName, type: item.venueType, city: item.city, area: item.area,
        address: item.address, capacity: Number(item.capacity), price: Number(item.price),
        priceUnit: 'day', description: item.description,
        amenities: (item.amenities || '').split(',').map(s => s.trim()).filter(Boolean),
        photos: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'],
        phone: item.phone, email: item.email, featured: false,
      });
    }
  },
  reject(id) {
    const list = this.all();
    const item = list.find(r => r.id === id);
    if (item) { item.status = 'rejected'; Storage.set(STORAGE_KEYS.REGISTRATIONS, list); }
  },
  delete(id) {
    Storage.set(STORAGE_KEYS.REGISTRATIONS, this.all().filter(r => r.id !== id));
  },
};

/* ── Utility Helpers ── */
const Utils = {
  formatPrice(price) {
    if (price >= 100000) return '₹' + (price / 100000).toFixed(price % 100000 === 0 ? 0 : 1) + ' Lakh';
    if (price >= 1000)   return '₹' + (price / 1000).toFixed(0) + 'K';
    return '₹' + price;
  },
  formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  },
  typeLabel(type) {
    const map = {
      wedding_hall:      'Wedding Hall',
      convention_center: 'Convention Centre',
      farm_house:        'Farm House',
      party_hall:        'Party Hall',
      resort:            'Resort',
      other:             'Other',
    };
    return map[type] || type;
  },
  typeIcon(type) {
    const map = {
      wedding_hall:      'fa-gem',
      convention_center: 'fa-building',
      farm_house:        'fa-tree',
      party_hall:        'fa-music',
      resort:            'fa-umbrella-beach',
      other:             'fa-map-marker-alt',
    };
    return map[type] || 'fa-map-marker-alt';
  },
  stars(rating) {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '<i class="fas fa-star"></i>'.repeat(full) +
           (half ? '<i class="fas fa-star-half-alt"></i>' : '') +
           '<i class="far fa-star"></i>'.repeat(empty);
  },
  getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },
  escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  },
  venueCardHTML(venue) {
    return `
      <div class="venue-card fade-in-up" onclick="window.location='venue-detail.html?id=${venue.id}'">
        <div class="venue-card-image">
          <img src="${venue.photos[0]}" alt="${Utils.escapeHtml(venue.name)}" loading="lazy">
          <div class="overlay"></div>
          <div class="venue-card-badges">
            ${venue.tags.map(t => `<span class="badge badge-gold">${t}</span>`).join('')}
          </div>
          <div class="venue-card-rating">
            <i class="fas fa-star"></i> ${venue.rating.toFixed(1)}
            <span style="color:#999;margin-left:2px">(${venue.reviewCount})</span>
          </div>
        </div>
        <div class="venue-card-body">
          <div class="venue-card-type"><i class="fas ${Utils.typeIcon(venue.type)}"></i> &nbsp;${Utils.typeLabel(venue.type)}</div>
          <div class="venue-card-name">${Utils.escapeHtml(venue.name)}</div>
          <div class="venue-card-location">
            <i class="fas fa-map-marker-alt"></i> ${Utils.escapeHtml(venue.area)}, ${Utils.escapeHtml(venue.city)}
          </div>
          <div class="venue-card-meta">
            <div class="venue-meta-item"><i class="fas fa-users"></i> Up to ${venue.capacity.toLocaleString()}</div>
            <div class="venue-meta-item"><i class="fas fa-parking"></i> Parking</div>
            ${venue.amenities.includes('Air Conditioning') || venue.amenities.includes('AC') ? '<div class="venue-meta-item"><i class="fas fa-snowflake"></i> AC</div>' : ''}
          </div>
          <div class="venue-card-footer">
            <div class="venue-card-price">
              <span class="amount">${Utils.formatPrice(venue.price)}</span>
              <span class="period">/ ${venue.priceUnit}</span>
            </div>
            <a href="venue-detail.html?id=${venue.id}" class="btn btn-outline btn-sm" onclick="event.stopPropagation()">
              View Details
            </a>
          </div>
        </div>
      </div>`;
  },
};

/* ── Toast ── */
function showToast(msg, type = 'default') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-bell';
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${icon}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { requestAnimationFrame(() => { toast.classList.add('show'); }); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3800);
}

/* ── Navbar Scroll Effect ── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
  // Hamburger
  const ham = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (ham && menu) {
    ham.addEventListener('click', () => menu.classList.toggle('open'));
  }
  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.split('/').pop() === path) link.classList.add('active');
  });
}

/* ── Modal Helpers ── */
function openModal(id) {
  document.getElementById(id)?.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ── Admin Auth ── */
const ADMIN_PASSWORD = 'utsavam@2024';
const AdminAuth = {
  isLoggedIn() { return sessionStorage.getItem('utsavam_admin') === 'true'; },
  login(pass)  {
    if (pass === ADMIN_PASSWORD) { sessionStorage.setItem('utsavam_admin', 'true'); return true; }
    return false;
  },
  logout()     { sessionStorage.removeItem('utsavam_admin'); },
};

/* ── Bootstrap ── */
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initNavbar();
});
