let username= document.querySelector('.användarnamn')
let lösenord=document.querySelector('.lösenord')
let button= document.querySelector('.login')
let registera= document.querySelector('.googlelogin')
let loggaut= document.querySelector('.facebooklogin')

let user={
        username:username,
        password:lösenord
    }

registera.addEventListener('click', ()=>{
    user={
        username:username.value,
        password:lösenord.value
    }
    localStorage.setItem('user', JSON.stringify(user))
    let userData = JSON.parse(localStorage.getItem('user'))
    console.log(userData)
    alert('Du har skapat konto')
})

button.addEventListener('click', ()=>{
    let userData = JSON.parse(localStorage.getItem('user'))
    console.log(userData.username)
    if(userData.username===username.value){
        if(userData.password===lösenord.value){
            alert('Du har lyckas logga in!')
            sessionStorage.setItem('user', JSON.stringify(userData))
        }else{
            alert('Fel lösenord')
        }
    }else{
        alert('Fel username')
    }
})

loggaut.addEventListener('click', ()=>{
    let userData = JSON.parse(localStorage.getItem('user'))
    if(sessionStorage.getItem('user')){
        sessionStorage.clear()
        alert('Du har loggats ut')
    }else{
        alert('ingen är inloggad')
    }
})