export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const validateInputs = (email: string, password: string, name: string, phone: string, address: string): ValidationResult => {
    const errors: Record<string, string> = {};
    let isValid = true;

    if (!email) {
        errors.email = 'Email is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Invalid email format';
        isValid = false;
    }

    if (!password) {
        errors.password = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (!name) {
        errors.name = 'Name is required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        errors.name = 'Name must only contain letters';
        isValid = false;
    }

    if (!phone) {
        errors.phone = 'Phone number is required';
        isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
        errors.phone = 'Phone number must be exactly 10 digits';
        isValid = false;
    }

    if (!address) {
        errors.address = 'Address is required';
        isValid = false;
    }

    return { isValid, errors };
};
