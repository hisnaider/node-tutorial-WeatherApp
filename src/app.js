const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const weatherstack = require("./utils/weatherstack")

const app = express()

//Caminhos pro Express config
const publicDirectory = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//Localização do Handlebars engine e Views
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Pasta static pro servidor
app.use(express.static(publicDirectory))

app.get("", (req, res) => {
    res.render("index",{
        title: "Titulo maneiro",
        name: "Hisnaider Campello"
    })
})
app.get("/about", (req, res) => {
    res.render("about",{
        title: "Sobre",
        parag:"GRÊMIO!!!",
        name: "Hisnaider Campello"
    })
})

app.get("/help", (req, res) => {
    res.render("help",{
        title: "Ajuda",
        message:"Se vc quer ajuda, pesquisa no google, la vc encontra de tudo ;)",
        name: "Hisnaider Campello"
    })
})

app.get("/weather", (req, res) => {
    if (req.query.address){
        geocode(req.query.address,(error, {address, latitude,longitude} = {})=>{
            if(error) {
                return res.send({
                    error: error
                })
            }
            weatherstack({latitude,longitude}, "m", (error, {weather_descriptions:desc, temperature:temp, feelslike:feels} = {}) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                }
                return res.send({
                    forecast: desc[0],
                    location:{
                        latitude,longitude
                    },
                    address: address,
                    temperature:temp,
                    feelslike:feels
                })
            })
            
        })
    }
    else{
        return res.send({
            error: "Você tem que falar um endereço"
        })
    }
    
})

app.get("/help/*", (req, res) => {
    res.render("error404",{
        title: "404",
        message:"Há nenhum artigo com esse nome em Ajuda",
        name: "Hisnaider Campello"
    })
})


app.get("*", (req, res) => {
    res.render("error404",{
        title: "404",
        message:"Você foi longe de mais, há nada aqui pra ver",
        name: "Hisnaider Campello"
    })
})

app.listen(3000, ()=>{
    console.log("servidor online !!!")
})