/**
 * Verifica se o usuário está logado, se estiver adapta o menu para exibir as opções corretas
 */
$(document).ready(function (){
    let lsActiveUser = localStorage.getItem("activeUser")
    let user = JSON.parse(lsActiveUser)

    if(user){
        $("#perfil").prop("hidden", false)
        $("#entrar").prop("hidden", true)
        $("#cadastrar").prop("hidden", true)
    }
    else{
        $("#perfil").prop("hidden", true)
        $("#entrar").prop("hidden", false)
        $("#cadastrar").prop("hidden", false)
    }

})
