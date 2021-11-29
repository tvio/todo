//nedavat chyby do konzole ale do na obr.
// osetrit chyby auth
//prehodit where pro hledani
'use strict'
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore'
// import { GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth'

const db = {
  conTag: document.getElementById('con'),
  db: 'datbase object for firebase',
  app: 'app object for firebase',
  async init() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyCioN4bjNxS7XtD_-Dl8IBRXC-G3BzUNqg',
      authDomain: 'todo-e4df6.firebaseapp.com',
      projectId: 'todo-e4df6',
      storageBucket: 'todo-e4df6.appspot.com',
      messagingSenderId: '320940785976',
      appId: '1:320940785976:web:03c860b39f4e2ea77841cd',
    }
    this.app = initializeApp(firebaseConfig)

    // //anonymous
    // const auth = getAuth()
    // signInAnonymously(auth)
    //   .then(() => {
    //     console.log(auth)
    //     // Signed in..
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code
    //     const errorMessage = error.message
    //     // ...
    //   })

    //Sign in with email and pass.
    const auth = getAuth()
    this.db = getFirestore(this.app)
    await signInWithEmailAndPassword(auth, 'tvio@centrum.cz', '123Heslo')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  },

  async readAll() {
    try {
      //const user = auth.currentUser
      //console.log(this.db)

      const q = query(
        collection(this.db, 'ukoly')
        //where('hodnota', '==', 'test')
        // where('author', '==', user.uid)
      )
      //console.log('deje se neco?')
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data())
        this.conTag.innerHTML += `<p class="karta" id=${doc.id}>id:${
          doc.id
        },data:${doc.data().ukol},${doc.data().termin},${doc.data().top},${
          doc.data().barva
        }<i class="delete material-icons">delete</i></p>`
      })
    } catch (e) {
      console.log(e)
    }
  },
  async delete(id) {
    try {
      const ret = await deleteDoc(doc(this.db, 'ukoly', id))

      console.log(ret)
    } catch (e) {
      console.log(e)
    }
  },
  async add(ukol, termin, top, barva) {
    data = { ukol, termin, top, barva }
    ret = await addDoc(collection(this.db, 'ukoly'), data)
    console.log(ret)
    //await db.collection('test').doc().set(hodnota)
    return ret
  },
}

export default db

// Get a list of cities from your database
// async function getTest(db) {
//   const testCol = collection(db, 'test')
//   const testSnapshot = await getDocs(testCol)
//   const vystup = testSnapshot.docs.map((doc) => doc.data())
//   return vystup
// }

// console.log(getTest(db))
