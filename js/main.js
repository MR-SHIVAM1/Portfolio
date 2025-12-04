// Main JavaScript for Portfolio Website

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const themeOptions = document.querySelectorAll('.theme-option');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const projectsGrid = document.getElementById('projectsGrid');
const skillLists = document.querySelectorAll('.skill-list');
const currentYear = document.getElementById('currentYear');
const navbar = document.querySelector('.navbar');

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize theme system
    initThemeSystem();
    
    // Initialize projects
    renderProjects();
    
    // Initialize skills
    renderSkills();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navbar scroll effect
    initNavbarScroll();
});

// Theme System
function initThemeSystem() {
    // Get saved theme from localStorage or default to 'aurora'
    const savedTheme = localStorage.getItem('portfolio-theme') || 'aurora';
    document.body.className = `theme-${savedTheme}`;
    
    // Theme switcher toggle
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const themeOptions = document.querySelector('.theme-options');
        themeOptions.classList.toggle('active');
    });
    
    // Theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            // Apply theme with animation
            document.body.classList.add('theme-changing');
            setTimeout(() => {
                document.body.className = `theme-${theme}`;
                localStorage.setItem('portfolio-theme', theme);
                
                // Update active theme in switcher
                themeOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                setTimeout(() => {
                    document.body.classList.remove('theme-changing');
                }, 300);
            }, 300);
        });
        
        // Mark active theme
        if (option.getAttribute('data-theme') === savedTheme) {
            option.classList.add('active');
        }
    });
    
    // Close theme options when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.theme-switcher')) {
            document.querySelector('.theme-options').classList.remove('active');
        }
    });
}

// Navigation
function initNavigation() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Projects Data and Rendering
const projects = [
    {
        id: 1,
        title: "Nature Connect - Eco Social Platform",
        description: "A social platform connecting environmental enthusiasts, featuring interactive maps, eco-challenges, and sustainable living resources.",
        image: "assets/project1.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Mapbox", "Tailwind"],
        demoLink: "https://demo.natureconnect.com",
        codeLink: "https://github.com/shivam/nature-connect"
    },
    {
        id: 2,
        title: "Zen Garden Meditation App",
        description: "A meditation and mindfulness application with nature sounds, guided sessions, and daily reflection journal.",
        image: "assets/project2.jpg",
        technologies: ["Vue.js", "Firebase", "Web Audio API", "PWA", "CSS Grid"],
        demoLink: "https://demo.zengarden.app",
        codeLink: "https://github.com/shivam/zen-garden"
    },
    {
        id: 3,
        title: "Forest Data Visualization Dashboard",
        description: "Interactive dashboard for visualizing deforestation data, climate patterns, and conservation efforts worldwide.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        technologies: ["D3.js", "Python", "Flask", "PostgreSQL", "Chart.js"],
        demoLink: "https://demo.forestdash.com",
        codeLink: "https://github.com/shivam/forest-dashboard"
    },
    {
        id: 4,
        title: "Sustainable E-commerce Platform",
        description: "An e-commerce platform exclusively for eco-friendly products with carbon footprint tracking for each purchase.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        technologies: ["Next.js", "Stripe", "MongoDB", "Redis", "Docker"],
        demoLink: "https://demo.ecobuy.com",
        codeLink: "https://github.com/shivam/ecobuy"
    },
    {
        id: 5,
        title: "Wildlife Tracking Mobile App",
        description: "Mobile application for wildlife researchers to track animal movements, record observations, and share data.",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        technologies: ["React Native", "GraphQL", "AWS", "Mapbox", "Jest"],
        demoLink: "https://demo.wildtrack.app",
        codeLink: "https://github.com/shivam/wildtrack"
    },
    {
        id: 6,
        title: "Climate Change Educational Portal",
        description: "Interactive educational platform with courses, simulations, and AR experiences about climate science.",
        image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        technologies: ["Three.js", "WebGL", "Node.js", "WebRTC", "AR.js"],
        demoLink: "https://demo.climatelearn.com",
        codeLink: "https://github.com/shivam/climate-learn"
    }
];

function renderProjects() {
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        projectCard.innerHTML = `
            <div class="project-image"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${techTags}</div>
                <div class="project-buttons">
                    <a href="${project.demoLink}" target="_blank" class="btn btn-primary">Live Demo</a>
                    <a href="${project.codeLink}" target="_blank" class="btn btn-outline">Code</a>
                </div>
            </div>
        `;
        
        // Set background image for project
        const projectImage = projectCard.querySelector('.project-image');
        projectImage.style.backgroundImage = `url('${project.image}')`;
        projectImage.style.backgroundSize = 'cover';
        projectImage.style.backgroundPosition = 'center';
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Trigger fade-in animation for projects
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => card.classList.add('visible'));
    }, 300);
}

// Skills Data and Rendering
const skills = {
    frontend: [
        { name: "HTML/CSS", percentage: 95, icon: "fab fa-html5" },
        { name: "JavaScript", percentage: 90, icon: "fab fa-js" },
        { name: "React", percentage: 85, icon: "fab fa-react" },
        { name: "TypeScript", percentage: 75, icon: "fas fa-code" }
    ],
    backend: [
        { name: "Node.js", percentage: 88, icon: "fab fa-node-js" },
        { name: "Python", percentage: 85, icon: "fab fa-python" },
        { name: "Express", percentage: 82, icon: "fas fa-server" },
        { name: "MongoDB", percentage: 78, icon: "fas fa-database" },
        
    ],
    tools: [
        { name: "Git", percentage: 100, icon: "fab fa-git-alt" },
      
    ]
};

function renderSkills() {
    const skillCategories = document.querySelectorAll('.skill-list');
    
    skillCategories.forEach((category, index) => {
        category.innerHTML = '';
        const skillType = Object.keys(skills)[index];
        
        skills[skillType].forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item fade-in';
            
            skillItem.innerHTML = `
                <div class="skill-header">
                    <span class="skill-name">
                        <i class="${skill.icon} skill-icon"></i>
                        ${skill.name}
                    </span>
                    <span class="skill-percentage">${skill.percentage}%</span>
                </div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.percentage}%"></div>
                </div>
            `;
            
            category.appendChild(skillItem);
        });
    });
    
    // Trigger fade-in animation for skills
    setTimeout(() => {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => item.classList.add('visible'));
    }, 500);
}

// Contact Form
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous messages
        resetFormMessages();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form
        let isValid = true;
        
        if (name.length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (message.length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            showFormMessage('Sending your message...', 'info');
            
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Reset form labels
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
                    field.dispatchEvent(new Event('input'));
                });
            }, 1500);
        }
    });
    
    // Real-time validation
    document.getElementById('name').addEventListener('input', function() {
        if (this.value.trim().length >= 2) {
            hideError('nameError');
        }
    });
    
    document.getElementById('email').addEventListener('input', function() {
        if (isValidEmail(this.value.trim())) {
            hideError('emailError');
        }
    });
    
    document.getElementById('message').addEventListener('input', function() {
        if (this.value.trim().length >= 10) {
            hideError('messageError');
        }
    });
}

function resetFormMessages() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.style.opacity = '0';
    });
    
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    formMessage.style.opacity = '0';
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.opacity = '1';
}

function hideError(elementId) {
    const element = document.getElementById(elementId);
    element.style.opacity = '0';
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.opacity = '1';
    
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.opacity = '0';
        }, 5000);
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Add fade-in class to sections for scroll animation
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
});