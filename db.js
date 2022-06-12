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
  enableLogging,
} from 'firebase/firestore'
// import { GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  onAuthStateChanged,
  getRedirectResult,
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth'

const db = {
  conTag: document.getElementById('con'),
  db: 'datbase object for firebase',
  app: 'app object for firebase',
  auth: 'nic',
  user: 'info o useru z google',

  async init() {
    // Your web app's Firebase configuration

    const firebaseConfig = {
      apiKey: 'AIzaSyCioN4bjNxS7XtD_-Dl8IBRXC-G3BzUNqg',
      authDomain: 'todo-e4df6.firebaseapp.com',
      authDomian: 'localhost:1234',
      projectId: 'todo-e4df6',
      storageBucket: 'todo-e4df6.appspot.com',
      messagingSenderId: '320940785976',
      appId: '1:320940785976:web:03c860b39f4e2ea77841cd',
      enableLogging: true,
    }

    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)
    this.auth = getAuth()
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid
        //console.log(user.email)
        console.log(user.email)
        console.log(user.reloadUserInfo.displayName)
        this.user = user.reloadUserInfo.displayName + ' ' + user.email
        //window.location.replace('index2.html')
        // ...
      } else {
        // User is signed out
        // ...

        //console.log(this.auth)
        //console.log(this.auth.config)
        //auth.languageCode = 'cz'

        //this.db = getFirestore()
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
        //   const auth = getAuth()
        //   this.db = getFirestore(this.app)
        //   await signInWithEmailAndPassword(auth, 'tvio@centrum.cz', '123Heslo')
        //     .then((userCredential) => {
        //       // Signed in
        //       const user = userCredential.user
        //       // console.log(user)
        //       // ...
        //     })
        //     .catch((error) => {
        //       const errorCode = error.code
        //       const errorMessage = error.message
        //     })

        //Sing in with Google account

        //console.log(user)

        const provider = new GoogleAuthProvider()

        signInWithRedirect(this.auth, provider).then(
          getRedirectResult((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            // The signed-in user info.
            const user = result.user

            console.log(result)

            // ...
          }).catch((error) => {
            //     // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            //     // The email of the user's account used.
            const email = error.email
            //     // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            console.log('err' + error)
            //     // ...
          })
        )
        //this.auth = getAuth()
      }
    })
  },

  async readAll() {
    try {
      //const user = auth.currentUser

      const q = query(
        collection(this.db, 'ukoly')
        //where('hodnota', '==', 'test')
        //where('author', '==', 'karel')
      )
      //console.log('deje se neco?')
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data())
        this.conTag.innerHTML += `<p class="karta" style="background-color:${
          doc.data().barva
        }" id=${doc.id}>id:${doc.id},data:${doc.data().ukol},${
          doc.data().termin
        },${doc.data().top}
        
          <i class="delete material-icons">delete</i></p>`
      })
    } catch (e) {
      console.log(e)
      c
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
