const access = document.getElementById("access");
const decline = document.getElementById("decline");
const article = document.getElementById("article");
const buttonReg = document.querySelector(".buttonReg");
const burger = document.getElementById("burger");
const scrolltop = document.getElementById("scrolltop");
const navlink = document.getElementById("navlink");
const coachCont = document.getElementById("coachCont");
const mentorCont = document.getElementById("mentorCont");

const overSub = document.getElementById("overSub");
const regForm = document.getElementById("regForm");
const exitLogo = document.querySelector(".overLogo");

const CvvRegex = /^\d{3}$/;
const cardNumRegex = /^\d{16}$/;

let selectedExpert = null;
function openSubPopup(){
    overSub.style.display = "flex";
}

function closePopup(){
    overSub.style.display = "none";
}

window.addEventListener("click", (event)=>{
    if(event.target === overSub){
        closePopup();
    }
});


exitLogo.addEventListener('click', closePopup);


regForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userNameVal = document.getElementById("userName").value.trim();
    const userLastnameval = document.getElementById("userLastname").value.trim();
    const userCardDataVal = document.getElementById("cardDate").value.trim();
    const userCardCvv = document.getElementById("cardCvv").value.trim();
    const userCardNumVal = document.getElementById("cardNumber").value.trim();





    function validate(CVV, cardNumb){
        return{
            CVV : CvvRegex.test(CVV),
            cardNumb : cardNumRegex.test(cardNumb)
        };
    }
    const validation = validate(userCardCvv, userCardNumVal);

    if(userNameVal === ''){
        alert("Name cannot be empthy!");
        return;
    }
    if(userLastnameval === ''){
        alert("Lastname cannot be emthy");
        return;
    }
    if(userCardDataVal === ''){
        alert("Enter date");
        return;
    }
    if(!validation.CVV){
        alert("Invalid CVV, Input only 3 number");
        return;
    }
    if(!validation.cardNumb){
        alert("Enter 16 numbers only");
        return;
    }
            const subscibtionData = {
            cardDate: userCardDataVal,
            cardCVV: userCardCvv,
            lastFoutDigits: userCardNumVal.slice(-4),
            experts: selectedExpert
        };
    localStorage.setItem("userSubscription", JSON.stringify(subscibtionData));

    alert("Subscribed successfully!");
    closePopup();
    window.location.href = "./chat.html";
});


async function fetchUsers(){
    try{
        const respone = await fetch("https://randomuser.me/api/?results=6");
        const data = await respone.json();
        const users = data.results;

        if(mentorCont) {
            users.slice(0, 3).forEach(user => {
                mentorCont.innerHTML += createCard(user, "Nutrition Specialist");
            });
        }

        if(coachCont) {
            users.slice(3, 6).forEach(user =>{
                coachCont.innerHTML += createCard(user, "Fitness Coach");
            });
        }

        const allSubBtns = document.querySelectorAll(".subBtn");
        allSubBtns.forEach(btn => {
            btn.addEventListener("click", (event)=>{
                const btnClicked = event.target;
                selectedExpert = {
                    firstName : btnClicked.getAttribute("data-name"),
                    lastName: btnClicked.getAttribute("data-lastname"),
                    role: btnClicked.getAttribute("data-role")
                }
                openSubPopup();
            });
        });

    }
    catch(error){
        console.log("Error", error);
    }
}

function createCard(user, role){
    return `
        <div class="card">
            <img src="${user.picture.large}" alt="${user.name.first}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${role}</p>
            <p>${user.location.city}</p>
            <button class="subBtn" data-name = "${user.name.first}" data-lastname = "${user.name.last}" data-role ="${role}">Subscribe</button>
        </div>
    `;
}

window.addEventListener('load', function(){
    let status = this.localStorage.getItem("storageStatus");
    if(status){
        hideart();
    }

    let userStatus = localStorage.getItem("person_user");
    if(userStatus && buttonReg){
        buttonReg.classList.add('invisible');
    }
    
    fetchUsers();
});


access.addEventListener('click', () =>{
    localStorage.setItem("storageStatus", "accepted");
    hideart();
});



decline.addEventListener('click', () =>{
    localStorage.setItem("storageStatus", "decline");
    hideart();
});


function hideart(){
    if(article) article.classList.add('hidden');
}


burger.addEventListener('click', ()=>{
    navlink.classList.toggle("open");
});


window.addEventListener('scroll', () =>{
    if(scrolltop) {
        if(window.scrollY > 100){
            scrolltop.style.display = "block";
        }
        else{
            scrolltop.style.display = "none";
        }
    }
});


scrolltop.addEventListener("click", () =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


