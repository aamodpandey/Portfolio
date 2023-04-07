const form = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
function positionContainer() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelector('#home').style.paddingTop = `${headerHeight}px`;
}

window.addEventListener('load', positionContainer);
window.addEventListener('resize', positionContainer);


const navLinks = document.querySelectorAll('.collapsible li');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        target.scrollIntoView({behavior: 'smooth'});
    });
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (nameInput.value && emailInput.value && messageInput.value) {
        const formData = new FormData(form);
        // TODO: send form data to server and handle response

        fetch(form.action, {
            method: 'POST',
            body: formData,
        })

        alert('Form submitted successfully!');

        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    } else {
        alert('Please fill out all fields.');
    }
});
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.collapsible');
navbarToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
});

const printingText = document.querySelector('.printing-text');
let text = printingText.innerText;
let index = 0;
let lineBreakIndex = null;

function printText() {
    printingText.innerText = text.slice(0, index);

    // Insert line break after the next character when container width reaches 100% of parent container
    if (printingText.offsetWidth >= printingText.parentNode.offsetWidth && lineBreakIndex === null) {
        lineBreakIndex = index + 1;
    }
    if (lineBreakIndex === index) {
        printingText.innerHTML += '<br>';
        lineBreakIndex = null;
    }

    index++;

    if (index > text.length) {
        clearInterval(printInterval);
    }
}

const printInterval = setInterval(printText, 50);

const icons = document.querySelectorAll('.icon');

function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkIcons() {
    icons.forEach(icon => {
        const iconTop = icon.getBoundingClientRect().top;
        const iconBottom = icon.getBoundingClientRect().bottom;
        const iconHeight = icon.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;

        if (iconTop < windowHeight - iconHeight) {
            icon.classList.add('visible');
        } else {
            icon.classList.remove('visible');
        }
    });
}

// window.addEventListener('scroll', debounce(checkIcons));
const items = document.querySelectorAll('.list-item');

function fadeInList() {
    items.forEach((item, index) => {
        const position = item.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight * 0.9) {
            setTimeout(
                () => item.classList.add('active'), index * 200)
        } else {
            item.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', fadeInList);
