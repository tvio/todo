//pridat plusko na hlavni stranku, po kliknuti disabled a zobrazit form.


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
   mainTag : document.getElementById('con'),
   //deleteTag: 'dynamic predelat',
   async add(hodnota){
     await db.add(hodnota)
     console.log('proc tohle nepise')
    while (this.mainTag.firstChild){
     
      this.mainTag.firstChild.remove()
    }
     await db.readAll()
   },
   async runx() { 
     await db.init()
     await db.readAll()
  },
   async  delete(id){
       await db.delete(id)
      this.mainTag.innerHTML =''
        await db.readAll(); 

  }
       
   
}



window.onload = ()=>{
  todo.runx()
  todo.addTag.addEventListener('click',()=>{
    todo.add('ahooooooooooooooooj')
    
   })
   window.addEventListener('click',(e)=>{
     console.log(e.target)
     if (e.target.classList.contains('delete')){
       //console.log('clicked od delete')
            console.log('id',e.target.parentNode.id)
            todo.delete(e.target.parentNode.id)
     }
   })
  
}



// todo.deleteTag.addEventListerner('click',()=>db.delete())


//todo.deleteTag.addEventListener('click',()=>db.delete(ideck))