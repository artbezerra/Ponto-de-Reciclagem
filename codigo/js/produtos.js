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

    var urlParams = new URLSearchParams(window.location.search);
    var searchQuery = urlParams.get("tipo");

    switch (searchQuery){
        case "plastico":
            $("#metal").prop("hidden", true)
            $("#papel").prop("hidden", true)
            $("#vidro").prop("hidden", true)
            break;
        case "vidro":
            $("#metal").prop("hidden", true)
            $("#papel").prop("hidden", true)
            $("#plastico").prop("hidden", true)
            break;
        case "metal":
            $("#plastico").prop("hidden", true)
            $("#papel").prop("hidden", true)
            $("#vidro").prop("hidden", true)
            break;
        case "papel":
            $("#metal").prop("hidden", true)
            $("#plastico").prop("hidden", true)
            $("#vidro").prop("hidden", true)
            break;
    }

})
