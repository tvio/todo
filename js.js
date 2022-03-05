
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
    todo.add(ukol.value, termin.value, top.value, barva.value)
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
    todo.formTag[0].style.display = 'block'
    todo.addForm.style.display = 'none'
  })
}

// todo.deleteTag.addEventListerner('click',()=>db.delete())

//todo.deleteTag.addEventListener('click',()=>db.delete(ideck))
