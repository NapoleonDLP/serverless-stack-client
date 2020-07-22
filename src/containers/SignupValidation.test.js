import { render } from '@testing-library/react';
import Verify from "./SignupValidation.js";

describe("Signup Validation", () => {

  test("Validation feedback does not render when password is empty", () => {
    let input = Verify({password:""});
    expect(input).toBeNull();
  });

  test("Renders feedback anytime password has length greater than 0", () => {
    let input = render(Verify({password:"12345678"}));
    expect(input.getByTestId('char-length')).toBeVisible();
    expect(input.getByTestId('uppercase')).toBeVisible();
    expect(input.getByTestId('lowercase')).toBeVisible();
    expect(input.getByTestId('numbers')).toBeVisible();
    expect(input.getByTestId('special-characters')).toBeVisible();
  });

  describe("Renders correct font color", () => {
    test("No numbers or special characters", () => {
      let input = render(Verify({password: "HelloMellow"}))
      expect(input.getByTestId('char-length')).toHaveClass('green');
      expect(input.getByTestId('uppercase')).toHaveClass('green');
      expect(input.getByTestId('lowercase')).toHaveClass('green');
      expect(input.getByTestId('numbers')).not.toHaveClass('green');
      expect(input.getByTestId('special-characters')).not.toHaveClass('green');
    });

    test("Improper length & no uppercase", () => {
      let input = render(Verify({password: "hi8$"}))
      expect(input.getByTestId('char-length')).not.toHaveClass('green');
      expect(input.getByTestId('uppercase')).not.toHaveClass('green');
      expect(input.getByTestId('lowercase')).toHaveClass('green');
      expect(input.getByTestId('numbers')).toHaveClass('green');
      expect(input.getByTestId('special-characters')).toHaveClass('green');
    });
  });

});

