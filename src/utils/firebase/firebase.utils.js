import {initializeApp} from 'firebase/app';
import {getAuth,signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore'

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
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

  //FireStore
  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionReference = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionReference, object.title.toLowerCase());
        batch.set(docRef,object);
    })

    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} =docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (userAuth,additionalInformaion={}) => {
    if(!userAuth) return;

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
                createdAt,
                ...additionalInformaion
            })
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
  }

  return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return;

    
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword= async (email,password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)