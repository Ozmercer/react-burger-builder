export const updateObject = (oldObject, properites) => {
    return {
        ...oldObject,
        ...properites,
    }
}

export const checkValidity = (value, rules) => {
    const errors = {};
    if (rules.required && value.trim() === '') {
        errors.required = 'This field is required'
    }

    if (rules.minLength && value.length < rules.minLength) {
        errors.minLength = `Field must be at least ${rules.minLength} chars`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
        errors.maxLength = `Field must be shorter than ${rules.maxLength} chars`
    }

    // eslint-disable-next-line
    if (rules.isEmail && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        errors.isEmail = 'Please make sure you add a valid email address'
    }

    return errors;
}