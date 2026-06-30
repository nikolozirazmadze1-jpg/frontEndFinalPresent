const burger = document.getElementById("burger");
const navlink = document.getElementById("navlink");
const buttonReg = document.querySelector(".buttonReg");

const sendBtn = document.getElementById("sendBtn");
const myInput = document.getElementById("myInput");
const messages = document.getElementById("messages");


const savedPhoto = localStorage.getItem("profilePhoto");
if(savedPhoto){
    document.querySelector(".mychat img").src = savedPhoto;
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

    messages.innerHTML += `
          <div class="myMessage">
            <p>${text}</p>
        </div>
    `;
    myInput.value = "";
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        let response = "";
        if(text.includes("meal") || text.includes("Meal")){
            response = "Your meal includes : carbs 180g , protein 80g , fat 20g";
            localStorage.setItem("nutritionPlan", JSON.stringify({
                carbs: "180g",
                protein: "80g",
                fat: "20g"
            }));
        }
        else if(text.includes("workout") || text.includes("Workout")){
            response = "your work yout plan : Monday - Back , Wednesday - Legs , Friday - Chest , Sunday - Arms";
            localStorage.setItem("workoutPlan", JSON.stringify({
                monday : "Back",
                wednesday: "Legs",
                friday : "Chest",
                sunday: "Arms"
            }));
        }
        else{
            response = "Hi! Type 'meal plan' for a nutrition plan or 'workout plan' for a workout plan.";
        }
        messages.innerHTML += `
            <div class="mentorMessage" onclick = "window.location.href='./profile.html'">
                <p>${response}</p>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight
    }, 1000);
}

sendBtn.addEventListener("click", sendMessage);

myInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        sendMessage();
    }
});


burger.addEventListener('click', ()=>{
    navlink.classList.toggle("open");
});


