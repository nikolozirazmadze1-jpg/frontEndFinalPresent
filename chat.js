const burger = document.getElementById("burger");
const navlink = document.getElementById("navlink");
const buttonReg = document.querySelector(".buttonReg");

const sendBtn = document.getElementById("sendBtn");
const myInput = document.getElementById("myInput");
const messages = document.getElementById("messages");


const savedPhoto = localStorage.getItem("profilePhoto");
if(savedPhoto){
    document.querySelector("myChat img").src = savedPhoto;
}

window.addEventListener('load', function(){
    let userStatus = localStorage.getItem("person_user");
    if(userStatus && buttonReg){
        buttonReg.classList.add('invisible');
    }
});

function sendMessage(){
    const text = myInput.value.trim();
    if(text === "") return;

    messages.innerHTML = `
        
    `
}


burger.addEventListener('click', ()=>{
    navlink.classList.toggle("open");
});


