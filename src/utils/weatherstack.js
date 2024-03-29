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