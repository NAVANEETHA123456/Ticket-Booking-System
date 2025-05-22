let events = [
    { id: 1, name: "Rock Concert", date: "2025-06-15", category: "Concert", available: 50 },
    { id: 2, name: "Movie Night", date: "2025-06-20", category: "Movie", available: 30 },
    { id: 3, name: "Flight to Paris", date: "2025-07-01", category: "Travel", available: 10 },
];

let selectedEventId = null;

document.addEventListener("DOMContentLoaded", () => {
    renderEvents();
    document.getElementById("themeToggle").onclick = toggleTheme;
});

function renderEvents(filtered = events) {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";
    filtered.forEach(event => {
        container.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">Date: ${event.date}</p>
            <p class="card-text">Category: ${event.category}</p>
            <p class="card-text">Available: ${event.available}</p>
            <button class="btn btn-primary" onclick="openBooking(${event.id})" ${event.available <= 0 ? "disabled" : ""}>Book</button>
          </div>
        </div>
      </div>`;
    });
}

function openBooking(id) {
    selectedEventId = id;
    const event = events.find(e => e.id === id);
    document.getElementById(`("eventDetails").textContent = ${event.name} on ${event.date}`);
    const modal = new bootstrap.Modal(document.getElementById("bookingModal"));
    modal.show();
}

function confirmBooking() {
    const count = parseInt(document.getElementById("ticketCount").value);
    const event = events.find(e => e.id === selectedEventId);
    if (count > 0 && event.available >= count) {
        event.available -= count;
        renderEvents();
        const toast = new bootstrap.Toast(document.getElementById("bookingToast"));
        toast.show();
        bootstrap.Modal.getInstance(document.getElementById("bookingModal")).hide();
    } else {
        alert("Invalid ticket count or insufficient availability.");
    }
}

function filterEvents() {
    const category = document.getElementById("categoryFilter").value;
    const date = document.getElementById("dateFilter").value;
    const filtered = events.filter(e => {
        return (!category || e.category === category) && (!date || e.date === date);
    });
    renderEvents(filtered);
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
}