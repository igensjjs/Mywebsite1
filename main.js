// ===============================
// REHOBOT CHOIR MAIN JAVASCRIPT
// ===============================


// Welcome Message
window.addEventListener("load", () => {
    console.log("Welcome to Rehobot Choir");
});


// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener("click", function(e){

        const href = this.getAttribute("href");

        if(href.startsWith("#")){

            e.preventDefault();

            document.querySelector(href).scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// ===============================
// Header Shadow on Scroll
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 8px 20px rgba(0,0,0,.2)";

    }

    else{

        header.style.boxShadow = "none";

    }

});


// ===============================
// Scroll Animation
// ===============================

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

});

cards.forEach(card=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition=".7s";

    observer.observe(card);

});


// ===============================
// Button Animation
// ===============================

document.querySelectorAll(".btn").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="scale(1)";

    });

});


// ===============================
// Dynamic Footer Year
// ===============================

const footer = document.querySelector("footer p");

if(footer){

    footer.innerHTML =
    "© " +
    new Date().getFullYear() +
    " Rehobot Choir | Worship Through Music";

}
