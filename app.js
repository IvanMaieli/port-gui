// app.js - VERSIONE CON PAGINAZIONE E FETCH

// Dati info personali (questi possono rimanere qui)
const infoData = {
    name: "Ivan Maieli",
    title: "Computer Engineering Student",
    location: "Bologna, IT",
    year: "2025",
    about: {
        lead: "Building systems that cannot afford to crash. Focused on autonomous vehicles, rocket guidance systems, and real-time operating systems.",
        description: "Currently working on driverless race cars at Unibo Motorsport (Driverless Division) and rocket GNC systems at Aurora Rocketry. Interested in everything that runs on bare metal and controls hardware in real-time."
    },
    technologies: [
        "C/C++",
        "Python",
        "Java",
        "Golang",
        "Git",
        "MATLAB",
        "ROS2",
        "Machine Learning",
        "Linux"
    ],
    contact: {
        email: "ivan.maieli@gmail.com",
        github: "github.com/IvanMaieli",
        linkedin: "linkedin.com/in/ivan-maieli"
    },
    currentWork: [
        { company: "Unibo Motorsport (Driverless Division)" },
        { company: "Aurora Rocketry" }
    ]
};

// Variabili globali per i dati caricati
let allProjects = [];
let allArticles = [];

// Configurazione paginazione
const ARTICLES_PER_PAGE = 4; // *** Impostato a 4 come da richiesta ***
let currentPage = 1;

// Carica info personali
function loadInfo() {
    const nameParts = infoData.name.split(' ');
    document.querySelector('.name').innerHTML = `${nameParts[0]}<br>${nameParts[1]}`;
    
    const metaEl = document.querySelector('.meta');
    metaEl.innerHTML = `
        <span>${infoData.title}</span>
        <span>•</span>
        <span>${infoData.location}</span>
        <span>•</span>
        <span>${infoData.year}</span>
    `;

    document.querySelector('.lead').textContent = infoData.about.lead;
    
    const aboutDesc = document.querySelector('.about p:nth-of-type(2)');
    let descHTML = infoData.about.description;
    infoData.currentWork.forEach(work => {
        descHTML = descHTML.replace(work.company, `<mark>${work.company}</mark>`);
    });
    aboutDesc.innerHTML = descHTML;

    const techList = document.querySelector('.tech-list');
    techList.innerHTML = infoData.technologies.map(tech => 
        `<span>${tech}</span>`
    ).join('');

    const contactMethods = document.querySelector('.contact-methods');
    contactMethods.innerHTML = `
        <div class="contact-item">
            <span class="label">Email</span>
            <a href="mailto:${infoData.contact.email}">${infoData.contact.email}</a>
        </div>
        <div class="contact-item">
            <span class="label">GitHub</span>
            <a href="https://${infoData.contact.github}" target="_blank">${infoData.contact.github}</a>
        </div>
        <div class="contact-item">
            <span class="label">LinkedIn</span>
            <a href="https://${infoData.contact.linkedin}" target="_blank">${infoData.contact.linkedin}</a>
        </div>
    `;

    document.querySelector('.header-name').textContent = infoData.name;
}

// Carica progetti
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = ''; // Pulisci
    const projects = allProjects.filter(p => p.featured);
    
    projects.forEach(project => {
        const article = document.createElement('article');
        article.className = 'project';
        
        article.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-year">${project.year}</span>
            </div>
            <div class="project-role">${project.role}</div>
            <p class="project-desc">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag} |</span>`).join('')}
            </div>
        `;
        
        container.appendChild(article);
    });
}

// Carica articoli con paginazione
function loadArticles(page = 1) {
    const container = document.getElementById('articlesContainer');
    const articles = allArticles.filter(a => a.published);
    
    // Calcola indici
    const totalArticles = articles.length;
    const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
    const startIndex = (page - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const articlesToShow = articles.slice(startIndex, endIndex);
    
    // Pulisci container
    container.innerHTML = '';
    
    // Renderizza articoli
    articlesToShow.forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.className = 'article';
        
        // *** MODIFICATO: link a article.html con ID ***
        articleEl.innerHTML = `
            <a href="article.html?id=${article.id}" class="article-title">${article.title}</a>
            <div class="article-date">${article.dateFormatted}</div>
            <p class="article-excerpt">${article.excerpt}</p>
        `;
        
        container.appendChild(articleEl);
    });
    
    // Renderizza paginazione
    if (totalPages > 1) {
        const pagination = document.createElement('div');
        pagination.className = 'pagination';
        
        let paginationHTML = '';
        
        // Bottone Previous
        if (page > 1) {
            paginationHTML += `<button class="page-btn" data-page="${page - 1}">← Previous</button>`;
        }
        
        // Numeri pagina
        for (let i = 1; i <= totalPages; i++) {
            if (i === page) {
                paginationHTML += `<span class="page-number active">${i}</span>`;
            } else {
                paginationHTML += `<button class="page-number" data-page="${i}">${i}</button>`;
            }
        }
        
        // Bottone Next
        if (page < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${page + 1}">Next →</button>`;
        }
        
        pagination.innerHTML = paginationHTML;
        container.appendChild(pagination);
        
        // Event listeners per paginazione
        pagination.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const newPage = parseInt(btn.dataset.page);
                currentPage = newPage;
                loadArticles(newPage); // Ricarica gli articoli per la nuova pagina
                // Scroll alla sezione writing
                document.getElementById('writing').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
}

// Inizializza tutto
function init() {
    loadInfo();
    loadProjects();
    loadArticles(currentPage);
}

// Funzione principale per caricare i dati e avviare l'app
async function startApp() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Popola le variabili globali
        allProjects = data.projects || [];
        allArticles = data.articles || [];
        
        // Avvia il rendering della pagina
        init();

    } catch (e) {
        console.error("Impossibile caricare i dati:", e);
        // Mostra un errore all'utente se necessario
        const container = document.getElementById('projectsContainer');
        container.innerHTML = "<p>Error loading content. Please try again later.</p>";
    }
}

// Avvia l'app
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}