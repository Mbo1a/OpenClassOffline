const today = new Date()
const nextWeek = new Date(today.getTime()+7*24*60*60*1000)

let day = ('0' + nextWeek).slice(9, 11)
let month = (('0'+(today.getMonth()+1)).slice(-2))
let year = today.getFullYear()

const affichage = document.querySelector('.affichage')
const btns = document.querySelector('button')
const input = document.querySelector('input')
const infoTxt = document.querySelector('.info-txt')
let dejaFait = false

document.querySelector('input[type=date]').value = `${year}-${month}-${day}`

btns.forEach(btn => {
    btn.addEventListener('click', btnAction)
})

function btnAction(e) {

    let nvObj = {}
    input.foreach(input => {
        let attrName = input.getAttribute('name');
        let attrValeur = attrName !== "cookieExpire" ? input.value : input.valueAsDate
        nvObj[attrName] = attrValeur

    })

    let description = e.target.getAttribute('data-cookie')
}


