const request = require("postman-request")

const key = "?access_token=pk.eyJ1IjoiaGlzbmFpZGVyIiwiYSI6ImNsNHJsYnF0NTBsZTUzaXFubzdxeDAydGIifQ.Lh66d2ykfXpbnWZA1q7djA"

module.exports = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json${key}&limit=1&language=pt`
    request({url, json: true}, (error, {body:{features}}) => {
        if (error) {
            return callback("Falha na comunicação, verifique sua internet ou tente mais tarde!")
        }
        if(features[0]){
            return callback(null, {
                address: features[0].place_name,
                latitude: features[0].center[1],
                longitude: features[0].center[0],
            })
        }
        return callback("Não foi possivel achar ou não existe essa localização!")
    })
}


// const baseUrl = "https://api.mapbox.com/geocoding/v5"
// const endpoint = "/mapbox.places"
// const search_text = "/rio_grande.json"
// const key = "?access_token=pk.eyJ1IjoiaGlzbmFpZGVyIiwiYSI6ImNsNHJsYnF0NTBsZTUzaXFubzdxeDAydGIifQ.Lh66d2ykfXpbnWZA1q7djA"
// const limit = "&limit=1"
// const url = baseUrl+endpoint+search_text+key+limit

// request({url, json:true}, (error, response) => {
//     if (error){
//         return console.log("Falha na comunicação, verifique sua internet ou tente mais tarde!")
//     }
//     try{
//         const loc = response.body.features[0].place_name.split(",")
//         const coord = response.body.features[0].center
//         console.log("Pais:"+loc[2])
//         console.log("Estado:"+loc[1])
//         console.log("Cidade: "+loc[0])
//         console.log("Cordenadas: ")
//         console.log("     Latitude: "+coord[1])
//         console.log("     Logintude: "+coord[0])
//     }catch(e){
//         console.log("Não foi possivel achar ou não existe essa localização!")
//     }
// })