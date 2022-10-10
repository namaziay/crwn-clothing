import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3RHUqrCvM7Aw2d0slSOHQ4chiE3QZiyw",
    authDomain: "crwn-clothing-db-42d69.firebaseapp.com",
    projectId: "crwn-clothing-db-42d69",
    storageBucket: "crwn-clothing-db-42d69.appspot.com",
    messagingSenderId: "202102327860",
    appId: "1:202102327860:web:943349007fd6f58da49861"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  //FireStore
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);
    const userExists = userSnapShot.exists();
    
    //Check if user data exists
    if(!userExists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
  }

  return userDocRef;

}