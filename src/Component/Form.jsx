import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import FormLabel from './FormLabel.jsx';

// Firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const Form = ({ settings: { theme, fields, endpoint, afterSubmitNavigatePath, apiAction, itemId, btnText, submitFunction, job } }) => {
	const [values, setValues] = useState();
	const [formErrorMessage, setFormErrorMessage] = useState("");
	const [inProgress, setInProgress] = useState(false);
	const navigate = useNavigate();

	// keyyyyyy

	const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

	// Set the default state values
	useEffect(() => {
		let defaultStateResult = {}
		fields.map(field => defaultStateResult[field.name] = field.defaultData)
		setValues(defaultStateResult)
	}, [])
	
    // On submit action
	const handleSubmit = (event) => {
		event.preventDefault();
		
		// Create or sign up user process
		if (!(values.password.length < 6)) {
			if (job === "register") {
				setInProgress(true);
				createUserWithEmailAndPassword(auth, values.email, values.password)
					.then(() => {navigate(afterSubmitNavigatePath)})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;

						setInProgress(false);
						setFormErrorMessage(errorMessage);
					});
			} else if (job === "login") {
				setInProgress(true);
				signInWithEmailAndPassword(auth, values.email, values.password)
					.then(() => {navigate(afterSubmitNavigatePath)})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;

						setInProgress(false);
						setFormErrorMessage(errorMessage);
					});
			}
		} else {setFormErrorMessage("Password should be at least 6 characters")}
	}

	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setValues({...values, [name]: value});
	}

	return (

		<form onSubmit={handleSubmit} className={`${theme}`}>
            {
                fields.map((field, index) => <FormLabel key={index} labelData={field} value={values ? values[field.name] : ""} onChangeEvent={handleOnChange} />)
            }
			{ inProgress ? <span style={{color: "green"}}>In progress...</span> : <input type="submit" value={btnText} className="submit-btn" /> }
			<span className='error-message' style={{color: "red", display: "block", fontSize: "20px"}}>{ formErrorMessage }</span>
		</form>

	);
}

export default Form;