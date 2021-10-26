'use strict'
import db from './db'
const todo = {
 
   deleteTag : document.querySelector('.delete')
   ,
   async runx() { 
     await db.init()
     await db.readAll()
  }
       
   
}


//super mam vracena data
// dat rules jen na uzivatele tvio@centrum.cz
//nepredelat na CDN? nepredelat na REST?
// otestovat get 1  , PUT a SET
//pridat ptihlaseni pomoci google ?>> protahnout prihlaseni az na GUI..?
//parcel produkce

window.onload = ()=>{todo.runx()}


// todo.deleteTag.addEventListerner('click',()=>db.delete())

