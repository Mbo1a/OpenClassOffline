const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

let adj = new Date()
let options = {weekday: 'long'};
let jourActuel = adj.toLocaleDateString('fr-FR', options)

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1)

let tabJourEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel))
.concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)))
    
const CLEFAPI = 'c792ee48165debf84ca7cbfba3ed0998'
let resultatAPI;
let temps = document.querySelector(".temps");
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${CLEFAPI}`)
    //fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    // fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=${part}&appid=${CLEFAPI}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        resultatAPI = data
        const jsonObject = {
            "clouds": { "all": 75 },
            "dt": 1681387200,
            "dt_txt": "2023-04-13 12:00:00"
          };
          
          const dtTxtValue = jsonObject.dt_txt; // Access the value of dt_txt field and assign it to a variable
          
          console.log(dtTxtValue); // Output: 2023-04-13 12:00:00
          
        console.log(resultatAPI)
        console.log(resultatAPI.list[0].dt_txt)


        temps.innerText = resultatAPI.list[0].weather[0].description
        temperature.innerText = `${Math.trunc(resultatAPI.list[0].main.temp - 273)}°`
        localisation.innerText = resultatAPI.city.name

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
            // tempPourH[j].innerText= `${Math.trunc(resultatAPI.hourly[j*3]).temp}°`
            tempPourH[j].innerText= `${Math.trunc(resultatAPI.list[j].main.temp - 273)}°`
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
