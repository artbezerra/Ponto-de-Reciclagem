let beneficios //variável global que representa o objeto de benefícios
let user //variável global que representa o objeto de benefícios

let points = JSON.parse(localStorage.getItem("recyclePoints"))
let criarNovoPonto = true;
let armazenaId

$(document).ready(function () {
    MostrarPontos()

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
})

function cadastrarPontos() {
    let lsPointList = localStorage.getItem("recyclePoints") //recupera a lista de usuários
    let pointList = JSON.parse(lsPointList)
    let local = $("#nomeLocal").val() //recupera o nome do local
    let endereco = $("#enderecoLocal").val() //recupera o nome do local
    let vidro = $("#matVidro")
    let papel = $("#matPapel")
    let metal = $("#matMetal")
    let plastico = $("#matPlastico")
    let eletronico = $("#matEletronicos")
    let residuos = $("#matResiduos")
    let coordenada = $("#coordinatesInput").val()

    console.log(coordenada)

    let newId = 1

    if (pointList != null) {
        if (pointList.length > 0)
            newId = Number(pointList[pointList.length - 1].id) + 1
    }
    else
        pointList = []

    let description = ""
    dados = {
        "id": newId,
        "name": local,
        "description": $("#detalhes").val(),
        "created": new Date(),
        "address": endereco,
        "coordinates": JSON.parse(coordenada),
        "materials": {
            "glass": vidro.is(":checked"),
            "paper": papel.is(":checked"),
            "metal": metal.is(":checked"),
            "plastic": plastico.is(":checked"),
            "electronic": false,
            "waste": residuos.is(":checked"),
        }
    }

    console.log(dados.coordinates)
    //Mostrar na tela o ponto criado e o total de pontos
    //console.log(dados)
    pointList.push(dados)
    localStorage.setItem("recyclePoints", JSON.stringify(pointList))
    //window.alert("Ponto gravado com sucesso!")
    const myTimeout = (location.reload(true), 3500);

}

function MostrarPontos() {
    //recupera as informações do usuário ativo
    let lsActiveUser = localStorage.getItem("activeUser")
    user = JSON.parse(lsActiveUser)

    //Criar cartoes em lista
    let str = ""

    if (points == null) {
        str += `Nenhum ponto encontrado.`
        $('#tela').html(str)
        return
    }

    for (i = 0; i < points.length; i++) {
        let ponto = points[i]
        let glass = ponto.materials.vidro
        str += `<div class="row p-4 bg-light position-relative text-center my-3 shadow" style="border-radius: 1rem">
            <div class="col-md-2 d-flex flex-column gap-3">
                <button class="btn btn-primary" onclick="editarPonto(${ponto.id})">
                    <i class="fa-solid fa-pen-to-square fa-xl"></i>
                    Editar
                </button>
                <button class="btn btn-danger" onclick="deletePonto(${ponto.id})"> 
                    <i class="fa-solid fa-trash fa-xl"></i>
                    Deletar
                </button>
            </div>
            <div class="col-md-7">
                <h2 class="mt-0 text-truncate">${ponto.name}</h2>
                <p>${ponto.address}</p>
                <h4>Materiais aceitos</h4>
                <div>
                ${ponto.description}
                </div>
                <div class="d-flex gap-2 justify-content-center">
                ${ponto.materials.plastic ? `<i id="plastic" class="fa-solid fa-recycle text-plastico" style="cursor: pointer;"
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip"
                data-bs-title="Plástico"></i>` : ""}
        
                ${ponto.materials.paper ? `<i id="paper" class="fa-solid fa-recycle text-papel" style="cursor: pointer;" data-bs-toggle="tooltip"
                data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Papel"></i>` : ""}
        
                ${ponto.materials.metal ? `<i id="glass" class="fa-solid fa-recycle text-vidro" style="cursor: pointer;" data-bs-toggle="tooltip"
                data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Vidro"></i>` : ""}
        
                ${ponto.materials.glass ? `<i id="metal" class="fa-solid fa-recycle text-metal" style="cursor: pointer;" data-bs-toggle="tooltip"
                data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="Metal"></i>` : ""}
        
                ${ponto.materials.waste ? `<i id="waste" class="fa-solid fa-recycle text-residuos" style="cursor: pointer;"
                data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip"
                data-bs-title="Resíduos"></i>` : ""}
                </div>
            </div>
            <div class="col-md-3">
                <div id="${ponto.id}mapa" style="height:200px; width: 100%;"></div>                
            </div>
        </div>`
    }

    $('#tela').html(str)

    points.forEach(point => {
        const map = L.map(`${point.id}mapa`).setView(point.coordinates, 15)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker(point.coordinates).addTo(map)
    })

    if (!user) window.location.replace("./index.html")
}

function deletePonto(idPonto) {
    let lsPointList = localStorage.getItem("recyclePoints") //recupera a lista de pontos
    let pointList = JSON.parse(lsPointList)

    pointList = pointList.filter(function (element) { return element.id != idPonto })

    localStorage.setItem("recyclePoints", JSON.stringify(pointList))
    const myTimeout = (location.reload(true));
}

const mapEdit = L.map('mapSelect').setView([-19.9478758, -44.1483559], 10)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapEdit);

let marker = {}

mapEdit.on("click", function (e) {
    $("#coordinatesInput").val(JSON.stringify([e.latlng.lat, e.latlng.lng]))
    mapEdit.removeLayer(marker)
    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mapEdit)
})

function editarPonto(idPonto) {

    criarNovoPonto = false
    $('#AddPontoReciclagem').modal('show');

    let lsPointList = localStorage.getItem("recyclePoints")
    let pointList = JSON.parse(lsPointList)
    let index = pointList.map(obj => obj.id).indexOf(idPonto);

    $('#nomeLocal').val(pointList[index].name)
    $('#enderecoLocal').val(pointList[index].address)
    $('#coordinatesInput').val(pointList[index].coordinates)

    $("#matVidro").prop('checked', pointList[index].materials.glass)
    $("#matPapel").prop('checked', pointList[index].materials.paper)
    $("#matMetal").prop('checked', pointList[index].materials.metal)
    $("#matResiduos").prop('checked', pointList[index].materials.waste)
    $("#matPlastico").prop('checked', pointList[index].materials.plastic)
    $("#matEletronico").prop('checked', pointList[index].materials.electronic)

    console.log(pointList[index].coordinates)

    armazenaId = idPonto
}

function cadastrarNovoPonto() {
    criarNovoPonto = true
    $('#AddPontoReciclagem').modal('show');
}

function verificarTipoInsercao() {
    if (criarNovoPonto)
        cadastrarPontos()
    else {
        alterarPonto()
    }
}

function alterarPonto() {
    let lsPointList = localStorage.getItem("recyclePoints")
    let pointList = JSON.parse(lsPointList)
    let index = pointList.map(obj => obj.id).indexOf(armazenaId);
    let coordenada = $("#coordinatesInput").val()
    console.log(coordenada)

    pointList[index].name = $("#nomeLocal").val()
    pointList[index].address = $("#enderecoLocal").val()
    console.log($("#coordinatesInput").val())
    pointList[index].coordinates = JSON.parse(coordenada)
    //console.log(pointList[index].coordinates)


    pointList[index].materials.glass = $("#matVidro").is(":checked")
    pointList[index].materials.paper = $("#matPapel").is(":checked")
    pointList[index].materials.metal = $("#matMetal").is(":checked")
    pointList[index].materials.plastic = $("#matPlastico").is(":checked")
    pointList[index].materials.electronic = $("#matEletronicos").is(":checked")
    pointList[index].materials.waste = $("#matResiduos").is(":checked")
    localStorage.setItem("recyclePoints", JSON.stringify(pointList))
    const myTimeout = (location.reload(true), 1000);
}

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