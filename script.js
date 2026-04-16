// 1. DADOS DINÂMICOS
const galeriaData = [
    { title: "Espadas Katanas", desc: "Perfeitas para fatiar... legumes." },
    { title: "Fator de Cura", desc: "Eu sobrevivo a quase tudo, até esse código." },
    { title: "Quebra da 4ª Parede", desc: "Sim, eu estou olhando para você agora." }
];

const faqData = [
    { q: "Deadpool é um herói?", a: "Depende de quem você perguntar e de quanto me pagarem." },
    { q: "Qual a comida favorita?", a: "Chimichangas! Embora eu só goste de dizer a palavra." }
];

// 2. RENDERIZAÇÃO
function renderContent() {
    const galleryContainer = document.getElementById('gallery-wrapper');
    const faqContainer = document.getElementById('faq-container');

    // Render Cards
    galleryContainer.innerHTML = galeriaData.map(item => `
        <article class="card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
        </article>
    `).join('');

    // Render Accordion
    faqContainer.innerHTML = faqData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-header" aria-expanded="false" onclick="toggleAccordion(${index})">
                ${item.q}
            </button>
            <div class="accordion-content" id="faq-${index}">
                <p>${item.a}</p>
            </div>
        </div>
    `).join('');
}

// 3. ACESSIBILIDADE: CONTROLE DE FONTE E CONTRASTE
let fontSize = 100;
document.getElementById('increase-font').addEventListener('click', () => {
    fontSize += 10;
    document.documentElement.style.fontSize = `${fontSize}%`;
});

document.getElementById('decrease-font').addEventListener('click', () => {
    fontSize -= 10;
    document.documentElement.style.fontSize = `${fontSize}%`;
});

document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// 4. COMPONENTES: ACORDEÃO
function toggleAccordion(index) {
    const contents = document.querySelectorAll('.accordion-content');
    const content = contents[index];
    const isVisible = content.classList.contains('active');
    
    // Fecha todos
    contents.forEach(c => c.classList.remove('active'));
    
    // Abre o selecionado
    if (!isVisible) {
        content.classList.add('active');
    }
}

// 5. SCROLL REVEAL (Intersection Observer API)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    renderContent();
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});
