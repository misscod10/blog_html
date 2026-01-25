// Load translations
let translations = {};
let currentLanguage = 'en';

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('./translations.json');
        translations = await response.json();
        
        // Load saved language preference or default to English
        currentLanguage = localStorage.getItem('language') || 'en';
        document.getElementById('languageSelect').value = currentLanguage;
        
        // Apply initial translations and render content
        applyTranslations();
        renderContent();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Render dynamic content (skills, projects, blog)
function renderContent() {
    const currentData = translations[currentLanguage];
    
    // Render technical skills
    const technicalSkillsList = document.getElementById('technical-skills-list');
    if (technicalSkillsList && currentData.technical_skills) {
        technicalSkillsList.innerHTML = currentData.technical_skills
            .map(skill => `<li>${skill}</li>`)
            .join('');
    }
    
    // Render certifications
    const certificationsList = document.getElementById('certifications-list');
    if (certificationsList && currentData.certifications) {
        certificationsList.innerHTML = currentData.certifications
            .map(cert => `
                <li class="certification-item">
                    <div class="cert-timeline-dot"></div>
                    <div class="cert-content">
                        <strong>${cert.title}</strong>
                        <p class="cert-school">${cert.school}</p>
                        ${cert.period ? `<p class="cert-period">${cert.period}</p>` : ''}
                        <p>${cert.description}</p>
                    </div>
                </li>
            `)
            .join('');
    }
    
    // Render experiences
    const experiencesList = document.getElementById('experiences-list');
    if (experiencesList && currentData.experiences) {
        experiencesList.innerHTML = currentData.experiences
            .map(exp => `
                <div class="experience-item">
                    <h3>${exp.position}</h3>
                    <p class="exp-company">${exp.company}</p>
                    <p class="exp-period">${exp.period}</p>
                    <p>${exp.description}</p>
                </div>
            `)
            .join('');
    }
    
    // Render projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && currentData.projects) {
        const projectTechLabel = currentData.project_tech_label;
        projectsGrid.innerHTML = currentData.projects
            .map(project => `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p class="project-tech"><span>${projectTechLabel}</span> ${project.tech}</p>
                    <p>${project.description}</p>
                </div>
            `)
            .join('');
    }
    
    // Render blog posts
    const blogPosts = document.getElementById('blog-posts');
    if (blogPosts && currentData.blog_posts) {
        const publishedLabel = currentData.blog_published;
        blogPosts.innerHTML = currentData.blog_posts
            .map(post => `
                <article class="blog-post">
                    <h3>${post.title}</h3>
                    <p class="blog-date"><span>${publishedLabel}</span> ${post.date}</p>
                    <p>${post.excerpt}</p>
                </article>
            `)
            .join('');
    }
}

// Language switcher event listener
document.addEventListener('DOMContentLoaded', function() {
    loadTranslations();
    
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function(e) {
            currentLanguage = e.target.value;
            localStorage.setItem('language', currentLanguage);
            applyTranslations();
            renderContent();
        });
    }
});

