
// New Dark/Light Theme Switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');


if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
} else {
    toggleSwitch.checked = true;
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);




// Initial animation for the home section
document.addEventListener("DOMContentLoaded", function () {
    const homeBody = document.querySelector('.home');
    const homeText = document.querySelector('.home-container');
    let isFirstAnimationRemoved = true;


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            const intersectionRatio = entry.intersectionRatio;
            // Calcola l'opacità in base alla percentuale di intersezione
            // Maggiore è l'intersezione, più alta è l'opacità
            if (intersectionRatio <= 0.05) {
                homeBody.classList.remove('home-body-animation');
                homeText.classList.remove('home-text-animate-up');
                isFirstAnimationRemoved = true;
            }


            // Aggiungere l'animazione solo quando l'elemento è completamente fuori dalla viewport
            // E si sta
            if (intersectionRatio >= 0.2 && isFirstAnimationRemoved) {
                homeText.classList.add('home-text-animate-up');
                homeBody.classList.add('home-body-animation');
                isFirstAnimationRemoved = false;
            }



        });
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Usando un array di soglie da 0 a 1 per un controllo più fine
    });
    observer.observe(homeBody);
});

// Home Observer NavLink
document.addEventListener("DOMContentLoaded", function () {
    const homeBody = document.querySelector('.home');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const intersectionRatio = entry.intersectionRatio;
            //console.log('home intersection ratio:', intersectionRatio);
            if (intersectionRatio >= 0.6) {
                const navLinks = document.querySelectorAll('#navmenu a.active');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const homeLink = document.querySelector('#navmenu a[href="#home"]');
                homeLink.classList.add('active');
            }
        });
    }, {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100) // Usando un array di soglie da 0 a 1 per un controllo più fine
    });

    observer.observe(homeBody);
});


// Gallery Observer Navlink
document.addEventListener("DOMContentLoaded", function () {
    const gallerySection = document.querySelector('.gallery');
    const gallerySlideshowContainer = document.querySelector('#gallery-container');
    const galleryTextIntroduction = document.querySelector('.text-introduction');
    let isGalleryAnimationRemoved = true;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const intersectionRatio = entry.intersectionRatio;
            console.log('gallery intersection ratio:', intersectionRatio);

            // if the viewport is less than 10% of the gallery section
            // remove the animation

            // Add the animation when the gallery section is 20% in the viewport
            // and the animation was already removed
            if (intersectionRatio >= 0.01 && isGalleryAnimationRemoved) {
                gallerySlideshowContainer.classList.add('gallery-slideshow-animate');
                isGalleryAnimationRemoved = false;
                console.log('gallery animation added');
            }

            if (intersectionRatio <= 0.05 && !isGalleryAnimationRemoved) {
                gallerySlideshowContainer.classList.remove('gallery-slideshow-animate');
                isGalleryAnimationRemoved = true;
                console.log('gallery animation removed');
            }

            if (intersectionRatio >= 0.6) {
                const navLinks = document.querySelectorAll('#navmenu a.active');
                galleryTextIntroduction.classList.add('text-introduction-animate');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const galleryLink = document.querySelector('#navmenu a[href="#gallery"]');
                galleryLink.classList.add('active');
            }



        });
    }, {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100) // Usando un array di soglie da 0 a 1 per un controllo più fine
    });

    observer.observe(gallerySection);
});

// About Observer Navlink
document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.querySelector('.about');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const intersectionRatio = entry.intersectionRatio;
            //console.log('gallery intersection ratio:', intersectionRatio);

            if (intersectionRatio >= 0.6) {
                const navLinks = document.querySelectorAll('#navmenu a.active');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const galleryLink = document.querySelector('#navmenu a[href="#about"]');
                galleryLink.classList.add('active');
            }
        });
    }, {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100) // Usando un array di soglie da 0 a 1 per un controllo più fine
    });

    observer.observe(aboutSection);
});

// Contact Observer Navlink
document.addEventListener("DOMContentLoaded", function () {
    const contactSection = document.querySelector('.contact');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const intersectionRatio = entry.intersectionRatio;
            //console.log('gallery intersection ratio:', intersectionRatio);

            if (intersectionRatio >= 0.6) {
                const navLinks = document.querySelectorAll('#navmenu a.active');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                const galleryLink = document.querySelector('#navmenu a[href="#contact"]');
                galleryLink.classList.add('active');
            }
        });
    }, {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100) // Usando un array di soglie da 0 a 1 per un controllo più fine
    });

    observer.observe(contactSection);
});

// Gallery Pagination

const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const totalItems = galleryItems.length; // Numero totale di elementiconsole.log(totalItems);
// Popola la galleria con elementi di esempio

function calculateItemsPerPage() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;

    // ------------ Orientamento Landscape ------------

    // testo qui, supponiamo di avere 8 colonne, quindi 3x8 = 24 elementi ()
    // aspectRatio > 1 -> width > height
    if (width >= 1920 && aspectRatio > 1) return 12; // 3x4 layout (return 12)

    // Caso 1: Schermi 1280+ px con orientamento landscape
    if (width >= 1280 && aspectRatio > 1) return 9; // 3x3 layout

    // Caso 2: Schermi tra 1024px e 1279px con orientamento landscape
    if (width >= 681 && width <= 1279 && aspectRatio > 1) return 4;    // 2x2 layout

    // Caso 3: Schermi molto piccoli in modalità landscape (es: iPhone SE)
    if (width <= 680 && aspectRatio > 1) return 1; // 1x1 layout

    if (height <= 600 && aspectRatio > 1) return 1; // 1x1 layout

    // ----------- Orientamento Portrait ------------

    // Caso 1: Schermi medi (min-width: 1024px e max-width: 1279px) con orientamento portrait
    if (width >= 1024 && width <= 1279 && aspectRatio <= 1) return 6; // 3x2 layout

    // Caso 2: Dispositivi con altezza maggiore della larghezza (mobile verticale)
    if (aspectRatio <= 1) return 2; // 2x1 layout

    // Caso 3: Schermi piccoli o altri casi non specificati
    return 2;  // 2x1 layout di default
}


function calcLayout() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;

    // ------------ Orientamento Landscape ------------
    if (width >= 1920 && aspectRatio > 1) return [3, 4]; // 3x4 layout
    if (width >= 1280 && aspectRatio > 1) return [3, 3]; // 3x3 layout
    if (width >= 681 && width <= 1279 && aspectRatio > 2) return [1, 2]; // 2x2 layout
    if (width >= 681 && width <= 1279 && aspectRatio > 1) return [2, 2]; // 2x2 layout
    if ((width <= 680 || height <= 600) && aspectRatio > 1) return [1, 1]; // 1x1 layout

    // ----------- Orientamento Portrait ------------
    if (width >= 1024 && width <= 1279 && aspectRatio <= 1) return [3, 2]; // 3x2 layout
    else if (aspectRatio <= 1) return [2, 1]; // 2x1 layout
    return [2, 1];  // 2x1 layout di default

}

function renderGalleryExperimental() {
    const layout = calcLayout();
    const totalRows = layout[0];
    const totalColumns = Math.ceil(totalItems / totalRows);

    let galleryContainer = document.getElementById('gallery-container');
    galleryContainer.style.gridTemplateRows = `repeat(${totalRows}, 1fr)`;
    galleryContainer.style.gridTemplateColumns = `repeat(${totalColumns}, 1fr)`;


    // Definisci il numero di colonne visibili (ad esempio 4)
    const visibleColumns = layout[1];
    const gridGap = 2; // Gap tra gli elementi in rem

    // Calcola la larghezza del container per mostrare solo le colonne visibili
    const containerWidth = galleryContainer.clientWidth;

    // Calcola la larghezza di ogni colonna considerando il gap tra le colonne
    const columnGapInPixels = gridGap * parseFloat(getComputedStyle(document.documentElement).fontSize); // Converti rem in pixel
    const itemWidth = (containerWidth - (columnGapInPixels * (visibleColumns - 1))) / visibleColumns;

    // Imposta la larghezza di ogni elemento .gallery-item
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.width = `${itemWidth}px`;
    });


}

//renderGallery(); // Prima renderizzazione
renderGalleryExperimental();

window.addEventListener('resize', () => {
    renderGalleryExperimental();
});

let currentScrollPosition = 0;
let scrollTimeout;

function updatePageIndicator() {
    const galleryContainer = document.getElementById('gallery-container');
    const layout = calcLayout();
    const visibleColumns = layout[1];
    const totalColumns = Math.ceil(totalItems / layout[0]);
    const totalPages = Math.ceil(totalColumns / visibleColumns);

    const columnWidth = galleryContainer.querySelector('.gallery-item').offsetWidth + 2 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    // Calcolo della pagina corrente
    const currentPage = Math.min(totalPages, Math.max(1, Math.round(currentScrollPosition / (visibleColumns * columnWidth)) + 1));

    console.log('currentPage:', currentPage);
    // Aggiorna il testo dell'indicatore
    document.getElementById('page-indicator').textContent = `${currentPage} - ${totalPages}`;
}

// Aggiungi l'event listener per lo scorrimento
document.getElementById('gallery-container').addEventListener('scroll', function () {
    currentScrollPosition = this.scrollLeft;

    // Cancella il precedente timeout se l'utente continua a scorrere
    clearTimeout(scrollTimeout);

    // Imposta un timeout per aggiornare l'indicatore di pagina dopo che lo scorrimento è terminato
    scrollTimeout = setTimeout(updatePageIndicator, 150); // 150ms è un tempo ragionevole per considerare lo scorrimento terminato
});

function scrollToPosition(targetScrollPosition) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.scrollTo({
        left: targetScrollPosition,
        behavior: 'smooth'
    });

    // Aggiorna l'indicatore di pagina dopo che lo scorrimento termina
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updatePageIndicator, 10);
}

function nextPage() {
    const galleryContainer = document.getElementById('gallery-container');
    const layout = calcLayout();
    const visibleColumns = layout[1];
    const columnWidth = galleryContainer.querySelector('.gallery-item').offsetWidth + 2 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    const maxScrollLeft = galleryContainer.scrollWidth - galleryContainer.clientWidth;

    if (currentScrollPosition < maxScrollLeft) {
        currentScrollPosition += visibleColumns * columnWidth;
        if (currentScrollPosition > maxScrollLeft) {
            currentScrollPosition = maxScrollLeft;
        }
    }

    scrollToPosition(currentScrollPosition);
}

function prevPage() {
    const galleryContainer = document.getElementById('gallery-container');
    const layout = calcLayout();
    const visibleColumns = layout[1];
    const columnWidth = galleryContainer.querySelector('.gallery-item').offsetWidth + 2 * parseFloat(getComputedStyle(document.documentElement).fontSize);

    if (currentScrollPosition > 0) {
        currentScrollPosition -= visibleColumns * columnWidth;
        if (currentScrollPosition < 0) {
            currentScrollPosition = 0;
        }
    }

    scrollToPosition(currentScrollPosition);

}

// Inizializzazione dell'indicatore di pagina
updatePageIndicator();



/*
function renderGallery() {
    const gallerySlide = document.getElementById('gallery-container');
    gallerySlide.innerHTML = ''; // Svuota il contenitore

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const itemsToShow = galleryItems.slice(start, end);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Aggiungi ogni elemento al contenitore
    itemsToShow.forEach(item => gallerySlide.appendChild(item));

    document.getElementById('page-indicator').textContent = currentPage + '/' + totalPages;

    // Imposta la traduzione X per l'animazione di scorrimento
    const translateX = -(currentPage - 1) * 100;
    gallerySlide.style.transform = `translateX(${translateX}%)`;
}



window.addEventListener('resize', () => {
    itemsPerPage = calculateItemsPerPage(); // Ricalcola il numero di elementi per pagina in base alla nuova larghezza
    currentPage = 1; // Reset alla prima pagina su resize
    renderGalleryExperimental();
});
*/


/*

let currentScrollPosition = 0;

function updatePageIndicator() {
    const galleryContainer = document.getElementById('gallery-container');
    const layout = calcLayout();
    const visibleColumns = layout[1];
    const totalColumns = Math.ceil(totalItems / layout[0]);
    const totalPages = Math.ceil(totalColumns / visibleColumns); // Calcolo totale delle pagine
    const currentPage = Math.round((currentScrollPosition + galleryContainer.clientWidth) / galleryContainer.clientWidth);
    console.log('currentPage:', currentPage);
    // Aggiorna il testo dell'indicatore
    document.getElementById('page-indicator').textContent = `${currentPage}/${totalPages}`;
}

// Aggiungi l'event listener per lo scorrimento
document.getElementById('gallery-container').addEventListener('scroll', function() {
    currentScrollPosition = this.scrollLeft;
    updatePageIndicator();
});

function nextPage() {
    const galleryContainer = document.getElementById('gallery-container');
    const visibleColumns = calcLayout()[1];
    const columnWidth = galleryContainer.querySelector('.gallery-item').offsetWidth + 2 * parseFloat(getComputedStyle(document.documentElement).fontSize); // Larghezza di una colonna con gap

    const maxScrollLeft = galleryContainer.scrollWidth - galleryContainer.clientWidth; // Posizione massima di scroll

    if (currentScrollPosition < maxScrollLeft) {
        currentScrollPosition += columnWidth * visibleColumns;
        if (currentScrollPosition > maxScrollLeft) {
            currentScrollPosition = maxScrollLeft;
        }
    }

    galleryContainer.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth' // Scorrimento fluido
    });

    updatePageIndicator(); // Aggiorna l'indicatore di pagina

}

function prevPage() {
    const galleryContainer = document.getElementById('gallery-container');
    const visibleColumns = calcLayout()[1];
    const columnWidth = galleryContainer.querySelector('.gallery-item').offsetWidth + 2 * parseFloat(getComputedStyle(document.documentElement).fontSize); // Larghezza di una colonna con gap

    if (currentScrollPosition > 0) {
        currentScrollPosition -= columnWidth * visibleColumns;
        if (currentScrollPosition < 0) {
            currentScrollPosition = 0;
        }
    }

    galleryContainer.scrollTo({
        left: currentScrollPosition,
        behavior: 'smooth' // Scorrimento fluido
    });

    updatePageIndicator(); // Aggiorna l'indicatore di pagina

}

updatePageIndicator();

*/