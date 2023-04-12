const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

let adj = new Date()
let options = {weekday: 'long'};
let jourActuel = adj.toLocaleDateString('fr-FR', options)

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1)

let tabJourEnOrdre = joursSemaine.slice(jourSemaine.indexOf(jourActuel))
    .concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)))

const CLEFAPI = 'df10b74539bc5f30a6bacf07255'
let resultAPI
const temps = document.querySelector(".temps")
const temperature = document.querySelector(".temperature")
const localisation = document.querySelector(".localisation")
const heure = document.querySelectorAll(".heure-nom-prevision")
const tempPourH = document.querySelectorAll(".heure-prevision-valeur")

const joursDiv = document.querySelectorAll(".jour-prevision-nom")
const tempsJourDiv = document.querySelectorAll(".jour-prevision-temp")
const imIcon = document.querySelector(".logo-meteo")

if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        let long = position.coords.longitude;
        let lat = position.coords.latitude
        AppelAPI(long, lat)
    }, () => {
        alert("Vous avez refusé la géolocalisation veuillez l'accepter")
    }) 
}


function AppelAPI(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?\
            lat=${lat}&lon=${long}&exclude=minutely\
            &units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        resultatAPI = data

        temps.innerText = resultatAPI.current.weather[0].description
        temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°`
        localisation.innerText = resultatAPI.timezone

        let heureActuelle = new Date().getHours()

        for(let i = 0; i < heure.length; i++) {
            let heureIncr = heureActuelle + i*3
            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`
            } else if(heureIncr==24) {
                heure[i].innerText = "OO h"
            } else {
                heure[i].innerText = `${heureIncr} h`
            }
        }

        for(let j=0; j<tempPourH.length; j++) {
            tempPourH[j].innerText= `${Math.trunc(resultatAPI.hourly[j*3]).temp}°`
        }

        for(let k=0; k<tabJourEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJourEnOrdre[k].slice(0, 3)
        }

        for(let m=0; m<7; m++) {
            tempsJourDiv[m].innerText = `${Math.trunc(resultatAPI.daily[m+1].temp.day)} °`
        }

        if(heureActuelle >= 6 && heureActuelle < 21) {
            imIcon.src = `res/jour/${resulatAPI.curren.weather[0].icon}.svg`
        } else {
            imIcon.scr = `res/nuit/${resultatAPI.current.weather[0].icon}.svg `
        }

        overlayer.classList.add("disparition")
    })
}
