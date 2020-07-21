import React from "react";
import "./SignupValidation.css"

export default function verify(props) {
  var qualifiers = {
    length:false,
    uppercase:false,
    lowercase: false,
    specialCharacter: false,
    number: false
  }

  var specialCharacters = {
    "^":"^", "$":"$", "*":"*", ".":".", "[":"[", "]":"]", "{":"{", "}":"}", "(":"(",")":")", "?":"?", '"':'"', "!":"!", "@":"@", "#":"#", "%":"%", "&":"&", "/":"/", "\\":"\\", ",":",", ">":">", "<":"<", "'":"'", ":":":", ";":";", "|":"|", "_":"_", "~":"~", "`":"`"
  }

  var numbers = {
    1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 0:0
  };

  if (props.password.length >= 8) {
    qualifiers.length = true;
  }

  if (props.password !== props.password.toLowerCase()) {
    qualifiers.uppercase = true;
  }

  if (props.password !== props.password.toUpperCase()) {
    qualifiers.lowercase = true;
  }

  for (var i = 0; i < props.password.length; i++) {
    if (numbers[props.password[i]] !== undefined) {
      qualifiers.number = true;
    }

    if (specialCharacters[props.password[i]] !== undefined) {
      qualifiers.specialCharacter = true;
    }
  }


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
