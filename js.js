//24.5
//Funguje mi signwithredirect, predsadil jsem onauthstatechange, jinak se mi to cyklylo.
//Predelat z index2.html na puvodni html.
// Zobrozit preihlaseneneho
//Procist ukoly

//20.3
//Zkousim redirect na jinou page, ale podle me porad nejde lgoinwuthredirect, asi to bude hazet chybu

// Ale nejde porad kod uvnitr signinwithredirect
//Zkousel jsem Dat uplnej init mimo, aby se znovu negeneroval auth
//udelat logou od google

//13.3
//funguje google authenticator pres popup, dopilovat pres redirect

//9.3
//funguje zobrazeni barvy, datum se nejak zahadne ukazuje normonale, proc?
// upravit css aby se form ukazovl normalne na vsech velikostech, media guery
// pripravit css pro polozky - data , termin, , zacit delat na autentizaci pomoci google
// dat do dat jmeno z autentizace, upravit query

//7.3
//funguje insert do db vececi z formu. Dodelat predelani timestamp na datum local. Pridame teda moment.
//Zmenit barvu z return data na obarveni polzky

// 5.3
// nezobrazuje mi to druhe plus

//1.3.2022
// refaktor na form[0], ale zatim nereaguje tlacitko plus na zobraznei formu, opravit chybu v konzoli

//nejde mi add do databaze, nekde to volam driv nez pri stisku toho addtlacitka
//propjeni obou tlacitke!!!????
//Delam na pridavaci funkci s komepltnimi daty

//pridat datum vlozeni do DB, pripadne datum modifikace
// pridat update
//ocekovat fungovani spravne delete

//nemam check na kazdek delete, dat listener na document nebo lepe? Tohle je nebo neni?
// identifikovat radek, na kterem delam delete, identifovkat zaznam v dB
//prehodit generovani html z DB do JS funkce maluj
// dat rules jen na uzivatele tvio@centrum.cz
//nepredelat na CDN? nepredelat na REST?
// otestovat get 1  , PUT a SET
//pridat ptihlaseni pomoci google ?>> protahnout prihlaseni az na GUI..?
//parcel produkce

'use strict'
import db from './db'
const todo = {
  //deleteTag : document.querySelector('.delete'),
  addForm: document.getElementById('plusFirst'),
  addTag: document.getElementById('plus'),
  mainTag: document.getElementById('con'),
  formTag: document.getElementsByTagName('form'),

  //deleteTag: 'dynamic predelat',
  async add(ukol, termin, top, barva) {
    await db.add(ukol, termin, top, barva)
    console.log('jdeme na cteni po vlozeni')
    while (this.mainTag.firstChild) {
      this.mainTag.firstChild.remove()
    }
    await db.readAll()
  },
  async runx() {
    await db.init()
    await db.readAll()
  },
  async delete(id) {
    await db.delete(id)
    this.mainTag.innerHTML = ''
    await db.readAll()
  },
}

window.onload = () => {
  todo.runx()
  todo.addTag.addEventListener('click', () => {
    //nacti inputy
    const ukol = document.getElementsByName('ukol')
    const termin = document.getElementsByName('termin')
    const top = document.getElementsByName('top')
    const barva = document.getElementsByName('barva')

    //cele by to melo jet sekvence
    //atributy z formu predej do DB
    //pridej try/catchblcok kdyz insert nedopadne
    console.log(ukol[0].value, termin[0].value, top[0].value, barva[0].value)
    todo.add(ukol[0].value, termin[0].value, top[0].value, barva[0].value)
    //napis hlasku o pridani

    //vypni form a zobraz puvoni plusitko
    todo.formTag[0].style.display = 'none'
    todo.addForm.style.display = 'block'
  })
  window.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.classList.contains('delete')) {
      //console.log('clicked od delete')
      //console.log('id', e.target.parentNode.id)
      todo.delete(e.target.parentNode.id)
    }
  })
  todo.addForm.addEventListener('click', () => {
    console.log('clicked')
    console.log('form', todo.formTag)
    todo.addTag.style.display = 'block'
    todo.formTag[0].style.display = 'block'
    todo.addForm.style.display = 'none'
  })
}

// todo.deleteTag.addEventListerner('click',()=>db.delete())

//todo.deleteTag.addEventListener('click',()=>db.delete(ideck))
