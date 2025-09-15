/**
 * Verifica se o usuário está logado, se estiver redireciona para o perfil
 */

$(document).ready(function (){
    let lsActiveUser = localStorage.getItem("activeUser")
    let user = JSON.parse(lsActiveUser)
    if(user){
        window.location.replace("./perfil.html")
    }

})

/**
 * Função de login, cruza as informações de email e senha fornecidos com a lista de usuários
 */
function login(){
    let email = $("#email").val().toLowerCase() //recupera o email
    let senha = $("#senha").val().trim() //recupera a senha

    console.log(email, senha)

    let lsUserList = localStorage.getItem("userList") //recupera a lista de usuários
    let userList = JSON.parse(lsUserList)
    if(userList){ //verifica se a userList possui algum valor
        let userIndex = userList.findIndex((item)=>{ //verifica se o email e senha informados pertencem a um usuário
            return item.email === email && item.senha === senha // função de busca retorna -1 caso não encontre um resultado
        })
        if(userIndex !== -1){  // se encontrar um usuário fazer login
            let activeUser = userList[userIndex] //recupera as informações do usuário encontrado
            localStorage.setItem("activeUser", JSON.stringify(activeUser)) // Persiste o valor do objeto user no localStorage
            window.location.replace("./perfil.html") //redireciona para o perfil
        }else{
            alert("Usuário ou senha incorretos")
        }
    }else{
        alert("Usuário ou senha incorretos")
    }
}