function handleLoginAccount(){
    const loginForm = document.getElementById('login-form');
    fetch("http://localhost:3000/users")
        .then(response => {
            if (response.ok){
                return response.json();
            }else {
                throw new Error('Network response was not ok');
            }
        })
        .then(users => loginAccount(users,loginForm))
        .catch(error => console.log(error));
}
handleLoginAccount()

function loginAccount(users,loginForm){
    const username = loginForm.querySelector("#username")
    const password = loginForm.querySelector("#password")
    const loginButton = loginForm.querySelector('#login-btn');
    loginButton.addEventListener("click", event => {
        event.preventDefault();
        let userLoggedIn = users.find(user => user.username === username.value && user.password === password.value);
        if(userLoggedIn){
            localStorage.setItem('userLoggedInJSON', JSON.stringify(userLoggedIn));
            location.href = '/read-book-online-project/app/pages/index.html';
        }
    })
}