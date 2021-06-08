let text = document.getElementById("text")
let userName = document.getElementById("userName");
let email = document.getElementById("email");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let website = document.getElementById("website");
let password = document.getElementById("password");
let notify = document.getElementById("notify");
let role = document.getElementById("role");


let bt = document.getElementById("button");

bt.addEventListener("click", function() {
    text.innerText = `username ${userName.value}\n email ${email.value}\nfirstName ${firstName.value}\n lastName ${lastName.value}\nwebsite ${website.value}\n password ${password.value}\n Send User Notification ${notify.checked} \nuserRole ${role.options[role.selectedIndex].text}`
});





