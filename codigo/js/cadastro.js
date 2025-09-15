/**
 * Verifica se o usuário está logado, se sim redireciona para o perfil
 */
$(document).ready(function () {
    let lsActiveUser = localStorage.getItem("activeUser")
    let user = JSON.parse(lsActiveUser)
    if (user) {
        window.location.replace("./perfil.html")
    }
})

/**
 * Cadastra um novo usuário
 */
function cadastrar() {
    let lsUserList = localStorage.getItem("userList") //recupera a lista de usuários
    let userList = JSON.parse(lsUserList)

    let nome = $("#nome").val() //recupera o nome
    let email = $("#email").val().toLowerCase() //recupera o email
    let senha = $("#senha").val().trim() //recupera a senha
    let senhaConfirmacao = $("#confirmar-senha").val().trim() //recupera a senha de confirmação

    let jaCadastrado = false
    if (userList?.length)
        userList.map((item) => {
            if (item.email == email)
                jaCadastrado = true
            else
                jaCadastrado = false
        })

    console.log(jaCadastrado)
    console.log(jaCadastrado ? "sim" : "não")

    if (nome === "" || email === "" || senha === "" || senhaConfirmacao === "")
        $("#res").html("<div class='alert alert-danger w-100'>Preencha todos os campos</div>")
    else if (jaCadastrado)
        $("#res").html("<div class='alert alert-danger w-100'>Email já cadastrado</div>")
    else if (senha !== senhaConfirmacao)
        $("#res").html("<div class='alert alert-danger w-100'>Senhas não conferem</div>")
    else {
        let user = { //cria um novo objeto user
            nome: nome,
            email: email,
            senha: senha,
            bio: `Olá sou ${nome}!`,
            beneficios: {
                pontosTotais: 0,
                historicoPontos: []
            }
        }

        // ADICIONANDO USUÁRIO À LISTA
        userList.push(user)
        localStorage.setItem("activeUser", JSON.stringify(user))
        localStorage.setItem("userList", JSON.stringify(userList))

        window.location.replace("./perfil.html")
    }
}