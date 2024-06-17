import { doc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { db } from "../firebase.js";

const DB_ARRAY_UNION = async (collection, subcollection, arrayPath, value) => {
  try {

    const docRef = doc(db, collection, subcollection);

    await updateDoc(docRef, {
      [arrayPath]: arrayUnion(value)
    })

  } catch (error) {

    console.error("Error update item: ", error);

  } 
}

export default DB_ARRAY_UNION;