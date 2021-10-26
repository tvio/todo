

//nefujguje spravne add
//nemam check na kazdek delete, dat listener na document nebo lepe?
// identifikovat radek, na kterem delam delete, identifovkat zaznam v dB
//prehodit generovani html z DB do JS
// dat rules jen na uzivatele tvio@centrum.cz
//nepredelat na CDN? nepredelat na REST?
// otestovat get 1  , PUT a SET
//pridat ptihlaseni pomoci google ?>> protahnout prihlaseni az na GUI..?
//parcel produkce

'use strict'
import db from './db'
const todo = {
 
   //deleteTag : document.querySelector('.delete'),
   addTag : document.querySelector('.plus'),
   async add(){
     await db.add()
   },
   async runx() { 
     await db.init()
     await db.readAll()
  }
       
   
}



window.onload = ()=>{todo.runx()}


// todo.deleteTag.addEventListerner('click',()=>db.delete())

todo.addTag.addEventListener('click',()=>db.add('velka poznamka'))
todo.deleteTag.addEventListener('click',()=>db.delete(ideck))