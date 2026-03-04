let username= document.querySelector('.användarnamn')
let lösenord=document.querySelector('.lösenord')
let button= document.querySelector('.login')
let registera= document.querySelector('.googlelogin')
let loggaut= document.querySelector('.facebooklogin')
let todos= document.querySelector('.todos')
let hidden= document.querySelector('.hidden')
let h1= document.querySelector('h1')
let mode= document.querySelector('.mode')

let id= 1


registera.addEventListener('click', ()=>{
    let user={
        username:username.value,
        password:lösenord.value,
        id
    }
    let users=[]
    if(localStorage.getItem('users')){
        users= JSON.parse(localStorage.getItem('users'))
        users.push(user)
    }else{
        users=[user]
    }
    id++
    localStorage.setItem('users', JSON.stringify(users))
    let userData = JSON.parse(localStorage.getItem('users'))
    console.log(userData)
    alert('Du har skapat konto')
})

let h2= document.createElement('h2')


button.addEventListener('click', ()=>{
    let userData = JSON.parse(localStorage.getItem('users'))
    let existingUser= userData.find((user=>user.username===username.value && user.password===lösenord.value ))
    if(existingUser){
        h2.innerHTML=`Du är nu inloggad som ${existingUser.name}!`
        //let params= new URLSearchParams()
        //params.append('userId', existingUser.id)
        async function getTodos(){
            let res= await fetch('https://jsonplaceholder.typicode.com/todos/'+existingUser.id)
            let json= await res.json()
            let li= document.createElement('li')
            todos.innerHTML=''
            li.innerHTML=JSON.stringify(json.title)
            let cb= document.createElement('input')
            cb.type='checkbox'
            if(json.completed){
                cb.checked= true
            }
            li.append(cb)
            todos.classList.remove('hidden')
            todos.append(li)
            let sesData= JSON.parse(sessionStorage.getItem('exUser'))
            let todo= {
                task:json.title,
                id: sesData.id
            }
            localStorage.setItem('todos', JSON.stringify(todo))
        }
        hidden.classList.remove('hidden')
        getTodos()
        document.body.append(h2)
        sessionStorage.setItem('exUser', JSON.stringify(existingUser))
    }else{
        alert('Fel uppgifter')
    }
})

loggaut.addEventListener('click', ()=>{
    let loggedIn = JSON.parse(sessionStorage.getItem('exUser'))
    console.log(loggedIn)
    if(loggedIn){
        sessionStorage.clear()
        alert('Du har loggats ut')
        todos.classList.add('hidden')
    }else{
        alert('ingen är inloggad')
    }
})
mode.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
    if(document.body.classList.contains('dark')){
        localStorage.setItem('mode', 'dark')
    }else{
        localStorage.setItem('mode', 'light')
    }
})

const onPageLoad =()=>{
    let saved= localStorage.getItem('mode')
    if(saved==='dark'){
        document.body.classList.add('dark')
    }
}

onPageLoad()

/*
    static hämta(){
        let antal=document.querySelector('[name="participants"]:checked')
        let aktivitet1= new Generate(antal,aktivitet,gratis)
        let params= new URLSearchParams()
        if (aktivitet1.antal.value!=0){
            params.append('participants',aktivitet1.antal.value)
        }
        if(aktivitet1.aktivitet.value!='all'){
            params.append('type',aktivitet1.aktivitet.value)
        }
        if (aktivitet1.gratis.checked){
            params.append('price',0)
        }
        console.log(params)
        let getActivity =async function(){
            let div= document.querySelector('.lista')
            let response= await fetch('https://bored.api.lewagon.com/api/activity?'+ params.toString())
            let json= await response.json()
            console.log(json)
            div.innerText=`
            Aktivity: ${json.activity}`*/