document.addEventListener("DOMContentLoaded", () => {
    // Effet de défilement progressif pour chaque section
    const sections = document.querySelectorAll("section");
    const options = { threshold: 0.1 };
    
    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        });
    }, options);

    sections.forEach(section => {
        appearOnScroll.observe(section);
    });

    // Animation de clic sur les boutons
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.target.classList.add("button-clicked");
            setTimeout(() => {
                e.target.classList.remove("button-clicked");
            }, 300);
        });
    });
    
    // Animation de rebond sur la section "À la une" pour attirer l’attention
    const featuredSection = document.querySelector(".featured");
    if (featuredSection) {
        setInterval(() => {
            featuredSection.classList.add("bounce");
            setTimeout(() => {
                featuredSection.classList.remove("bounce");
            }, 1000);
        }, 5000); // Rebond toutes les 5 secondes
    }

    // Initialiser le calendrier avec FullCalendar
    const calendarEl = document.getElementById("calendar");
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: "dayGridMonth",
            locale: "fr",
            events: [
                {
                    title: "Atelier Sportif",
                    start: "2024-10-12T10:00:00",
                    end: "2024-10-12T12:00:00",
                    location: "Parc des Sports",
                    description: "Un atelier sportif pour découvrir de nouvelles activités et rencontrer des jeunes.",
                },
                {
                    title: "Exposition Culturelle",
                    start: "2024-10-15T14:00:00",
                    end: "2024-10-15T18:00:00",
                    location: "Centre Culturel",
                    description: "Exposition d'art local et d'initiatives culturelles dans les Hauts-de-Seine.",
                },
                {
                    title: "Forum de l’Emploi",
                    start: "2024-10-20T09:00:00",
                    end: "2024-10-20T17:00:00",
                    location: "Salle des Fêtes",
                    description: "Forum pour découvrir des opportunités d'emploi et des ressources pour les jeunes.",
                }
            ],
            eventClick: function(info) {
                // Empêcher la redirection par défaut
                info.jsEvent.preventDefault();

                // Afficher les détails de l'événement dans la modale
                document.getElementById("eventTitle").innerText = info.event.title;
                document.getElementById("eventDescription").innerText = info.event.extendedProps.description;
                document.getElementById("eventLocation").innerText = info.event.extendedProps.location;
                document.getElementById("eventTime").innerText = info.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " - " +
                    info.event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                // Ouvrir la modale
                document.getElementById("eventModal").style.display = "block";
            }
        });

        calendar.render();
    }

    // Gestion de la modale d'événement
    const modal = document.getElementById("eventModal");
    const closeModal = document.getElementsByClassName("close")[0];
    
    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
        }
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
