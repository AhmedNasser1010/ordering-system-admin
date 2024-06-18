import { auth } from "../firebase.js"
import DB_GET_DOC from "./DB_GET_DOC.js"

const startApp = async () => {

	// get user id
	const uid = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user.uid)
      }
      unsubscribe()
    })
  })

	// get user data
  const data = await DB_GET_DOC("users", uid)

  if (data) {
    return data
  } else {
    return false
  }
  
}

export default startApp