// article.js

/**
 * Carica e renderizza un singolo articolo
 */
async function loadArticle() {
    // 1. Ottieni l'ID dell'articolo dall'URL
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    const container = document.getElementById('articleContent');

    if (!articleId) {
        container.innerHTML = "<h1>Article not found.</h1><p>No ID provided.</p>";
        return;
    }

    try {
        // 2. Carica i dati
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // 3. Trova l'articolo corretto
        // Usiamo == invece di === perché l'ID dall'URL è una stringa
        const article = data.articles.find(a => a.id == articleId);

        // 4. Renderizza l'articolo
        if (article) {
            document.title = `${article.title} | Ivan Maieli`;
            
            container.innerHTML = `
                <a href="index.html#writing" class="back-link">← Back to Writing</a>
                <h1>${article.title}</h1>
                <div class="article-date">${article.dateFormatted}</div>
                <div class="full-text">
                    ${article.content}
                </div>
            `;
        } else {
            document.title = "Article Not Found | Ivan Maieli";
            container.innerHTML = `
                <a href="index.html#writing" class="back-link">← Back to Writing</a>
                <h1>Article Not Found</h1>
                <p>The article you are looking for does not exist.</p>
            `;
        }
    } catch (e) {
        console.error("Error loading article:", e);
        container.innerHTML = "<h1>Error</h1><p>Could not load article content.</p>";
    }
}

// Avvia
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArticle);
} else {
    loadArticle();
}