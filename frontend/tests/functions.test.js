const {
    getUsers,
    addUser,
    authenticateUser,
    checkUserExists,
    validateUserInput,
    validateEmail,
    updateUserProfile,
    saveUserDetailsToStorage
} = require('./functions'); 

// Mock sessionStorage and localStorage
beforeEach(() => {
    global.sessionStorage = {
        store: {},
        getItem: function (key) {
            return this.store[key] || null;
        },
        setItem: function (key, value) {
            this.store[key] = value;
        },
        removeItem: function (key) {
            delete this.store[key];
        },
        clear: function () {
            this.store = {};
        }
    };

    global.localStorage = {
        store: {},
        getItem: function (key) {
            return this.store[key] || null;
        },
        setItem: function (key, value) {
            this.store[key] = value;
        },
        removeItem: function (key) {
            delete this.store[key];
        },
        clear: function () {
            this.store = {};
        }
    };
});

// Mock getUsers function
jest.mock('./functions', () => {
    const originalModule = jest.requireActual('./functions');
    return {
        ...originalModule,
        getUsers: jest.fn(() => [
            { id: 1, email: 'test@example.com', password: 'password123' }
        ])
    };
});

test('validateEmail should return true for valid emails', () => {
    expect(validateEmail('user@example.com')).toBe(true);
});

test('validateEmail should return false for invalid emails', () => {
    expect(validateEmail('invalid-email')).toBe(false);
});

test('checkUserExists should return true if user exists', () => {
    expect(checkUserExists('test@example.com')).toBe(true);
});

test('checkUserExists should return false if user does not exist', () => {
    expect(checkUserExists('notfound@example.com')).toBe(false);
});

test('addUser should add a new user to sessionStorage', () => {
    const newUser = { first_name: 'John', last_name: 'Doe', email: 'john@example.com', password: 'secure123' };
    addUser(newUser);
    const storedUser = JSON.parse(sessionStorage.getItem('john@example.com'));
    expect(storedUser).toBeDefined();
    expect(storedUser.fullName).toBe('John Doe');
    expect(storedUser.email).toBe('john@example.com');
});

test('authenticateUser should return user if email and password match', () => {
    sessionStorage.setItem('currentLoggedin', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    expect(authenticateUser('test@example.com', 'password123')).toEqual({ email: 'test@example.com', password: 'password123' });
});

test('authenticateUser should return "invalid_password" if password is incorrect', () => {
    sessionStorage.setItem('currentLoggedin', JSON.stringify({ email: 'test@example.com', password: 'password123' }));
    expect(authenticateUser('test@example.com', 'wrongpassword')).toBe('invalid_password');
});

test('authenticateUser should return null if user does not exist', () => {
    expect(authenticateUser('notfound@example.com', 'password123')).toBeNull();
});

test('validateUserInput should throw an error for missing fields', () => {
    expect(() => validateUserInput({ first_name: 'John', last_name: '', email: 'john@example.com', password: '123456' }))
        .toThrow('All fields are required');
});

test('validateUserInput should throw an error for invalid email', () => {
    expect(() => validateUserInput({ first_name: 'John', last_name: 'Doe', email: 'invalid-email', password: '123456' }))
        .toThrow('Invalid email address');
});

test('validateUserInput should throw an error for short passwords', () => {
    expect(() => validateUserInput({ first_name: 'John', last_name: 'Doe', email: 'john@example.com', password: '123' }))
        .toThrow('Password must be at least 6 characters long');
});

test('updateUserProfile should update localStorage values', () => {
    updateUserProfile({ full_name: 'Jane Doe', email: 'jane@example.com' });
    expect(localStorage.getItem('profile_full_name')).toBe('Jane Doe');
    expect(localStorage.getItem('profile_email')).toBe('jane@example.com');
});

test('saveUserDetailsToStorage should return success message', () => {
    expect(saveUserDetailsToStorage({})).toEqual({ success: true, message: 'User details saved successfully!' });
});
