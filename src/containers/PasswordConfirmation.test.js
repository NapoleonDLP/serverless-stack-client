import PasswordConfirmation from "./PasswordConfirmation.js";
import { render } from "@testing-library/react"

describe("Password confirmation feedback", () => {

  test("Does not give feedback when confirm length is 0", () => {
    let input = PasswordConfirmation({password:"test",  confirmPassword:""});
    expect(input).toBeNull();
  });

  test("Gives feedback when password and confirm password do not match. Confirm password must not be empty", () => {
    let input = render(PasswordConfirmation({password:"test", confirmPassword:"1"}));

    expect(input.getByTestId("password-confirmation")).toHaveClass("red");
  });

  test("Does not give feedback when confirm password is matching but not complete", () => {
    let input = PasswordConfirmation({password:"Animal", confirmPassword:"Anim"});
    expect(input).toBeNull();
  });

});