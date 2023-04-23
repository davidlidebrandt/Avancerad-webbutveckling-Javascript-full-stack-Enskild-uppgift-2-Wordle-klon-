const gameLink = document.querySelector(".game-link");
const highScoresLink = document.querySelector(".high-scores-link");
const infoLink = document.querySelector(".info-link");
let allMainNavLinks = document.querySelectorAll(".main-nav-link")
const currentPath = window.location.pathname;

sessionStorage.removeItem("activeGame");

allMainNavLinks = Array.from(allMainNavLinks);
allMainNavLinks.forEach((item)=> {
    item.classList.remove("active");
});

if(currentPath === "/") {
    gameLink.classList.add("active");
}
if(currentPath === "/high-scores") {
    highScoresLink.classList.add("active");
}

if(currentPath === "/information") {
    infoLink.classList.add("active");
}