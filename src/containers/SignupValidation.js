import React from "react";
import "./SignupValidation.css"

export default function verify(props) {
  console.log("Password:",props.password)
  var qualifiers = {
    length:false,
    uppercase:false,
    lowercase: false,
    specialCharacter: false,
    number: false
  }


  if (props.password.length >= 8) {
    qualifiers.length = true;
  }

  if (props.password !== props.password.toLowerCase()) {
    qualifiers.uppercase = true;
  }

  if (props.password !== props.password.toUpperCase()) {
    qualifiers.lowercase = true;
  }

  //TODO: Check to see if password contains number and special char

  if (props.password.length > 0) {
    return (
      <div>
        <div >
          <small className={qualifiers.length ? "green" : null}> At least 8 characters long.</small>
        </div>
        <div>
          <small className={qualifiers.uppercase ? "green" : null}>Contain uppercase letters.</small>
        </div>
        <div>
          <small className={qualifiers.lowercase ? "green" : null}>Contain lowercase letters.</small>
        </div>
        <div>
          <small className={qualifiers.number ? "green" : null}>Contain numbers.</small>
        </div>
        <div>
          <small className={qualifiers.specialCharacter ? "green" : null}>Contain special characters.</small>
        </div>
      </div>
    )
  } else {
    return <div></div>
  }
}
