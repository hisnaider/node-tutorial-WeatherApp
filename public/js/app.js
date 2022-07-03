console.log("Esta funcionando!!!")

const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const parag = document.querySelector("#result")

weatherForm.addEventListener("submit",(e)=>{
    parag.innerHTML = "Loading..."
    e.preventDefault()
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
        if (data.error){
            return parag.innerHTML = data.error
        }
        parag.innerHTML = `
            Endereço: ${data.address}<br>
            Coordenadas:<br>
               Latitude: ${data.location.latitude}<br>
               Longitude: ${data.location.longitude}<br>
            Temperatura: ${data.temperature}<br>
            Sensação termica: ${data.feelslike}<br>
            Previsão: ${data.forecast}
        `
    })
})
})