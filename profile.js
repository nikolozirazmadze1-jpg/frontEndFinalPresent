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

    const userSubscription = JSON.parse(localStorage.getItem("userSubscription"));
    const sub = document.getElementById("subs");


    if(userSubscription && userSubscription.experts){
        const experts = userSubscription.experts;
        sub.innerHTML = `
            <p>${experts.firstName} ${experts.lastName}</p>
            <p>${experts.role}</p>
        `;
    }
    else{
        sub.innerHTML = `<p>No subscription yet</p>`;
    }
    const mealPlan = JSON.parse(localStorage.getItem("nutritionPlan"));
    const meal = document.getElementById("meal");

    if(mealPlan){
        meal.innerHTML =  `
            <p> Carbs: ${mealPlan.carbs} </p>
            <p> protein: ${mealPlan.protein} </p>
            <p> Fat: ${mealPlan.fat} </p>
        `;
    }else{
        meal.innerHTML = `<p>No meal plan yet</p>`
    }

    const workoutPlan = JSON.parse(localStorage.getItem("workoutPlan"));
    const workout = document.getElementById("workout");
    if(workoutPlan){
        workout.innerHTML = `
            <p> Monday: ${workoutPlan.monday} </p>
            <p> Wednesday: ${workoutPlan.wednesday} </p>
            <p> Friday: ${workoutPlan.friday} </p>
            <p> Sudnay: ${workoutPlan.sunday} </p>
        `;
    }
    else{
        workout.innerHTML = `<p>No workout plan yet</p>`
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
            <P>Temperature :${temp}°C</p>
            <p>Weather${desc}</P>
            <p>Humidity: ${hum}%</p>
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



burger.addEventListener('click', ()=>{
    navlink.classList.toggle("open");
});

