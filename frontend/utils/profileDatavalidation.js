// utils/dataValidation.js

/**
 * Custom error class for validation errors
 */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Validation utility functions
 */
const DataValidation = {
    /**
     * Validate full name
     * @param {string} name - Full name to validate
     * @returns {string} Trimmed and validated name
     * @throws {ValidationError} If name is invalid
     */
    validateFullName: (name) => {
        if (!name || name.trim().length < 2) {
            throw new ValidationError('Full name must be at least 2 characters long');
        }
        return name.trim();
    },

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {string} Trimmed and validated email
     * @throws {ValidationError} If email is invalid
     */
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new ValidationError('Invalid email format');
        }
        return email.trim();
    },

    /**
     * Validate phone number
     * @param {string} phone - Phone number to validate
     * @returns {string} Validated phone number
     * @throws {ValidationError} If phone number is invalid
     */
    validatePhone: (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phone || !phoneRegex.test(phone)) {
            throw new ValidationError('Phone number must be 10 digits');
        }
        return phone;
    },

    /**
     * Validate password
     * @param {string} password - Password to validate
     * @returns {string} Validated password
     * @throws {ValidationError} If password is invalid
     */
    validatePassword: (password) => {
        if (!password) {
            throw new ValidationError('Password cannot be empty');
        }
        
        if (password.length < 8) {
            throw new ValidationError('Password must be at least 8 characters long');
        }
        
        if (!/[A-Z]/.test(password)) {
            throw new ValidationError('Password must contain at least one uppercase letter');
        }
        
        if (!/[0-9]/.test(password)) {
            throw new ValidationError('Password must contain at least one number');
        }
        
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            throw new ValidationError('Password must contain at least one special character');
        }
        
        return password;
    },

    /**
     * Validate address
     * @param {string} address - Address to validate
     * @returns {string} Trimmed and validated address
     */
    validateAddress: (address) => {
        return address ? address.trim() : '';
    },

    /**
     * Validate personal details
     * @param {Object} personalData - Personal details to validate
     * @returns {Object} Validated personal details
     */
    validatePersonalDetails: (personalData) => {
        return {
            address: DataValidation.validateAddress(personalData.address),
            marital_status: personalData.marital_status || '',
            gender: personalData.gender || '',
            date_of_birth: personalData.date_of_birth || '',
            occupation: personalData.occupation || ''
        };
    },

    /**
     * Validate entire profile
     * @param {Object} profileData - Complete profile data
     * @returns {Object} Validated profile data
     */
    validateFullProfile: (profileData) => {
        try {
            // Validate profile section
            const validatedProfile = {
                full_name: DataValidation.validateFullName(profileData.full_name),
                email: DataValidation.validateEmail(profileData.email),
                phone: DataValidation.validatePhone(profileData.phone)
            };

            // Validate personal details if present
            const validatedPersonal = profileData.personal 
                ? DataValidation.validatePersonalDetails(profileData.personal) 
                : {};

            // Validate password if changing
            let passwordValidation = {};
            if (profileData.new_password) {
                passwordValidation.new_password = DataValidation.validatePassword(profileData.new_password);
            }

            return {
                profile: validatedProfile,
                personal: validatedPersonal,
                ...passwordValidation
            };
        } catch (error) {
            throw new ValidationError(`Profile validation failed: ${error.message}`);
        }
    }
};

export default DataValidation;
export { ValidationError };