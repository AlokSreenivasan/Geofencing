export const validateField = (field: string, value: string, formData: Record<string, string>): string => {
    switch (field) {
        case 'name':
            return value.trim() ? '' : 'Name is required.';

        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address.';

        case 'pincode':
            if (!/^\d{6}$/.test(value)) return '6-digit pincode required.';
            return '';

        case 'password':
            return value.length >= 6 ? '' : 'Minimum 6 characters required.';

        case 'confirmPassword':
            return value === formData.password ? '' : 'Passwords do not match.';

        default:
            return '';
    }
};

export const validateAllFields = (formData: Record<string, string>): Record<string, string> => {
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
        const error = validateField(key, value, formData);
        if (error) errors[key] = error;
    });
    return errors;
};
