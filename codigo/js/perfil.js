//Executa ao iniciar, atualizando as informações com base no localStorage
$(document).ready(function () {
    atualizarInformacoes()
})

function atualizarInformacoes(){
    if(user){ //verifica se o usuário está logado
        //Atualiza o HTML com as informações do usuário
        $("#profile_name").html(user.nome)
        $("#profile_email").html(user.email)
        $("#profile_bio").html(user.bio)

        $("#nome").val(user.nome)
        $("#email").val(user.email)
        $("#bio").val(user.bio)
    }
}


//Edita as informações do usuário, e atualiza a lista de usuários no processo (para atualizar o email)
function EditarInfo (){
    let lsUserList = localStorage.getItem("userList")
    let userList = JSON.parse(lsUserList)

    let indexToUpdate = userList.findIndex((item) => { //busca pelo índice do usuário ativo no banco
        return item.email === user.email
    })

    //recupera as informações do modal de atualização do perfil
    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;
    const bio = document.querySelector("#bio").value;
    const senha = document.querySelector("#senha").value;
    const senha_confirmacao = document.querySelector("#confirmar_senha").value;

    if(senha.trim() !== senha_confirmacao.trim()){ //verifica se as senhas são iguais antes de atualizar o pefil
        alert("Senhas não conferem")
    }else{
        user.nome = nome
        user.email = email
        user.bio = bio
        if(senha !== "") { // atualiza a senha apenas se ela tiver sido alterada (campo não vazio)
            user.senha = senha
        }

        atualizarInformacoes()

        userList[indexToUpdate] = user //atualiza o usuário no banco

        localStorage.setItem("userList", JSON.stringify(userList))  //atualiza o banco de usuários
        localStorage.setItem("activeUser", JSON.stringify(user)) //atualiza o objeto do usuário ativo
    }
}
