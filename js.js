
'use strict'
import db from './db'
const todo = {
  //deleteTag : document.querySelector('.delete'),
  addForm: document.getElementById('plusFirst'),
  addTag: document.getElementById('plus'),
  mainTag: document.getElementById('con'),
  formTag: document.getElementsByTagName('form'),
  user: document.getElementById('user'),

  //deleteTag: 'dynamic predelat',
  async add(ukol, termin, top, barva, user) {
    await db.add(ukol, termin, top, barva, user)
    console.log('jdeme na cteni po vlozeni')
    while (this.mainTag.firstChild) {
      this.mainTag.firstChild.remove()
    }
    await db.readAll()
  },
  async runx() {
    db.init().then(() => {
      this.user.innerHTML = db.user.displayName + ' ' + db.user.email
      db.readAll()
    })
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
    todo.add(
      ukol[0].value,
      termin[0].value,
      top[0].value,
      barva[0].value,
      db.user.uid
    )
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
