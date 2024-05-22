const userLoggedInJSON = localStorage.getItem("userLoggedInJSON");
const userLoggedIn = document.querySelector(".nav li:last-child a");
if(userLoggedInJSON) {
    const userLoggedInObject = JSON.parse(userLoggedInJSON)
    userLoggedIn.innerHTML = `<i class="fa-solid fa-circle-user"></i> ${userLoggedInObject.fullName}`
}