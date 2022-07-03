const request = require("postman-request")

const key = "?access_key=9513f339b43a8ac521fc8b27b83db57e"

module.exports = ({latitude,longitude}, unit, callback) =>{
    const url = `http://api.weatherstack.com/current${key}&query=${longitude},${latitude}&units=${unit}`
    request({url, json:true}, (error, {body:{current}}) => {
        if (error) {
            return callback("Falha na comunicação, verifique sua internet ou tente mais tarde!")
        }
        if(current) {
            return callback(null, current)
        }
        return callback("Sem informações sobre essa localização!")
    })
}

/*const baseUrl = "http://api.weatherstack.com/current"
const key = "?access_key=9513f339b43a8ac521fc8b27b83db57e"
const query = "&query=-32.0334,-52.0991"
const unit = "&units=f"
const url = baseUrl+key+query+unit
request({url, json:true}, (error, response) => {
    console.log(response.body.current.weather_descriptions[0]+
        "\nTemperatura atual: "+response.body.current.temperature + 
        "\nSensação termica: "+response.body.current.feelslike)
})

*/