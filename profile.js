const burger = document.getElementById("burger");
const navlink = document.getElementById("navlink");
const buttonReg = document.querySelector(".buttonReg");


const profileInfo = document.getElementById("profileInfo");

const profileUpload = document.getElementById("photoUpload");
const profilePhoto = document.getElementById("profilePhoto");

window.addEventListener("load", function(){
    const userName = localStorage.getItem("person_user");
    const userGmail = localStorage.getItem("person_gmail");
    const userNum = localStorage.getItem('person_num')

    const userStatus = localStorage.getItem("person_user");
    if(userStatus){
        buttonReg.classList.add("invisible");
    }

    document.getElementById("userName").textContent = userName || "Guest";
    document.getElementById("userGmail").textContent = userGmail || "No Gmail";
    document.getElementById("userNum").textContent = userNum || "No Phone Number";
    const savedPhoto = localStorage.getItem("profilePhoto");
    if(savedPhoto){
        document.getElementById("profilePhoto").src = savedPhoto;
    }


});

async function fetchWeather(){
    try{
        const respone = await fetch("https://wttr.in/Tbilisi?format=j1");
        const data = await respone.json();
        
        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value;
        const hum = data.current_condition[0].humidity;

        const weatherCon = document.getElementById("weather");
        weatherCon.innerHTML = `
            <h2>Tbilisi</h2>
            <P>${temp}°C</p>
            <p>${desc}</P>
            <p>${hum}%</p>
        `;
    }
    catch(error){
        console.log("Error", error);
    }
}

fetchWeather();

profileUpload.addEventListener("change", function(){
    const file = this.files [0];
    if(file){
        const read = new FileReader();
        read.onload = function(event){
            profilePhoto.src = event.target.result;
            localStorage.setItem("profilePhoto", event.target.result);
        }
        read.readAsDataURL(file);
    }
});


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

burger.addEventListener('click', ()=>{
    navlink.classList.toggle("open");
});


