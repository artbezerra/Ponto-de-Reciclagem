let beneficios //variável global que representa o objeto de benefícios
let user //variável global que representa o objeto de benefícios

/**
 * executa ao carregar a página,
 * recupera o valor no localStorage e popula a variável global usuários ativos que pode ser acessada em qualquer função
 */
$(document).ready(function (){
    //recupera as informações do usuário ativo
    let lsActiveUser = localStorage.getItem("activeUser")
    user = JSON.parse(lsActiveUser)

    if(!user){
        window.location.replace("./index.html") //redireciona para a página principal
    } else{
        beneficios = user.beneficios
        atualizarEstado()
    }
})

function atualizarEstado(){
    calcularNivel(beneficios) //calcula o nível, barra de progresso e demais componentes
    $("#historicoResgatesTable").html(gerarTabelaResgates(beneficios.historicoPontos)) //gera a tabela com o histórico de resgates
    user.beneficios = beneficios // atualiza os benefícios do usuário
    localStorage.setItem("activeUser", JSON.stringify(user)) // Persiste o valor do objeto user no localStorage a cada atualização
}

/**
 * Recupera o histórico de pontos e adiciona uma linha de tabela para cada item do objeto
 * @returns {string}
 */
function gerarTabelaResgates(){
    let html = ""
    beneficios.historicoPontos.forEach((item)=>{
        html +=
            `
                <tr>
                  <th scope="row">${item.codigo}</th>
                  <td>${item.dataResgate}</td>
                  <td>${item.local}</td>
                </tr>
            `
    })
    return html
}

/**
 * Função utilizada para retornar a data atual no formato DD/MM/YYYY
 * @returns {Date}
 */
function getDataAtual(){

    let hoje = new Date();
    let dd = hoje.getDate();
    let mm = hoje.getMonth() + 1;

    let yyyy = hoje.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    hoje = dd + '/' + mm + '/' + yyyy;
    return hoje
}

/**
 * Função chamada pelo HTML, resgata um código e atualiza os estados dos demais componentes para atender aos novos
 * valores
 */
function resgatarCodigo(){
    let codPromo = $("#codPromo").val().toString().toUpperCase() //recupera o códPromocional
    beneficios.pontosTotais = beneficios.pontosTotais + 25 //adicionar 25 a pontuação total
    beneficios.historicoPontos.push( //adiciona o cupom ao histórico
        {
            codigo: codPromo,
            valor: 25,
            local: "PUC Betim",
            dataResgate: getDataAtual()
        }
    )
    $("#codPromo").val("") //limpa o campo de códPromocional
    atualizarEstado() //atualiza e persiste os valores
}

/**
 * calcula o nível de benefícios do usuário
 * IMPORTANTE cada nível precisa de 100 de xp
 */
function calcularNivel(){
    let nivelAtual = Math.floor(beneficios.pontosTotais / 100) +1 //nível atual
    $("#currentLvl").html(nivelAtual)
    $("#remaningXp").html(Math.abs(beneficios.pontosTotais % 100  - 100) ) //xp restante para o próximo nível
    $("#progressBar").html(`${beneficios.pontosTotais % 100}%`) //porcentagem atual
    $("#progressBar").css({width: `${beneficios.pontosTotais % 100}%`}) // porcentagem atual na barra de progresso
    setNivelAtual(nivelAtual) //atualiza o nível atual
}

/**
 * Atualiza a tabela para refletir o nível atual, marcando todas as linhas que o usuário desbloqueou
 * @param nivel
 */
function setNivelAtual(nivel){ //
    switch (nivel){
        case 1:
            $("#lvl1").addClass("table-success")
            $("#lvl2").removeClass("table-success")
            $("#lvl3").removeClass("table-success")
            $("#lvl4").removeClass("table-success")
            $("#lvl5").removeClass("table-success")
            break;
        case 2:
            $("#lvl1").addClass("table-success")
            $("#lvl2").addClass("table-success")
            $("#lvl3").removeClass("table-success")
            $("#lvl4").removeClass("table-success")
            $("#lvl5").removeClass("table-success")
            break;
        case 3:
            $("#lvl1").addClass("table-success")
            $("#lvl2").addClass("table-success")
            $("#lvl3").addClass("table-success")
            $("#lvl4").removeClass("table-success")
            $("#lvl5").removeClass("table-success")
            break;
        case 4:
            $("#lvl1").addClass("table-success")
            $("#lvl2").addClass("table-success")
            $("#lvl3").addClass("table-success")
            $("#lvl4").addClass("table-success")
            $("#lvl5").removeClass("table-success")
            break;
        case 5:
            $("#lvl1").addClass("table-success")
            $("#lvl2").addClass("table-success")
            $("#lvl3").addClass("table-success")
            $("#lvl4").addClass("table-success")
            $("#lvl5").addClass("table-success")
            break;
    }
}


/**
 * Realiza o logout do usuário
 * A função recupera a lista de usuários e busca pelo item relativo ao usuário ativo (activeUser)
 * O objeto do usuário ativo é salvo na lista de usuários (userList)
 * Então o objeto do usuário ativo é limpo e o usuário é redirecionado para a página principal
 */
function logout() {
    let lsUserList = localStorage.getItem("userList")
    let userList = JSON.parse(lsUserList)

    let lsActiveUser = localStorage.getItem("activeUser")
    user = JSON.parse(lsActiveUser)

    if (!userList) { //verifica se a userList possui algum valor (esperado que sim ao fim da implementação)
        userList = []
        userList.push(user)
    }
    else {
        let userIndex = userList.findIndex((item) => { //se possuir procura pelo índice que corresponde ao email do usuário ativo
            return item.email === user.email
        })
        userList[userIndex] = user //atualiza o usuário ativo no banco de usuários
    }
    localStorage.setItem("userList", JSON.stringify(userList)) //atualiza o banco de usuários
    localStorage.removeItem("activeUser") //limpa o usuário ativo
    window.location.replace("./index.html") //redireciona para a página principal
}



