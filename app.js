const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const cities = [
  {
    id: "jaipur",
    name: "Jaipur",
    country: "India",
    region: "India",
    costIndex: "Moderate",
    popularity: 94,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=80",
    summary: "Forts, royal palaces, market lanes, and warm Rajasthani food."
  },
  {
    id: "goa",
    name: "Goa",
    country: "India",
    region: "India",
    costIndex: "Flexible",
    popularity: 91,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    summary: "Beaches, Portuguese quarters, seafood cafes, and relaxed coastal days."
  },
  {
    id: "varanasi",
    name: "Varanasi",
    country: "India",
    region: "India",
    costIndex: "Budget",
    popularity: 87,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80",
    summary: "Ghats, sunrise boat rides, temples, lanes, and evening aarti."
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    costIndex: "Premium",
    popularity: 96,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
    summary: "Neon districts, gardens, sushi counters, museums, and day trips."
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    costIndex: "Moderate",
    popularity: 92,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    summary: "Rice terraces, beaches, temples, wellness stays, and island drives."
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    costIndex: "Premium",
    popularity: 98,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    summary: "Museums, riverside walks, cafes, boutiques, and classic landmarks."
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    region: "Middle East",
    costIndex: "Premium",
    popularity: 90,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
    summary: "Skylines, desert safaris, shopping districts, beaches, and dining."
  }
];

const activities = [
  { id: "amber-fort", cityId: "jaipur", name: "Amber Fort heritage walk", type: "Culture", duration: "3 hrs", cost: 1200, image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=80" },
  { id: "rajasthani-food", cityId: "jaipur", name: "Rajasthani food trail", type: "Food", duration: "2 hrs", cost: 1800, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80" },
  { id: "beach-hop", cityId: "goa", name: "North Goa beach hop", type: "Leisure", duration: "5 hrs", cost: 2500, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
  { id: "spice-tour", cityId: "goa", name: "Spice plantation tour", type: "Food", duration: "4 hrs", cost: 1600, image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=900&q=80" },
  { id: "boat-ride", cityId: "varanasi", name: "Sunrise Ganga boat ride", type: "Culture", duration: "2 hrs", cost: 900, image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=900&q=80" },
  { id: "shibuya", cityId: "tokyo", name: "Shibuya and ramen night", type: "Food", duration: "3 hrs", cost: 4200, image: "https://images.unsplash.com/photo-1554797589-7241bb691973?auto=format&fit=crop&w=900&q=80" },
  { id: "bali-rafting", cityId: "bali", name: "Ubud river rafting", type: "Adventure", duration: "4 hrs", cost: 3600, image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" },
  { id: "louvre", cityId: "paris", name: "Louvre highlights tour", type: "Culture", duration: "3 hrs", cost: 5200, image: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?auto=format&fit=crop&w=900&q=80" },
  { id: "desert", cityId: "dubai", name: "Desert safari evening", type: "Adventure", duration: "6 hrs", cost: 6500, image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80" }
];

const starterPacking = [
  { id: crypto.randomUUID(), text: "Passport or government ID", category: "Documents", done: false },
  { id: crypto.randomUUID(), text: "Phone charger and power bank", category: "Electronics", done: false },
  { id: crypto.randomUUID(), text: "Comfortable walking shoes", category: "Clothing", done: false }
];

const defaultState = {
  authMode: "signin",
  user: null,
  trips: [],
  activeTripId: null,
  profile: { name: "", email: "", photo: "", language: "English", saved: "Jaipur, Goa, Bali" }
};

let state = loadState();
let itineraryMode = "list";
let editingTripId = null;

function loadState() {
  const stored = localStorage.getItem("traveloop-state");
  if (!stored) return structuredClone(defaultState);
  try {
    return { ...structuredClone(defaultState), ...JSON.parse(stored) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem("traveloop-state", JSON.stringify(state));
}

function qs(selector) {
  return document.querySelector(selector);
}

function qsa(selector) {
  return [...document.querySelectorAll(selector)];
}

function activeTrip() {
  return state.trips.find(trip => trip.id === state.activeTripId) || state.trips[0] || null;
}

function setActiveTrip(id) {
  state.activeTripId = id;
  saveState();
  renderAll();
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function formatDate(value) {
  if (!value) return "Date not set";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function daysBetween(start, end) {
  if (!start || !end) return 1;
  const diff = (new Date(end) - new Date(start)) / 86400000;
  return Math.max(1, Math.round(diff) + 1);
}

function tripCosts(trip) {
  if (!trip) return { stay: 0, transport: 0, activities: 0, meals: 0, total: 0 };
  const stay = trip.stops.reduce((sum, stop) => sum + Number(stop.stay || 0), 0);
  const transport = trip.stops.reduce((sum, stop) => sum + Number(stop.transport || 0), 0);
  const activityIds = trip.stops.flatMap(stop => stop.activities || []);
  const activityCost = activityIds.reduce((sum, id) => {
    const activity = activities.find(item => item.id === id);
    return sum + Number(activity?.cost || 0);
  }, 0);
  const meals = trip.stops.reduce((sum, stop) => sum + daysBetween(stop.arrival, stop.departure) * 1200, 0);
  return { stay, transport, activities: activityCost, meals, total: stay + transport + activityCost + meals };
}

function switchAuth(mode) {
  state.authMode = mode;
  qs("#signin-tab").classList.toggle("active", mode === "signin");
  qs("#signup-tab").classList.toggle("active", mode === "signup");
  qs("#auth-title").textContent = mode === "signin" ? "Welcome back" : "Create your account";
  qs("#auth-copy").textContent = mode === "signin" ? "Access your personal travel workspace." : "Start planning your next loop.";
  qs("#auth-name").parentElement.style.display = mode === "signin" ? "none" : "grid";
  qs("#auth-password").autocomplete = mode === "signin" ? "current-password" : "new-password";
  qs("#auth-message").textContent = "";
  saveState();
}

function authenticate(event) {
  event.preventDefault();
  const name = qs("#auth-name").value.trim();
  const email = qs("#auth-email").value.trim();
  const password = qs("#auth-password").value;
  const message = qs("#auth-message");

  if (!email.includes("@")) {
    message.textContent = "Enter a valid email address.";
    return;
  }
  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters.";
    return;
  }
  if (state.authMode === "signup" && name.length < 2) {
    message.textContent = "Enter your name to sign up.";
    return;
  }

  const displayName = state.authMode === "signup" ? name : state.profile.name || email.split("@")[0];
  state.user = { name: displayName, email };
  state.profile.name = displayName;
  state.profile.email = email;
  if (!state.trips.length) seedDemoTrip();
  saveState();
  showApp();
}

function seedDemoTrip() {
  const trip = {
    id: crypto.randomUUID(),
    name: "Golden Triangle Escape",
    start: "2026-06-10",
    end: "2026-06-16",
    description: "A compact culture-rich route through Jaipur, Varanasi, and Delhi-style discovery.",
    cover: cities[0].image,
    targetBudget: 65000,
    stops: [
      { id: crypto.randomUUID(), cityId: "jaipur", arrival: "2026-06-10", departure: "2026-06-12", stay: 9000, transport: 4500, activities: ["amber-fort", "rajasthani-food"] },
      { id: crypto.randomUUID(), cityId: "varanasi", arrival: "2026-06-13", departure: "2026-06-16", stay: 8500, transport: 7000, activities: ["boat-ride"] }
    ],
    packing: structuredClone(starterPacking),
    notes: [{ id: crypto.randomUUID(), text: "Confirm hotel pickup before arrival in Jaipur.", createdAt: new Date().toISOString() }],
    public: true
  };
  state.trips = [trip];
  state.activeTripId = trip.id;
}

function showApp() {
  qs("#auth-screen").classList.toggle("hidden", !!state.user);
  qs("#app-shell").classList.toggle("hidden", !state.user);
  switchAuth(state.authMode || "signin");
  if (state.user) renderAll();
}

function switchView(view) {
  qsa(".view").forEach(item => item.classList.remove("active"));
  qs(`#${view}-view`)?.classList.add("active");
  qsa(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  const label = qsa(".nav-item").find(item => item.dataset.view === view)?.textContent || "Dashboard";
  qs("#page-title").textContent = label;
}

function enterCreateMode(tripId = null) {
  editingTripId = tripId;
  const form = qs("#trip-form");
  const submit = form.querySelector("button[type='submit']");
  const heading = qs("#create-view h2");
  if (!tripId) {
    form.reset();
    qs("#trip-budget").value = 50000;
    heading.textContent = "Create a Trip";
    submit.textContent = "Save Trip";
    switchView("create");
    return;
  }

  const trip = state.trips.find(item => item.id === tripId);
  if (!trip) return;
  qs("#trip-name").value = trip.name;
  qs("#trip-start").value = trip.start;
  qs("#trip-end").value = trip.end;
  qs("#trip-cover").value = trip.cover || "";
  qs("#trip-description").value = trip.description || "";
  qs("#trip-budget").value = trip.targetBudget || 0;
  heading.textContent = "Edit Trip";
  submit.textContent = "Update Trip";
  switchView("create");
}

function renderAll() {
  renderTripSelect();
  renderDashboard();
  renderTrips();
  renderCityOptions();
  renderItinerary();
  renderCities();
  renderActivities();
  renderBudget();
  renderPacking();
  renderShare();
  renderNotes();
  renderProfile();
  renderAnalytics();
}

function renderTripSelect() {
  const select = qs("#active-trip-select");
  select.innerHTML = state.trips.length
    ? state.trips.map(trip => `<option value="${trip.id}">${escapeHtml(trip.name)}</option>`).join("")
    : `<option value="">No trips yet</option>`;
  select.value = activeTrip()?.id || "";
}

function renderDashboard() {
  const trip = activeTrip();
  const allStops = state.trips.flatMap(item => item.stops);
  const allActivities = allStops.flatMap(stop => stop.activities || []);
  const totalBudget = state.trips.reduce((sum, item) => sum + tripCosts(item).total, 0);

  qs("#user-name-display").textContent = state.profile.name || state.user?.name || "traveler";
  qs("#metric-trips").textContent = state.trips.length;
  qs("#metric-stops").textContent = allStops.length;
  qs("#metric-activities").textContent = allActivities.length;
  qs("#metric-budget").textContent = INR.format(totalBudget);
  qs("#hero-route").textContent = trip ? routeText(trip) : "Create your first trip";
  qs("#hero-budget").textContent = `Estimated total: ${INR.format(tripCosts(trip).total)}`;

  qs("#recent-trips").innerHTML = state.trips.length
    ? state.trips.slice(0, 3).map(tripSummary).join("")
    : `<div class="empty-state">No trips yet. Start with Plan New Trip.</div>`;

  qs("#recommended-cities").innerHTML = cities.slice(0, 4).map(cityCard).join("");
}

function routeText(trip) {
  const names = trip.stops.map(stop => cities.find(city => city.id === stop.cityId)?.name).filter(Boolean);
  return names.length ? names.join(" to ") : trip.name;
}

function tripSummary(trip) {
  const costs = tripCosts(trip);
  return `
    <article class="timeline-item">
      <h3>${escapeHtml(trip.name)}</h3>
      <div class="timeline-meta">
        <span>${formatDate(trip.start)} - ${formatDate(trip.end)}</span>
        <span>${trip.stops.length} stops</span>
        <span>${INR.format(costs.total)}</span>
      </div>
    </article>
  `;
}

function renderTrips() {
  qs("#trip-list").innerHTML = state.trips.length
    ? state.trips.map(trip => {
      const cost = tripCosts(trip);
      return `
        <article class="trip-card">
          <div class="card-media" style="background-image:url('${escapeHtml(trip.cover || cities[0].image)}')"></div>
          <div class="card-body">
            <h3>${escapeHtml(trip.name)}</h3>
            <p>${escapeHtml(trip.description || "No description added yet.")}</p>
            <div class="pill-row">
              <span class="pill">${formatDate(trip.start)} - ${formatDate(trip.end)}</span>
              <span class="pill">${trip.stops.length} stops</span>
              <span class="pill">${INR.format(cost.total)}</span>
            </div>
            <div class="card-actions">
              <button class="ghost-button" data-select-trip="${trip.id}" type="button">View</button>
              <button class="ghost-button" data-edit-trip="${trip.id}" type="button">Edit</button>
              <button class="danger-button" data-delete-trip="${trip.id}" type="button">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join("")
    : `<div class="empty-state">Your saved trips will appear here.</div>`;
}

function renderCityOptions() {
  qs("#stop-city").innerHTML = cities.map(city => `<option value="${city.id}">${city.name}, ${city.country}</option>`).join("");
}

function renderItinerary() {
  const trip = activeTrip();
  const output = qs("#itinerary-output");
  if (!trip) {
    output.innerHTML = `<div class="empty-state">Create a trip before building an itinerary.</div>`;
    return;
  }

  if (!trip.stops.length) {
    output.innerHTML = `<div class="empty-state">Add a city stop to begin the day-wise plan.</div>`;
    return;
  }

  output.classList.toggle("calendar-mode", itineraryMode === "calendar");
  output.innerHTML = trip.stops.map((stop, index) => {
    const city = cities.find(item => item.id === stop.cityId);
    const stopActivities = (stop.activities || []).map(id => activities.find(item => item.id === id)).filter(Boolean);
    return `
      <article class="timeline-item">
        <h3>Day ${index + 1}: ${escapeHtml(city?.name || "Unknown city")}</h3>
        <div class="timeline-meta">
          <span>${formatDate(stop.arrival)} - ${formatDate(stop.departure)}</span>
          <span>Stay ${INR.format(stop.stay)}</span>
          <span>Transport ${INR.format(stop.transport)}</span>
        </div>
        ${stopActivities.length ? stopActivities.map(activity => `
          <div class="activity-line">
            <span>${escapeHtml(activity.name)} · ${activity.duration}</span>
            <strong>${INR.format(activity.cost)}</strong>
          </div>
        `).join("") : `<div class="activity-line"><span>No activities added yet</span><strong>₹0</strong></div>`}
        <div class="card-actions">
          <button class="ghost-button" data-move-stop="${stop.id}" data-direction="-1" type="button">Move Up</button>
          <button class="ghost-button" data-move-stop="${stop.id}" data-direction="1" type="button">Move Down</button>
          <button class="danger-button" data-remove-stop="${stop.id}" type="button">Remove</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderCities() {
  const search = qs("#city-search")?.value.toLowerCase() || "";
  const region = qs("#region-filter")?.value || "all";
  const filtered = cities.filter(city => {
    const matchesText = `${city.name} ${city.country}`.toLowerCase().includes(search);
    const matchesRegion = region === "all" || city.region === region;
    return matchesText && matchesRegion;
  });
  qs("#city-results").innerHTML = filtered.map(cityCard).join("") || `<div class="empty-state">No cities match that search.</div>`;
}

function cityCard(city) {
  return `
    <article class="destination-card">
      <div class="card-media" style="background-image:url('${escapeHtml(city.image)}')"></div>
      <div class="card-body">
        <h3>${escapeHtml(city.name)}</h3>
        <p>${escapeHtml(city.summary)}</p>
        <div class="pill-row">
          <span class="pill">${escapeHtml(city.country)}</span>
          <span class="pill">${escapeHtml(city.costIndex)}</span>
          <span class="pill">${city.popularity}% popular</span>
        </div>
        <button class="primary-button compact" data-add-city="${city.id}" type="button">Add to Trip</button>
      </div>
    </article>
  `;
}

function renderActivities() {
  const type = qs("#activity-type")?.value || "all";
  const cost = qs("#activity-cost")?.value || "all";
  const trip = activeTrip();
  const stopCityIds = new Set((trip?.stops || []).map(stop => stop.cityId));
  const filtered = activities.filter(activity => {
    const costMatch = cost === "all"
      || (cost === "low" && activity.cost < 1500)
      || (cost === "mid" && activity.cost >= 1500 && activity.cost <= 4000)
      || (cost === "high" && activity.cost > 4000);
    const typeMatch = type === "all" || activity.type === type;
    const cityMatch = !stopCityIds.size || stopCityIds.has(activity.cityId);
    return costMatch && typeMatch && cityMatch;
  });

  qs("#activity-results").innerHTML = filtered.map(activity => {
    const city = cities.find(item => item.id === activity.cityId);
    const added = trip?.stops.some(stop => (stop.activities || []).includes(activity.id));
    return `
      <article class="activity-card">
        <div class="card-media" style="background-image:url('${escapeHtml(activity.image)}')"></div>
        <div class="card-body">
          <h3>${escapeHtml(activity.name)}</h3>
          <p>${escapeHtml(city?.name || "")} · ${escapeHtml(activity.type)} · ${escapeHtml(activity.duration)}</p>
          <div class="pill-row">
            <span class="pill">${INR.format(activity.cost)}</span>
            <span class="pill">${added ? "Added" : "Available"}</span>
          </div>
          <button class="${added ? "ghost-button" : "primary-button compact"}" data-toggle-activity="${activity.id}" type="button">${added ? "Remove" : "Add"} Activity</button>
        </div>
      </article>
    `;
  }).join("") || `<div class="empty-state">No activities match the selected filters.</div>`;
}

function renderBudget() {
  const trip = activeTrip();
  const costs = tripCosts(trip);
  const target = Number(trip?.targetBudget || 0);
  const segments = [
    ["Transport", costs.transport, "var(--blue-700)"],
    ["Stay", costs.stay, "var(--blue-500)"],
    ["Activities", costs.activities, "var(--cyan)"],
    ["Meals", costs.meals, "var(--blue-300)"]
  ];

  qs("#budget-total").textContent = INR.format(costs.total);
  qs("#budget-alert").textContent = target && costs.total > target
    ? `Over target by ${INR.format(costs.total - target)}. Trim premium activities or transport.`
    : target
      ? `Within target. Remaining buffer: ${INR.format(target - costs.total)}.`
      : "Set a target budget while creating a trip.";

  const max = Math.max(...segments.map(([, value]) => value), 1);
  qs("#budget-bars").innerHTML = segments.map(([label, value]) => `
    <div class="bar-row">
      <div class="bar-top"><span>${label}</span><strong>${INR.format(value)}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.round((value / max) * 100)}%"></div></div>
    </div>
  `).join("");

  const total = Math.max(costs.total, 1);
  let start = 0;
  const conic = segments.map(([, value, color]) => {
    const end = start + (value / total) * 100;
    const part = `${color} ${start}% ${end}%`;
    start = end;
    return part;
  }).join(", ");
  qs("#budget-donut").style.background = `conic-gradient(${conic})`;
  qs("#budget-legend").innerHTML = segments.map(([label, value, color]) => `
    <div class="legend-item"><span class="swatch" style="background:${color}"></span><span>${label}: ${INR.format(value)}</span></div>
  `).join("");
}

function renderPacking() {
  const trip = activeTrip();
  const items = trip?.packing || [];
  const done = items.filter(item => item.done).length;
  const progress = items.length ? Math.round((done / items.length) * 100) : 0;
  qs("#packing-progress").textContent = `${progress}%`;
  qs(".progress-ring").style.setProperty("--progress", `${progress}%`);
  qs("#packing-list").innerHTML = items.length
    ? items.map(item => `
      <label class="check-item ${item.done ? "done" : ""}">
        <input type="checkbox" data-pack-toggle="${item.id}" ${item.done ? "checked" : ""}>
        <span>${escapeHtml(item.text)} <small class="pill">${escapeHtml(item.category)}</small></span>
        <button class="danger-button" data-pack-delete="${item.id}" type="button">Delete</button>
      </label>
    `).join("")
    : `<div class="empty-state">Add packing items for this trip.</div>`;
}

function renderShare() {
  const trip = activeTrip();
  const url = trip ? `${location.origin}${location.pathname}#trip-${trip.id.slice(0, 8)}` : "";
  qs("#share-url").value = url;
  qs("#public-preview").innerHTML = trip
    ? `
      <h3>${escapeHtml(trip.name)}</h3>
      <p>${escapeHtml(trip.description || "A shared Traveloop itinerary.")}</p>
      <div class="pill-row">
        <span class="pill">${formatDate(trip.start)} - ${formatDate(trip.end)}</span>
        <span class="pill">${routeText(trip)}</span>
        <span class="pill">${INR.format(tripCosts(trip).total)}</span>
      </div>
    `
    : `<div class="empty-state">Create a trip before sharing.</div>`;
}

function renderNotes() {
  const trip = activeTrip();
  const notes = trip?.notes || [];
  qs("#notes-list").innerHTML = notes.length
    ? notes.map(note => `
      <article class="note-item">
        <span>${escapeHtml(new Date(note.createdAt).toLocaleString("en-IN"))}</span>
        <p>${escapeHtml(note.text)}</p>
        <button class="danger-button" data-note-delete="${note.id}" type="button">Delete</button>
      </article>
    `).join("")
    : `<div class="empty-state">Notes and reminders will appear here.</div>`;
}

function renderProfile() {
  qs("#profile-name").value = state.profile.name || "";
  qs("#profile-email").value = state.profile.email || "";
  qs("#profile-photo").value = state.profile.photo || "";
  qs("#profile-language").value = state.profile.language || "English";
  qs("#profile-saved").value = state.profile.saved || "";
}

function renderAnalytics() {
  const cityCounts = {};
  state.trips.flatMap(trip => trip.stops).forEach(stop => {
    cityCounts[stop.cityId] = (cityCounts[stop.cityId] || 0) + 1;
  });
  const topCityId = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topCity = cities.find(city => city.id === topCityId)?.name || "-";
  const engagement = Math.min(100, state.trips.length * 18 + state.trips.flatMap(trip => trip.stops).length * 8);
  qs("#admin-trips").textContent = state.trips.length;
  qs("#admin-city").textContent = topCity;
  qs("#admin-engagement").textContent = `${engagement}%`;
  qs("#analytics-table").innerHTML = state.trips.length
    ? state.trips.map(trip => `
      <div class="table-row">
        <strong>${escapeHtml(trip.name)}</strong>
        <span>${trip.stops.length} stops · ${trip.stops.flatMap(stop => stop.activities || []).length} activities</span>
        <span>${INR.format(tripCosts(trip).total)}</span>
      </div>
    `).join("")
    : `<div class="empty-state">Analytics will populate as users create trips.</div>`;
}

function addTrip(event) {
  event.preventDefault();
  if (editingTripId) {
    const trip = state.trips.find(item => item.id === editingTripId);
    if (trip) {
      trip.name = qs("#trip-name").value.trim();
      trip.start = qs("#trip-start").value;
      trip.end = qs("#trip-end").value;
      trip.description = qs("#trip-description").value.trim();
      trip.cover = qs("#trip-cover").value.trim() || trip.cover || cities[1].image;
      trip.targetBudget = Number(qs("#trip-budget").value || 0);
      state.activeTripId = trip.id;
    }
    editingTripId = null;
    saveState();
    event.target.reset();
    qs("#trip-budget").value = 50000;
    qs("#create-view h2").textContent = "Create a Trip";
    event.target.querySelector("button[type='submit']").textContent = "Save Trip";
    switchView("trips");
    renderAll();
    return;
  }

  const trip = {
    id: crypto.randomUUID(),
    name: qs("#trip-name").value.trim(),
    start: qs("#trip-start").value,
    end: qs("#trip-end").value,
    description: qs("#trip-description").value.trim(),
    cover: qs("#trip-cover").value.trim() || cities[1].image,
    targetBudget: Number(qs("#trip-budget").value || 0),
    stops: [],
    packing: structuredClone(starterPacking),
    notes: [],
    public: false
  };
  state.trips.unshift(trip);
  state.activeTripId = trip.id;
  saveState();
  event.target.reset();
  qs("#trip-budget").value = 50000;
  switchView("builder");
  renderAll();
}

function addStop(event) {
  event.preventDefault();
  const trip = activeTrip();
  if (!trip) {
    switchView("create");
    return;
  }
  trip.stops.push({
    id: crypto.randomUUID(),
    cityId: qs("#stop-city").value,
    arrival: qs("#stop-arrival").value,
    departure: qs("#stop-departure").value,
    stay: Number(qs("#stop-stay").value || 0),
    transport: Number(qs("#stop-transport").value || 0),
    activities: []
  });
  saveState();
  event.target.reset();
  qs("#stop-stay").value = 6000;
  qs("#stop-transport").value = 3500;
  renderAll();
}

function addCityToTrip(cityId) {
  const trip = activeTrip();
  if (!trip) {
    switchView("create");
    return;
  }
  trip.stops.push({
    id: crypto.randomUUID(),
    cityId,
    arrival: trip.start,
    departure: trip.start,
    stay: 6000,
    transport: 3500,
    activities: []
  });
  saveState();
  switchView("builder");
  renderAll();
}

function toggleActivity(activityId) {
  const trip = activeTrip();
  if (!trip) return;
  const activity = activities.find(item => item.id === activityId);
  let stop = trip.stops.find(item => item.cityId === activity.cityId);
  if (!stop) {
    stop = { id: crypto.randomUUID(), cityId: activity.cityId, arrival: trip.start, departure: trip.start, stay: 6000, transport: 3500, activities: [] };
    trip.stops.push(stop);
  }
  const hasActivity = stop.activities.includes(activityId);
  stop.activities = hasActivity ? stop.activities.filter(id => id !== activityId) : [...stop.activities, activityId];
  saveState();
  renderAll();
}

function moveStop(stopId, direction) {
  const trip = activeTrip();
  if (!trip) return;
  const index = trip.stops.findIndex(stop => stop.id === stopId);
  const next = index + Number(direction);
  if (index < 0 || next < 0 || next >= trip.stops.length) return;
  const [stop] = trip.stops.splice(index, 1);
  trip.stops.splice(next, 0, stop);
  saveState();
  renderAll();
}

function removeStop(stopId) {
  const trip = activeTrip();
  if (!trip) return;
  trip.stops = trip.stops.filter(stop => stop.id !== stopId);
  saveState();
  renderAll();
}

function addPacking(event) {
  event.preventDefault();
  const trip = activeTrip();
  const text = qs("#packing-item").value.trim();
  if (!trip || !text) return;
  trip.packing.push({ id: crypto.randomUUID(), text, category: qs("#packing-category").value, done: false });
  saveState();
  event.target.reset();
  renderPacking();
}

function addNote(event) {
  event.preventDefault();
  const trip = activeTrip();
  const text = qs("#note-text").value.trim();
  if (!trip || !text) return;
  trip.notes.unshift({ id: crypto.randomUUID(), text, createdAt: new Date().toISOString() });
  saveState();
  event.target.reset();
  renderNotes();
}

function saveProfile(event) {
  event.preventDefault();
  state.profile = {
    name: qs("#profile-name").value.trim(),
    email: qs("#profile-email").value.trim(),
    photo: qs("#profile-photo").value.trim(),
    language: qs("#profile-language").value,
    saved: qs("#profile-saved").value.trim()
  };
  state.user = { ...state.user, name: state.profile.name, email: state.profile.email };
  saveState();
  renderDashboard();
}

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.id === "signin-tab") switchAuth("signin");
  if (target.id === "signup-tab") switchAuth("signup");
  if (target.id === "forgot-password") qs("#auth-message").textContent = "Password reset link simulated. Use any 6+ character password.";
  if (target.id === "logout-button") {
    state.user = null;
    saveState();
    showApp();
  }
  if (target.id === "quick-new-trip") enterCreateMode();
  if (target.id === "copy-share") {
    navigator.clipboard?.writeText(qs("#share-url").value);
    target.textContent = "Copied";
    setTimeout(() => target.textContent = "Copy Link", 1000);
  }
  if (target.id === "reset-packing") {
    const trip = activeTrip();
    if (trip) trip.packing.forEach(item => item.done = false);
    saveState();
    renderPacking();
  }
  if (target.classList.contains("nav-item")) {
    if (target.dataset.view === "create") enterCreateMode();
    else switchView(target.dataset.view);
  }
  if (target.dataset.viewJump) {
    if (target.dataset.viewJump === "create") enterCreateMode();
    else switchView(target.dataset.viewJump);
  }
  if (target.dataset.selectTrip) {
    setActiveTrip(target.dataset.selectTrip);
    switchView("builder");
  }
  if (target.dataset.editTrip) {
    setActiveTrip(target.dataset.editTrip);
    enterCreateMode(target.dataset.editTrip);
  }
  if (target.dataset.deleteTrip) {
    state.trips = state.trips.filter(trip => trip.id !== target.dataset.deleteTrip);
    state.activeTripId = state.trips[0]?.id || null;
    saveState();
    renderAll();
  }
  if (target.dataset.addCity) addCityToTrip(target.dataset.addCity);
  if (target.dataset.toggleActivity) toggleActivity(target.dataset.toggleActivity);
  if (target.dataset.removeStop) removeStop(target.dataset.removeStop);
  if (target.dataset.moveStop) moveStop(target.dataset.moveStop, target.dataset.direction);
  if (target.dataset.packDelete) {
    const trip = activeTrip();
    trip.packing = trip.packing.filter(item => item.id !== target.dataset.packDelete);
    saveState();
    renderPacking();
  }
  if (target.dataset.noteDelete) {
    const trip = activeTrip();
    trip.notes = trip.notes.filter(note => note.id !== target.dataset.noteDelete);
    saveState();
    renderNotes();
  }
  if (target.dataset.mode) {
    itineraryMode = target.dataset.mode;
    qsa(".segment").forEach(item => item.classList.toggle("active", item.dataset.mode === itineraryMode));
    renderItinerary();
  }
});

document.addEventListener("change", event => {
  if (event.target.id === "active-trip-select") setActiveTrip(event.target.value);
  if (event.target.id === "region-filter") renderCities();
  if (event.target.id === "activity-type" || event.target.id === "activity-cost") renderActivities();
  if (event.target.dataset.packToggle) {
    const trip = activeTrip();
    const item = trip?.packing.find(entry => entry.id === event.target.dataset.packToggle);
    if (item) item.done = event.target.checked;
    saveState();
    renderPacking();
  }
});

document.addEventListener("input", event => {
  if (event.target.id === "city-search") renderCities();
});

qs("#auth-form").addEventListener("submit", authenticate);
qs("#trip-form").addEventListener("submit", addTrip);
qs("#stop-form").addEventListener("submit", addStop);
qs("#packing-form").addEventListener("submit", addPacking);
qs("#note-form").addEventListener("submit", addNote);
qs("#profile-form").addEventListener("submit", saveProfile);

showApp();
