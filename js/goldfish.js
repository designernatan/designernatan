// Traduções para diferentes seções do site
const translations = {
    // Navegação
    navigation: {
        pt: {
            about: "Sobre",
            work: "Trabalho",
            blogUxTips: "Dicas UX",
            courses: "Cursos",
            books: "Livros",
            contact: "Contato"
        },
        en: {
            about: "About",
            work: "Work",
            blogUxTips: "UX Tips",
            courses: "Courses", 
            books: "Books",
            contact: "Contact"
        }
    },
    
    // Seção de apresentação
    minibio: {
        pt: `Como <strong>designer e líder</strong>, minha carreira se concentra em melhorar a experiência do usuário, especialmente na educação. Já ensinei grupos diversos, liderei projetos impactantes e desenvolvi uma compreensão profunda de estratégia de produto e negócios. Prospero na resolução criativa de problemas e busco continuamente novos conhecimentos.
<br><br>
Junto ao meu trabalho, gosto de treinar meu cachorro e compartilhar insights no meu <a href="https://www.dicasux.com.br">blog Dicas UX</a>, bem como através dos dois livros que publiquei sobre desenvolvimento front-end.`,
        en: `As a <strong>designer and leader</strong>, my career centers around enhancing user experience, especially in education. I've taught diverse groups, led impactful projects, and developed a deep understanding of product and business strategy. I thrive on creative problem-solving and continually seek new knowledge.
<br><br>
Alongside my work, I enjoy training my dog and sharing insights on my <a href="https://translate.google.com/translate?sl=pt&tl=en&u=https%3A%2F%2Fwww.dicasux.com.br">UX Tips blog</a>, as well as through the two books I published on front-end development.`
    },

    buttons: {
        pt: {
            download: ' Baixar currículo',
            mailMe: 'Mandar e-mail'
        },
        en: {
            download: ' Download resume',
            mailMe: 'Mail me'
        }
    },

    // Seção de cursos
    coursesSectionTitle: {
        pt: "Mais de <strong>200.000</strong> estudantes capacitados",
        en: "Over <strong>200,000</strong> students empowered"
    },

    coursesSectionSubtitle: {
        pt: "Com mais de 200.000 matrículas e notas 9.0+, meus cursos oferecem insights práticos em UX e habilidades front-end",
        en: "With over 200,000 enrollments and 9.0+ ratings, my courses offer actionable insights into UX and front-end skills"
    },

    // Seção de livros
    booksSectionTitle: {
        pt: "Livros publicados",
        en: "Published books"
    },

    booksSectionSubtitle: {
        pt: "Autor orgulhoso com mais de mil cópias vendidas",
        en: "Proud author with over a thousand copies sold"
    },

    books: {
        pt: {
            bootstrap: "Bootstrap 4: A biblioteca front-end mais usada",
            sass: "Sass: Aprendendo Pré-processadores CSS"
        },
        en: {
            bootstrap: "Bootstrap 4: The most used front-end library",
            sass: "Sass: Learning CSS Preprocessors"
        }
    }
};

// Função para alternar idioma
function toggleLanguage(targetLang) {
    const currentLang = document.documentElement.lang;
    const newLang = targetLang || (currentLang === 'en' ? 'pt' : 'en');
    
    document.documentElement.lang = newLang;

    // Salva a escolha de idioma no localStorage
    localStorage.setItem('preferredLanguage', newLang);

    // Atualiza navegação
    const navItems = document.querySelectorAll('.menu-item-link');
    navItems.forEach((item, index) => {
        const keys = Object.keys(translations.navigation[newLang]);
        item.textContent = translations.navigation[newLang][keys[index]];
        
        // Atualiza links especiais
        if (item.href.includes('mailto:')) return;
        if (item.href.includes('figma.com')) return;
        
        switch(keys[index]) {
            case 'blogUxTips':
                item.href = newLang === 'pt' 
                    ? 'https://www.dicasux.com.br'
                    : 'https://translate.google.com/translate?sl=pt&tl=en&u=https%3A%2F%2Fwww.dicasux.com.br';
                break;
        }
    });

    // Atualiza linguagem ativa nos botões de idioma
    const langPt = document.getElementById('lang-pt');
    const langEn = document.getElementById('lang-en');
    
    if (newLang === 'pt') {
        langPt.classList.add('menu-language-item-active');
        langEn.classList.remove('menu-language-item-active');
    } else {
        langEn.classList.add('menu-language-item-active');
        langPt.classList.remove('menu-language-item-active');
    }

    // Atualiza mini-bio
    const minibio = document.querySelector('.sectionMinibio p');
    if (minibio) {
        minibio.innerHTML = translations.minibio[newLang];
    }

    // Atualiza título dos cursos
    const courseCardTitle = document.querySelector('.card-inverted h1');
    if (courseCardTitle) {
        courseCardTitle.innerHTML = translations.coursesSectionTitle[newLang];
    }

    const courseCardSubtitle = document.querySelector('.card-inverted p');
    if (courseCardSubtitle) {
        courseCardSubtitle.innerHTML = translations.coursesSectionSubtitle[newLang];
    }

    // Atualiza seção de livros
    const booksTitle = document.querySelector('#books h2');
    if (booksTitle) {
        booksTitle.textContent = translations.booksSectionTitle[newLang];
    }

    const booksSubtitle = document.querySelector('#books p');
    if (booksSubtitle) {
        booksSubtitle.textContent = translations.booksSectionSubtitle[newLang];
    }

    // Atualiza títulos dos livros
    const bookLinks = document.querySelectorAll('.book');
    bookLinks.forEach((book, index) => {
        const bookKeys = Object.keys(translations.books[newLang]);
        const bookKey = bookKeys[index];
        if (bookKey) {
            book.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
                    node.textContent = translations.books[newLang][bookKey];
                }
            });
        }
    });

    // Atualiza botões
    const buttons = document.querySelectorAll('.sectionSocial-button, .button-ghost');
    buttons.forEach((button) => {
        button.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                const trimmedText = node.textContent.trim();
                if (trimmedText === translations.buttons.en.download || trimmedText === translations.buttons.pt.download) {
                    node.textContent = translations.buttons[newLang].download;
                } else if (trimmedText === translations.buttons.en.mailMe || trimmedText === translations.buttons.pt.mailMe) {
                    node.textContent = translations.buttons[newLang].mailMe;
                }
            }
        });
        // Atualiza link do botão 'Download resume' conforme o idioma
        if (button.textContent.trim() === translations.buttons.pt.download) {
            button.setAttribute('href', 'download/cv-natan-ptbr.pdf');
        } else if (button.textContent.trim() === translations.buttons.en.download) {
            button.setAttribute('href', 'download/cv-natan-ing-brazil.pdf');
        }
    });
}

// Inicializa com o idioma salvo ou com inglês
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const langButtons = document.querySelectorAll('.menu-language-item');
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Impede que o link padrão '#' mova a página para o topo
            const targetLang = e.target.id.split('-')[1];
            toggleLanguage(targetLang);
        });
    });

    // Configura o idioma salvo ou inglês como padrão
    toggleLanguage(savedLanguage);
});
