const startMsg = require('./startMsg.js')
const { GET_DOC } = require('./FIRESTORE/DB_CONTROLLERS.js')
const { store, setState, setValue } = require('../store.js')
const { db } = require("../config/firebase")
const { doc, onSnapshot, collection, query, where, getDocs } = require("firebase/firestore")

// User uid is static right now!!!!!!!
const userUid = 'mXbSx5DmWyc4uzTHKkvmbmvpXev2'

async function onStartApp() {
	try {
		console.log('Starting...')
		setState('user')
		setState('restaurants')
		
		const user = await GET_DOC('users', userUid)
		.then(res => {
			if (res) {
				setValue('user', res)
				return res
			}
			return null
		})
		.catch(e => {
			console.error(e)
			return null
		})

		const businessIDs = user.data.businesses
  	const q = query(collection(db, "businesses"), where("accessToken", "in", businessIDs))
		const querySnapshot = await getDocs(q)

		querySnapshot.forEach(doc => {
			if (store.restaurants.values) {
				setValue('restaurants', [ ...store.restaurants.values, doc.data() ])
			} else {
				setValue('restaurants', [ doc.data() ])
			}
		})

		console.clear()
		startMsg()
	} catch(e) {
		console.error(e)
	}

}

module.exports = onStartApp