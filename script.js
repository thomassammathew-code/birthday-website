const stars = document.getElementById("stars");

for(let i=0;i<180;i++){

    const star = document.createElement("div");
    star.style.setProperty(
        "--size",
        (Math.random()*3+1)+"px"
    );

    star.classList.add("star");

    if(Math.random()>0.92){
        star.classList.add("big");
        star.style.opacity = 1;
    }

    star.style.left = Math.random()*100+"%";
    star.style.top = Math.random()*100+"%";

    star.style.animationDelay = Math.random()*4+"s";
    star.style.opacity =0.3 + Math.random()*0.7;

    stars.appendChild(star);

}

/* ==========================================================
                    ELEMENTS
========================================================== */

const pages = document.querySelectorAll(".page");

const loadingPage = document.getElementById("loadingPage");
const giftPage = document.getElementById("giftPage");
const cakePage = document.getElementById("cakePage");
const starPage = document.getElementById("starPage");
const birthdayPage = document.getElementById("birthdayPage");
const flowerPage = document.getElementById("flowerPage");
const galleryPage = document.getElementById("galleryPage");
const finalPage = document.getElementById("finalPage");

const gift = document.getElementById("gift");
const giftMessage = document.getElementById("giftMessage");

const cake = document.getElementById("cake");
const shootingStar = document.getElementById("shootingStar");

const music = document.getElementById("bgMusic");
const unoCard = document.getElementById("unoCard");
/* ==========================================================
                    PAGE SWITCHER
========================================================== */

function showPage(nextPage){

    const currentPage = document.querySelector(".page.active");

    if(currentPage === nextPage) return;

    if(currentPage){

        gsap.to(currentPage,{

            opacity:0,
            duration:0.45,
            ease:"power2.out",

            onComplete:()=>{

                currentPage.classList.remove("active");

                nextPage.classList.add("active");

                gsap.fromTo(nextPage,

                {
                    opacity:0,
                    scale:0.98
                },

                {
                    opacity:1,
                    scale:1,
                    duration:0.55,
                    ease:"power2.out"
                });

            }

        });

    }

    else{

        nextPage.classList.add("active");

    }

}

/* ==========================================================
                    LOADING
========================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        showPage(giftPage);
        moveGift();

    }, 900); //1.2 seconds

});

/* ==========================================================
                    GIFT GAME
========================================================== */

const funnyMessages=[

    "Too slow huh kid 😜",

    "Catch me if you can 😏",

    "Almost 😂",

    "You call that fast? 🤭",

    "One more try 🎁"

];

let tries=0;

function moveGift(){

    const giftWidth = gift.offsetWidth;
    const giftHeight = gift.offsetHeight;

    const padding = 40;

    const x = Math.random() *

        (window.innerWidth - giftWidth - padding*2)

        + padding;

    const y = Math.random() *

        (window.innerHeight - giftHeight - 260)

        + 220;

    //const duration = Math.max(0.9, 1.9 - tries*0.18);
    const duration = Math.max(0.7, 1.6 - tries*0.18);

    gsap.to(gift,{

        left: x,

        top: y,

        rotation:Math.random()*16-8,

        duration,

        ease:"power2.inOut"

    });

}


let giftCooldown = false;
const maxTries = 5;

document.addEventListener("mousemove",(e)=>{

    if(document.querySelector(".page.active") !== giftPage) return;

    if(giftCooldown) return;

    if(tries >= maxTries) return;

    const rect = gift.getBoundingClientRect();

    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;

    const distance = Math.hypot(

        e.clientX-centerX,

        e.clientY-centerY

    );

    if(distance < 90){

        giftCooldown = true;

        moveGift();

        tries++;

        giftMessage.innerHTML =

            tries >= maxTries

                ? "Okay okay, catch me now 😅"

                : funnyMessages[tries % funnyMessages.length];

        setTimeout(()=>{

            giftCooldown = false;

        },500);

    }

});



/* Mobile */

gift.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    openGift();

});

/* Desktop */

gift.addEventListener("click",openGift);

function openGift(){

    music.volume=.35;

    music.play();

    showPage(cakePage);

}
/* ==========================================================
                    CAKE PAGE
========================================================== */

cake.addEventListener("click",()=>{

    gsap.to("#cake",{

        scale:1.08,
        duration:.3,
        repeat:1,
        yoyo:true

    });

    gsap.to(".flame",{

        opacity:0,
        y:-6,
        duration:.4,
        stagger:0.05

    });

    setTimeout(()=>{

        showPage(starPage);

        startShootingStar();

    },900);

});




/* ==========================================================
                    SHOOTING STAR
========================================================== */

let starAnimation;

function startShootingStar(){

    shootingStar.style.left="-220px";
    shootingStar.style.top="12%";

    let x=-220;
    let y=60;

    clearInterval(starAnimation);

    starAnimation=setInterval(()=>{

        x += 5;
        y += 2;

        shootingStar.style.left=x+"px";
        shootingStar.style.top=y+"px";

        if(x>window.innerWidth+220){

            clearInterval(starAnimation);

            startShootingStar();

        }

    },30);

}


shootingStar.addEventListener("pointerdown",()=>{

    clearInterval(starAnimation);

    showBirthday();

});


/* ==========================================================
                HAPPY BIRTHDAY PAGE
========================================================== */

function showBirthday(){

    showPage(birthdayPage);

    gsap.from(".birthdayText",{

        scale:.5,
        opacity:0,
        duration:1,
        ease:"back.out(1.8)"

    });

    launchConfetti();

    setTimeout(()=>{
        showFlowerPage();
    },6500);

}


/* ==========================================================
                    CONFETTI
========================================================== */

function launchConfetti(){

    confetti({

        particleCount:250,

        spread:180,

        origin:{

            y:.6

        }

    });

}
/* =======================================================
   FLOWERS
======================================================= */

const flowers = document.querySelectorAll(".flower");
const petalsContainer = document.getElementById("petals");

function spawnPetals(){

    petalsContainer.innerHTML = "";

    for(let i=0;i<22;i++){

        const petal = document.createElement("div");

        petal.className = "petal " + (i%2===0 ? "blue" : "white");

        const size = 10 + Math.random()*10;

        petal.style.left = (Math.random()*100)+"%";
        petal.style.width = size+"px";
        petal.style.height = (size*1.3)+"px";

        petalsContainer.appendChild(petal);

        gsap.fromTo(petal,

        {
            y:-40,
            x:0,
            rotation:Math.random()*360,
            opacity:0
        },

        {
            y:window.innerHeight+60,
            x:(Math.random()*80)-40,
            rotation:"+=180",
            opacity:1,
            duration:4+Math.random()*3,
            delay:Math.random()*3,
            ease:"sine.inOut",
            onComplete(){
                petal.remove();
            }
        });

    }

}

function showFlowerPage(){

    showPage(flowerPage);

    spawnPetals();

    flowers.forEach(flower=>{

        flower.style.opacity="0";
        flower.style.transform="scale(.15) rotate(-25deg)";

    });

    flowers.forEach((flower,index)=>{

        setTimeout(()=>{

            gsap.to(flower,{
                opacity:1,
                scale:1,
                rotation:0,
                duration:1,
                ease:"back.out(2)",
                onComplete(){
                    gsap.to(flower,{
                        rotation:"+=4",
                        duration:2,
                        repeat:-1,
                        yoyo:true,
                        ease:"sine.inOut"
                    });
                }
            });

        },index*500);

    });

    gsap.from(".flowerMessage",{

        opacity:0,

        y:30,

        delay:2.5,

        duration:1

    });

    setTimeout(()=>{

        showGallery();

    },7000);

}
/* =======================================================
   POLAROID GALLERY
======================================================= */

const stagePhoto = document.getElementById("stagePhoto");
const stageCaption = document.getElementById("stageCaption");
const photoBoard = document.getElementById("photoBoard");
const flash = document.getElementById("cameraFlash");

const photos = [

{
src:"assets/photos/photo1.jpg",
caption:"STOP talk to my hand"
},

{
src:"assets/photos/photo2.jpg",
caption:"Paavam cute ass"
},

{
src:"assets/photos/photo3.jpg",
caption:"we built different ig buhahahah"
},

{
src:"assets/photos/photo4.jpg",
caption:"Insanely pretty!! JESUS"
},

{
src:"assets/photos/photo5.jpg",
caption:"😂😂 I didnt tell anything"
},

{
src:"assets/photos/photo6.jpg",
caption:"DAMN DAMN DAMN"
}

];

let photoIndex = 0;

function showGallery(){

    showPage(galleryPage);

    photoBoard.innerHTML = "";

    photoIndex = 0;

    setTimeout(showNextMemory,800);

}

let polaroidZ = 1;

function showNextMemory(){

    if(photoIndex >= photos.length){

        setTimeout(showCutiePie,2000);

        return;

    }

    flash.style.opacity = "1";

    setTimeout(()=>{

        flash.style.opacity = "0";

    },120);

    stagePhoto.src = photos[photoIndex].src;
    stageCaption.innerHTML = photos[photoIndex].caption;

    gsap.fromTo("#photoStage",

    {
        scale:0.6,
        opacity:0
    },

    {
        scale:1,
        opacity:1,
        duration:0.5
    });

    setTimeout(dropPolaroid,1900);

}

function showCutiePie(){

    const cutiePie = document.getElementById("cutiePie");

    gsap.to(cutiePie,{

        opacity:1,

        scale:1,

        duration:0.8,

        ease:"back.out(1.6)"

    });

    setTimeout(showFinalPage,6500);

}

function dropPolaroid(){

    const thisIndex = photoIndex;

    const card = document.createElement("div");

    card.className = "polaroid p" + (thisIndex+1);
    card.style.zIndex = polaroidZ++;

    card.innerHTML = `

        <img src="${photos[thisIndex].src}">

        <p>${photos[thisIndex].caption}</p>

    `;

    photoBoard.appendChild(card);

    gsap.fromTo(card,

    {

        scale:0.3,

        opacity:0,

        rotation:"+=15"

    },

    {

        scale:1,

        opacity:1,

        rotation:"-=15",

        duration:1,

        ease:"back.out(1.6)"

    });

    gsap.to("#photoStage",{

        opacity:0,

        duration:.4

    });

    photoIndex++;

    setTimeout(showNextMemory,2600);

}


/* ==========================================================
                    FINAL PAGE
========================================================== */


let cardOpened = false;

function showFinalPage(){

    showPage(finalPage);

    startFireworks();

    gsap.from(".finalCard",{

        y:40,
        opacity:0,
        duration:1

    });

}
/* ==========================================================
                    FIREWORKS
========================================================== */

let fireworksStarted = false;

function startFireworks(){

    if(fireworksStarted) return;

    fireworksStarted = true;

    const container = document.getElementById("fireworks");

    const fireworks = new Fireworks.default(container,{

        rocketsPoint:{
            min:45,
            max:55
        },

        hue:{
            min:190,
            max:230
        },

        delay:{
            min:20,
            max:35
        },

        speed:3,

        acceleration:1.05,

        friction:0.96,

        gravity:1.4,

        particles:120,

        intensity:35,

        explosion:9

    });

    fireworks.start();

}
/* ==========================================================
                    UNO CARD
========================================================== */

unoCard.addEventListener("click",()=>{

    if(cardOpened) return;

    cardOpened=true;

    unoCard.classList.add("flip");

    unoCard.style.animation = "none";

    confetti({

        particleCount:180,

        spread:120,

        origin:{
            y:.55
        }

    });

    floatingHearts();

    setTimeout(showEndingPage,4500);

});
/* ==========================================================
                    FLOATING HEARTS
========================================================== */

function floatingHearts(){

    for(let i=0;i<25;i++){

        const heart=document.createElement("div");

        heart.innerHTML="💙";

        heart.style.position="fixed";

        heart.style.left=Math.random()*window.innerWidth+"px";

        heart.style.top=(window.innerHeight+40)+"px";

        heart.style.fontSize=(20+Math.random()*20)+"px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="9999";

        document.body.appendChild(heart);

        gsap.to(heart,{

            y:-(window.innerHeight+250),

            x:(Math.random()*250)-125,

            rotation:Math.random()*360,

            opacity:0,

            duration:4+Math.random()*2,

            ease:"power1.out",

            onComplete(){

                heart.remove();

            }

        });

    }

}

/* ==========================================================
                    ENDING PAGE
========================================================== */

const endingPage = document.getElementById("endingPage");
const creditsPage = document.getElementById("creditsPage");
const creditsScroll = document.getElementById("creditsScroll");

function showEndingPage(){

    showPage(endingPage);

    gsap.fromTo("#endingPage .endingCard p",

    {
        opacity:0,
        y:20
    },

    {
        opacity:1,
        y:0,
        duration:0.8,
        stagger:0.35,
        ease:"power2.out"
    });

    setTimeout(showCreditsPage,12000);

}

/* ==========================================================
                    MOVIE CREDITS
========================================================== */

function showCreditsPage(){

    showPage(creditsPage);

    gsap.set(creditsScroll,{

        y:window.innerHeight

    });

    gsap.to(creditsScroll,{

        y:-(creditsScroll.scrollHeight + window.innerHeight),

        duration:22,

        ease:"none",

        onComplete:dropBombPhoto

    });

}

function dropBombPhoto(){

    const bomb = document.getElementById("bombPolaroid");

    gsap.to(bomb,{

        top:"18%",

        rotation:-4,

        duration:0.9,

        ease:"power3.in",

        onComplete(){

            gsap.to(bomb,{

                scale:1.06,

                duration:0.12,

                yoyo:true,

                repeat:1,

                ease:"power1.out"

            });

        }

    });

}
