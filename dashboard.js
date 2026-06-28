const access = document.getElementById("access");
const decline = document.getElementById("decline");
const article = document.getElementById("article");
const buttonReg = document.querySelector(".buttonReg");
const burger = document.getElementById("burger");
const scrolltop = document.getElementById("scrolltop");
const navlink = document.getElementById("navlink");


window.addEventListener('load', function(){
    let status = localStorage.getItem("storageStatus");
    if(status){
        hideart();
    }

    let userStatus = localStorage.getItem("person_user");
    if(userStatus){
        buttonReg.classList.add("hidden");
    }
});


function hideart(){
    article.classList.add('hidden');
}
access.addEventListener('click', () =>{
    localStorage.setItem("storageStatus", "accepted");
    hideart();
});
decline.addEventListener('click', () =>{
    localStorage.setItem("storageStatus", "decline");
    hideart();
});



burger.addEventListener('click', ()=>{
    navlink.classList.toggle("open");
});

window.addEventListener('scroll', () =>{
    if(window.scrollY > 100){
        scrolltop.style.display = "block";
    }
    else{
        scrolltop.style.display = "none";
    }
});

scrolltop.addEventListener("click", () =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});