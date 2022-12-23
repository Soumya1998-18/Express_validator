import { check, ValidationChain } from "express-validator";

export default class Validation {
  private emailValidation(): ValidationChain {
    return check("email").isEmail().withMessage("Invalid Email Id");
  }

  private passwordValidation = (): ValidationChain => {
    return check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 char long");
  };

  private fullNameValidation(): ValidationChain {
    return check("fullName")
      .custom((value) => {
        if (typeof value === "string") {
          let _fullName = <string>value;
          if (_fullName.length <= 4) {
            return false;
          }
        }
        return true;
      })
      .withMessage("must be at least 5 char long");
  }

  public Validate(): ValidationChain[] {
    let validationChainArray: Array<ValidationChain> = new Array();
    validationChainArray.push(
      this.emailValidation(),
      this.passwordValidation(),
      this.fullNameValidation()
    );

    return validationChainArray;
  }
}
