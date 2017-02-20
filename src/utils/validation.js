export const isEmpty = value => value === undefined || value === null || value === '';
export const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ];

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
}

export function password(len) {
  return value => {
    if (!isEmpty(value) && value.length < len) {
      return `Password should contain ${len} characters`;
    }
  };
}

export function required(value) {
  if (isEmpty(value)) {
    return 'is required';
  }
}

export function requiredField(fieldName) {
  return value => {
    if (isEmpty(value)) {
      return `${fieldName} is required`;
    }
  };
}

export function minLength(min) {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
  };
}

export function maxLength(max) {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
  };
}

export function matchLenght(len, fieldName) {
  return value => {
    if (!isEmpty(value) && value.replace(/\s|\/|\*/g, '').length !== len) {
      return `${fieldName} should contain  ${len} characters`;
    }
  };
}

export function phoneValid(len, fieldName) {
  return value => {
    if (!isEmpty(value) && value.replace(/\-|\s|\/|\*/g, '').length !== len) {
      return `${fieldName} is invalid`;
    }
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
}

export function oneOf(enumeration) {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function cardNumberValidator() {
  return value => {
    switch (true) {
      case /^(?:3[47][0-9]{13})$/.test(value): // American Express
        return false;
      case /^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(value): // Visa 1
        return false;
      case /^5[1-5]\d{14}$/.test(value): // MasterCard
        return false;
      case /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/.test(value): // Discover Card
        return false;
      case /^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(value): // Diners Club Card
        return false;
      case /^35(?:2[89]|[3-8]\d)\d{12}$/.test(value): // JCB Card
        return false;
      case /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/.test(value): // Maestro
        return false;
      default:
        return 'Card number is invalid';
    }
  };
}
