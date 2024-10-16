function isTheseValidCredentials(passwordName, password) {
    const emptyPattern = /^\s*$/;                  
    const special_Character_Pattern_For_Password_Name = /[!@#$%^&*(),.?":{}|<>]/;
    const maxLengthPattern = /^.{1,15}$/;  

    if (emptyPattern.test(passwordName)) {
        return "Password name cannot be empty.";
    }
    if (special_Character_Pattern_For_Password_Name.test(passwordName)) {
        return "Password name cannot contain special characters.";
    }
    if (!maxLengthPattern.test(passwordName)) {
        return "Password name cannot exceed 15 characters.";
    }

    const minLengthPattern = /^.{7,16}$/; 
    const upperCasePattern = /[A-Z]/;      
    const lowerCasePattern = /[a-z]/;      
    const numberPattern = /\d/;            
    const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/; 

    if (!minLengthPattern.test(password)) {
        return "Password must be between 7 and 16 characters long.";
    }
    if (!upperCasePattern.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!lowerCasePattern.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!numberPattern.test(password)) {
        return "Password must contain at least one number.";
    }
    if (!specialCharacterPattern.test(password)) {
        return "Password must contain at least one special character.";
    }

    return true;
}

module.exports = { isTheseValidCredentials };