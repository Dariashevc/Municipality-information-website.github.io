// ===== MAP DATA =====
// Change the coordinates below to your actual city location
const CITY_CENTER = [51.0447, -114.0719]; // Default: Calgary — replace with your city
const CITY_ZOOM = 13;

const locations = [
    {
        id: 1,
        name: "Central City Park",
        category: "park",
        description: "The main city park with walking trails and picnic areas.",
        coords: [51.0500, -114.0800],
        icon: "fa-tree"
    },
    {
        id: 2,
        name: "Riverside Park",
        category: "park",
        description: "A scenic park along the river with playgrounds.",
        coords: [51.0380, -114.0600],
        icon: "fa-tree"
    },
    {
        id: 3,
        name: "Northside Park",
        category: "park",
        description: "A quiet neighbourhood park with open green spaces.",
        coords: [51.0560, -114.0900],
        icon: "fa-tree"
    },
    {
        id: 4,
        name: "Community Recreation Centre",
        category: "recreation",
        description: "Fitness facilities, swimming pool, and multi-purpose courts.",
        coords: [51.0470, -114.0650],
        icon: "fa-dumbbell"
    },
    {
        id: 5,
        name: "Eastside Arena",
        category: "recreation",
        description: "Ice rink and sports facilities open year round.",
        coords: [51.0420, -114.0500],
        icon: "fa-dumbbell"
    },
    {
        id: 6,
        name: "City Hall",
        category: "service",
        description: "Main municipal government building and citizen services.",
        coords: [51.0447, -114.0719],
        icon: "fa-building-columns"
    },
    {
        id: 7,
        name: "Public Library",
        category: "service",
        description: "City library with resources, events, and community programs.",
        coords: [51.0490, -114.0750],
        icon: "fa-building-columns"
    },
    {
        id: 8,
        name: "Heritage Museum",
        category: "landmark",
        description: "Explore the city's rich cultural history and heritage.",
        coords: [51.0410, -114.0780],
        icon: "fa-landmark"
    },
    {
        id: 9,
        name: "Old Town Square",
        category: "landmark",
        description: "Historic town square at the heart of the original city.",
        coords: [51.0435, -114.0700],
        icon: "fa-landmark"
    },
];

// ===== CATEGORY COLORS =====
const categoryColors = {
    park:       '#16a34a',
    recreation: '#2563eb',
    service:    '#7c3aed',
    landmark:   '#b45309',
};

const categoryLabels = {
    park:       'Park',
    recreation: 'Recreation',
    service:    'City Service',
    landmark:   'Landmark',
};

// ===== CREATE CUSTOM MARKER ICON =====
function createIcon(category) {
    const color = categoryColors[category] || '#1e3a8a';
    return L.divIcon({
        className: '',
        html: `<div style="
            background: ${color};
            width: 2rem;
            height: 2rem;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        "></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -34],
    });
}

// ===== INIT MAP =====
const map = L.map('map').setView(CITY_CENTER, CITY_ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// ===== CREATE MARKERS =====
const markers = {};

locations.forEach(loc => {
    const marker = L.marker(loc.coords, { icon: createIcon(loc.category) })
        .addTo(map)
        .bindPopup(`
            <div class="popup-title">${loc.name}</div>
            <div class="popup-category" style="color:${categoryColors[loc.category]}">${categoryLabels[loc.category]}</div>
            <div style="margin-top:0.4rem; font-size:0.82rem; color:#444">${loc.description}</div>
        `);

    marker.on('click', () => {
        setActiveLocation(loc.id);
    });

    markers[loc.id] = marker;
});

// ===== BUILD SIDEBAR =====
const locationList = document.getElementById('location-list');

function buildSidebar(filter = 'all') {
    locationList.innerHTML = '';
    const filtered = filter === 'all' ? locations : locations.filter(l => l.category === filter);

    filtered.forEach(loc => {
        const item = document.createElement('div');
        item.className = 'location-item';
        item.dataset.id = loc.id;
        item.innerHTML = `
            <div class="location-item-icon" style="color:${categoryColors[loc.category]}">
                <i class="fa-solid ${loc.icon}"></i>
            </div>
            <div class="location-item-text">
                <h4>${loc.name}</h4>
                <p>${categoryLabels[loc.category]}</p>
            </div>
        `;
        item.addEventListener('click', () => {
            map.setView(loc.coords, 15, { animate: true });
            markers[loc.id].openPopup();
            setActiveLocation(loc.id);
        });
        locationList.appendChild(item);
    });
}

function setActiveLocation(id) {
    document.querySelectorAll('.location-item').forEach(el => {
        el.classList.toggle('active', parseInt(el.dataset.id) === id);
    });
}

buildSidebar();

// ===== FILTERS =====
let activeFilter = 'all';

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeFilter = btn.dataset.filter;
        buildSidebar(activeFilter);

        // Show/hide markers
        locations.forEach(loc => {
            if (activeFilter === 'all' || loc.category === activeFilter) {
                markers[loc.id].addTo(map);
            } else {
                markers[loc.id].remove();
            }
        });
    });
});
