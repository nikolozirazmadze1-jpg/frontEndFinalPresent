

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#])[A-Za-z\d@$!%*?&._#]{6,18}$/;
const phoneRegex = /^\+9955\d{8}$/;



const overReg = document.getElementById("overReg");
const buttonReg = document.querySelector(".buttonReg");
const startBtn = document.getElementById("startBtn");
const exitLogo =  document.getElementById("overLogo");
const regForm = document.getElementById("regForm");



function openPopup(){
    overReg.style.display = 'flex';
}
function closePopup(){
    overReg.style.display = 'none';
}


startBtn.addEventListener('click',openPopup);
buttonReg.addEventListener('click', openPopup);
exitLogo.addEventListener('click', closePopup);


window.addEventListener('click', (event) =>{
    if(event.target === overReg){
        closePopup();
    }
});

regForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const userNameVal = document.getElementById('userName').value;
    const userPasswordVal = document.getElementById("userPassword").value;
    const userGmailVal = document.getElementById('userGmail').value;
    const userNumberVal = document.getElementById('userNumber').value;
    function validate(email, pass, num){
        return{
            email : emailRegex.test(email),
            pass: passwordRegex.test(pass),
            num: phoneRegex.test(num)
        };
    }

    const validation = validate(userGmailVal, userPasswordVal, userNumberVal);

    if(userNameVal.trim() === ''){
        alert("Name cannot be empty!");
        return;
    }
    
    if(!validation.pass){
        alert("Password must be 6-18 characters, include uppercase, lowercase, number and special character!")
        return;
    }
    if(!validation.email){
        alert("Invalid email! Only @gmail.com is allowed");
        return;
    }
    if(!validation.num){
        alert("Phone number must be in format: +9955")
        return;
    }
    if(validation.email === true && validation.pass === true && validation.num === true){
        alert("You have been registered successfully");
    }
    localStorage.setItem('person_user', userNameVal);
    localStorage.setItem('person_gmail', userGmailVal);

    window.location.href = './dashboard.html';
});



