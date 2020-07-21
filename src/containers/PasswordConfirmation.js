import React from "react";
import "./PasswordConfirmation.css"

export default function PasswordConfirmation(props) {
  if (props.confirmPassword !== props.password.substring(0, props.confirmPassword.length) && props.confirmPassword.length > 0) {
    return <small className="red">Passwords do not match.</small>
  } else {
    return <div></div>
  }
}
