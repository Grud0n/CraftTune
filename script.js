document.addEventListener('DOMContentLoaded', function () {
  // Event-Listener für den Button hinzufügen
  document.getElementById('add-box-button').addEventListener('click', openPopup);
  document.getElementById('closePopup').addEventListener('click', closePopup);
  document.getElementById('submitData').addEventListener('click', submitData);
  // Event-Listener für den Zurück-Button hinzufügen
  document.getElementById('back-button').addEventListener('click', function () {
    window.history.back(); // Zurück zur vorherigen Seite
  });
  // Event-Listener für Klicks auf die Boxen hinzufügen
  var boxes = document.querySelectorAll('.craftsman-box');
  boxes.forEach(function (box) {
    box.addEventListener('click', function () {
      var companyId = box.dataset.companyId; // ID der Firma aus dem Datenattribut erhalten
      // Hier kannst du die Firma laden und die entsprechenden Informationen anzeigen
      loadCompanyDetails(companyId);
    });
  });
  // Event-Listener für Kategorien im Dropdown hinzufügen
  var categoryLinks = document.querySelectorAll('.dropdown-content a');
  categoryLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      openPopup(link.dataset.category);
    });
  });

  // Laden der Firmendetails
  loadCompanyDetails();

  // Event-Listener für Zurück-Button hinzufügen
  document.getElementById('back-button').addEventListener('click', function () {
    window.history.back(); // Zurück zur vorherigen Seite
  });

  // Event-Listener für Sterne hinzufügen
  var stars = document.querySelectorAll('.star');
  stars.forEach(function (star) {
    star.addEventListener('click', function () {
      var rating = parseInt(star.dataset.rating); // Bewertungswert aus dem Datenattribut erhalten
      // Hier kannst du die Bewertung verarbeiten, z.B. an einen Server senden
      console.log('Bewertung:', rating);
    });
  });

  // Event-Listener für Bewertungsabsenden hinzufügen
  document.getElementById('submit-review').addEventListener('click', function () {
    var reviewText = document.getElementById('review-text').value; // Bewertungstext erhalten
    // Hier kannst du den Bewertungstext verarbeiten, z.B. an einen Server senden
    console.log('Bewertungstext:', reviewText);
  });
});

// Funktion zum Laden der Firmendetails
function loadCompanyDetails(companyId) {
  // Beispiel:
  // var company = loadCompanyFromServer(companyId);
  // displayCompanyDetails(company);
}

// Funktion zum Anzeigen der Firmendetails
function displayCompanyDetails(company) {
  // Hier könntest du den HTML-Code für die Anzeige der Firmendetails generieren und in das DOM einfügen
}

// Funktion zum Laden der Firmendetails
function loadCompanyDetails() {
  // Simulierte Daten für die Handwerkerbox
  var company = {
    name: 'Firma XYZ',
    category: 'Schreiner',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    services: ['Möbelbau', 'Innenausbau'],
    location: 'Berlin, Deutschland',
    logo: 'logo.png',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24285.67829925695!2d13.37770429431232!3d52.51698701994484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDM4JzEyLjYiTiAxM8KwMDgnMTAuMCJF!5e0!3m2!1sen!2sde!4v1646349830464!5m2!1sen!2sde'
  };

  var companyDetailsContainer = document.getElementById('company-details-container');
  var html = `
    <div id="company-details">
      <img src="${company.logo}" alt="Firmenlogo">
      <h2>${company.name}</h2>
      <p>Kategorie: ${company.category}</p>
      <p>Beschreibung: ${company.description}</p>
      <p>Standort: ${company.location}</p>
      <p>Angebotene Dienstleistungen: ${company.services.join(', ')}</p>
      <iframe src="${company.mapUrl}" width="100%" height="300" frameborder="0" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    </div>
  `;
  companyDetailsContainer.innerHTML = html; // Füge HTML-Inhalt in den Container ein
}

// Funktion zum Öffnen des Popup-Fensters für das Hinzufügen einer neuen Handwerkerbox
function openPopup(selectedCategory) {
  document.getElementById('overlay').style.display = 'flex';
  // Setze die ausgewählte Kategorie im Popup
  document.getElementById('category').value = selectedCategory || '';
}

// Funktion zum Schließen des Popup-Fensters
function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  // Zurücksetzen der ausgewählten Kategorie im Popup und Felder leeren
  document.getElementById('category').value = '';
  document.getElementById('companyName').value = '';
  document.getElementById('location').value = '';
  document.getElementById('shortDescription').value = '';
}

// Funktion zum Hinzufügen einer neuen Handwerkerbox
function submitData() {
  // Daten aus den Eingabefeldern abrufen
  var companyName = document.getElementById('companyName').value;
  var location = document.getElementById('location').value;
  var category = document.getElementById('category').value;
  var shortDescription = document.getElementById('shortDescription').value;

  // Überprüfen, ob alle Felder ausgefüllt sind
  if (companyName.trim() === '' || location.trim() === '' || category.trim() === '' || shortDescription.trim() === '') {
    alert('Bitte füllen Sie alle Felder aus.');
    return; // Beende die Funktion, wenn nicht alle Felder ausgefüllt sind
  }

  // Beispiel: Daten in einer neuen Box anzeigen
  addCraftsmanBox(companyName, location, category, shortDescription);

  // Schließe das Popup
  closePopup();
}

// Funktion zum Hinzufügen einer Handwerkerbox
function addCraftsmanBox(companyName, location, category, shortDescription) {
  // Überprüfe, ob ein Container für die Kategorie bereits existiert
  let categoryContainer = document.querySelector(`.craftsman-category[data-category="${category}"]`);
  
  // Wenn kein Container existiert, erstelle einen neuen
  if (!categoryContainer) {
    categoryContainer = document.createElement('div');
    categoryContainer.className = 'craftsman-category';
    categoryContainer.dataset.category = category;
    document.getElementById('craftsman-box-container').appendChild(categoryContainer);
  }

  // Neue Box erstellen
  var newCraftsmanBox = document.createElement('div');
  newCraftsmanBox.className = 'craftsman-box';

  // Inhalt der Box
  newCraftsmanBox.innerHTML = `
    <h3>${companyName}</h3>
    <p>Standort: ${location}</p>
    <p>Kategorie: ${category}</p>
    <p>Kurzbeschreibung: ${shortDescription}</p>
  `;

  // Box zum Kategorien-Container hinzufügen
  categoryContainer.appendChild(newCraftsmanBox);
}
document.addEventListener('DOMContentLoaded', function () {
  // Event-Listener für den Button zum Wechseln zwischen den Portalen hinzufügen
  document.getElementById('business-portal').addEventListener('click', function () {
    togglePortal('business');
  });
  document.getElementById('consumer-portal').addEventListener('click', function () {
    togglePortal('consumer');
  });
});

// Funktion zum Wechseln zwischen den Portalen
function togglePortal(portal) {
  if (portal === 'business') {
    document.getElementById('business-portal').classList.add('active');
    document.getElementById('consumer-portal').classList.remove('active');
    // Hier den Code einfügen, um zum Geschäftskundenportal zu wechseln
  } else if (portal === 'consumer') {
    document.getElementById('consumer-portal').classList.add('active');
    document.getElementById('business-portal').classList.remove('active');
    // Hier den Code einfügen, um zum Privatkundenportal zu wechseln
  }
}
// JavaScript zum Umschalten zwischen Geschäfts- und Privatkunden
document.getElementById('customer-toggle').addEventListener('change', function() {
  // Hier kannst du die Logik für den Wechsel zwischen Geschäftskunden und Privatkunden implementieren
  if (this.checked) {
    // Geschäftskunden ausgewählt
    console.log('Geschäftskunden ausgewählt');
  } else {
    // Privatkunden ausgewählt
    console.log('Privatkunden ausgewählt');
  }
});
