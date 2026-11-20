/* =========================================================
   PORTFOLIO SKELETON — main.js
   Handles: Typed.js hero animation, project card rendering,
            active nav highlighting, contact form (mailto)
   ========================================================= */

/* ---------------------------------------------------------
   1) TYPED.JS — hero typing animation
   TODO: replace the strings below with your own roles/titles
   --------------------------------------------------------- */
var typed = new Typed(".text", {
    strings: ["[thing 1]", "[thing 2]", "[thing 3]"],
    typeSpeed: 50,
    backSpeed: 40,
    backDelay: 1400,
    loop: true
});

/* ---------------------------------------------------------
   2) PROJECTS DATA
   Each project supports ONE of these link types:
     - demoLink + demoLabel   → live demo (button label custom)
     - colab                  → Google Colab notebook
     - kaggle                 → Kaggle notebook
   Optional:
     - image                  → path to preview image
   TODO: replace with your own projects.
   --------------------------------------------------------- */
const projectsData = [
    {
        name: "NLP Project",
        desc: "[Short description of project 1.]",
        tech: "Colab, Python, TensorFlow",
        demoLink: "https://sites.google.com/d/1H46L9DQLHKl_Toifzp09UsymzpKWotZa/p/1nluLCjrEDKihStt8feXHxA-AuLwnjRJG/edit",
        demoLabel: "View project"
    },
    {
        name: "[Project 2]",
        desc: "[Short description of project 2.]",
        tech: "[Tech stack]",
        colab: "https://colab.research.google.com/drive/[your-id]"
    },
    {
        name: "[Project 3]",
        desc: "[Short description of project 3.]",
        tech: "[Tech stack]",
        kaggle: "https://www.kaggle.com/code/[you]/[notebook]"
    }
    
    // Add more projects here...
];

/* ---------------------------------------------------------
   3) PROJECT LINKS HELPER
   Builds the <a> markup for a single project's link(s).
   --------------------------------------------------------- */
function linkHtml(p) {
    if (p.demoLink) {
        return `<a href="${p.demoLink}" target="_blank" rel="noopener">${p.demoLabel || 'View project'} <i class='bx bx-right-arrow-alt'></i></a>`;
    }
    let out = '';
    if (p.colab) {
        out += `<a href="${p.colab}" target="_blank" rel="noopener">Colab <i class='bx bx-right-arrow-alt'></i></a>`;
    }
    if (p.kaggle) {
        out += `<a href="${p.kaggle}" target="_blank" rel="noopener">Kaggle <i class='bx bx-right-arrow-alt'></i></a>`;
    }
    return out || '<span class="no-link">—</span>';
}

/* ---------------------------------------------------------
   4) RENDER PROJECT ROWS
   Loops through projectsData and injects a .project-row into
   the #projectsGrid container in index.html.
   --------------------------------------------------------- */
const grid = document.getElementById("projectsGrid");
if (grid) {
    projectsData.forEach((p, i) => {
        const row = document.createElement("article");
        row.className = "project-row";

        const num = String(i + 1).padStart(2, "0");
        const img = p.image
            ? `<div class="project-thumb"><img src="${p.image}" alt="${p.name}"></div>`
            : "";

        row.innerHTML = `
            ${img}
            <div class="project-info">
                <span class="project-num">${num}</span>
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <span class="project-tech">${p.tech}</span>
            </div>
            <div class="project-links">${linkHtml(p)}</div>
        `;
        grid.appendChild(row);
    });
}

/* ---------------------------------------------------------
   5) ACTIVE NAV HIGHLIGHT
   Adds .active to the nav link matching the section currently
   in view while the user scrolls.
   --------------------------------------------------------- */
const sections = document.querySelectorAll("section, .hero");
const navLinks = document.querySelectorAll(".site-nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(s => {
        if (pageYOffset >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
});

/* ---------------------------------------------------------
   6) CONTACT FORM — mailto fallback
   Opens the visitor's email client with the message
   pre-filled. (No backend required for a student project.)
   TODO: replace the email address with your own.
   --------------------------------------------------------- */
const contactForm = document.getElementById("directEmailForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("senderName").value.trim();
        const email = document.getElementById("senderEmail").value.trim();
        const message = document.getElementById("messageBody").value.trim();

        const myEmail = "[your.email@example.com]"; // <-- change me

        const subject = encodeURIComponent(`Portfolio contact from ${name}`);
        const body = encodeURIComponent(
            `From: ${name} <${email}>\n\n${message}`
        );

        window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
    });
}