'use strict'
//super mam vracena data
// dat rules jen na uzivatele tvio@centrum.cz
//nepredelat na CDN? nepredelat na REST?
// otestovat get 1  , PUT a SET
//pridat ptihlaseni pomoci google ?>> protahnout prihlaseni az na GUI..?

//parcel produkce
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore'
// import { GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCioN4bjNxS7XtD_-Dl8IBRXC-G3BzUNqg',
  authDomain: 'todo-e4df6.firebaseapp.com',
  projectId: 'todo-e4df6',
  storageBucket: 'todo-e4df6.appspot.com',
  messagingSenderId: '320940785976',
  appId: '1:320940785976:web:03c860b39f4e2ea77841cd',
}
const app = initializeApp(firebaseConfig)

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
signInWithEmailAndPassword(auth, 'tvio@centrum.cz', '123Heslo')
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })

const db = getFirestore(app)

async function getTest() {
  try {
    //const user = auth.currentUser
    const q = query(
      collection(db, 'test'),
      where('hodnota', '==', 'test')
      // where('author', '==', user.uid)
    )
    console.log('deje se neco?')
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data())
    })
  } catch (e) {
    console.log(e)
  }
}

getTest()

// Get a list of cities from your database
// async function getTest(db) {
//   const testCol = collection(db, 'test')
//   const testSnapshot = await getDocs(testCol)
//   const vystup = testSnapshot.docs.map((doc) => doc.data())
//   return vystup
// }

// console.log(getTest(db))
