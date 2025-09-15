function navegar() {
    window.location = './Registro.html'
}


function selectPoint(point, map) {

    $("#detalhes").show()
    $("#title").html(point.name)
    $("#address").html(point.address)

    if (!point.materials.plastic) $("#plastic").hide()
    else $("#plastic").show()

    if (!point.materials.paper) $("#paper").hide()
    else $("#paper").show()

    if (!point.materials.glass) $("#glass").hide()
    else $("#glass").show()

    if (!point.materials.metal) $("#metal").hide()
    else $("#metal").show()

    if (!point.materials.waste) $("#waste").hide()
    else $("#waste").show()
    console.log(point)
    map.flyTo(point.coordinates, 15)
}

let user = JSON.parse(localStorage.getItem("activeUser"))

if (user) {
    $("#perfil").prop("hidden", false)
    $("#entrar").prop("hidden", true)
    $("#cadastrar").prop("hidden", true)
    $("#welcome").empty()
} else {
    $("#perfil").prop("hidden", true)
    $("#entrar").prop("hidden", false)
    $("#cadastrar").prop("hidden", false)
}


$(document).ready(function () {
    if (!localStorage.getItem("recyclePoints"))
        localStorage.setItem("recyclePoints", JSON.stringify([
            {
                id: 0,
                name: "Reciclagem Quirino",
                address: "Vila Cristina, Betim - MG, 32675-814",
                description: "...descrição...",
                coordinates: [-19.9478758, -44.1483559],
                materials: {
                    glass: true,
                    paper: true,
                    metal: true,
                    plastic: true,
                    electronic: false,
                    waste: false,
                }
            },
            {
                id: 1,
                name: "Ferro Velho Reciclagem Beira Rio",
                address: "R. Antônio Alves de Oliveira, 388 - Brasiléia, Betim - MG, 32600-334",
                description: "...descrição...",
                coordinates: [-19.9645557, -44.2040171],
                materials: {
                    glass: false,
                    paper: false,
                    metal: false,
                    plastic: false,
                    electronic: false,
                    waste: true,
                }
            }]))

    if (!localStorage.getItem("userList"))
        localStorage.setItem("userList", JSON.stringify([{
            nome: "Usuário de teste",
            email: "teste@gmail.com",
            senha: "123456",
            bio: "Biografia de teste",
            beneficios: {
                pontosTotais: 1000,
                historicoPontos: []
            }
        }]))


})

const map = L.map('map').setView([-19.9478758, -44.1483559], 10)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

points = JSON.parse(localStorage.getItem("recyclePoints"))

if (points) {
    points.map(point => {
        if (point?.coordinates)
            L.marker(point.coordinates).addTo(map).on('click', function () {
                selectPoint(point, map)
            })
    })
}