module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword,
) => {
    const errors = {}

    if(username.trim() === '') {
        errors.username = 'Username cannot be blank';
    }
    if(email.trim() === '') {
        errors.email = 'Email cannot be blank';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
        if(!email.match(regEx)) {
            errors.email = 'Email not a valid email address';
        }
    }
    if(password === '') {
        errors.password = 'Password cannot be blank';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}

    if(username.trim() === '') {
        errors.username = 'Username cannot be blank';
    }
    if(password.trim() === '') {
        errors.password = 'Password cannot be blank';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
