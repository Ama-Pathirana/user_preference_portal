const USERS_FILE = "../dummydata/users.json";
function getUsers() {
    console.log("entered get user");
    try {
        const response = fetch(USERS_FILE);
        console.log("response", response);
        if (!response.ok) throw new Error("Failed to fetch users");
        return response.json();
    } catch (error) {
        console.error("Error loading users:", error);
        return [];
    }
}

function checkUserExists(email) {
    const users = getUsers();
    return users.some(user => user.email === email);
}

function addUser(newUser) {
    const users = getUsers();
    console.log("Users before adding:", users);

    const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const formattedUser = {
        id: newUserId,
        fullName: `${newUser.first_name} ${newUser.last_name}`,
        email: newUser.email,
        password: newUser.password,
    };

    sessionStorage.setItem(newUser.email, JSON.stringify(formattedUser));

    console.log("User added to session storage:", formattedUser);
}

function authenticateUser(email, password) {
    const storedUserData = JSON.parse(sessionStorage.getItem("currentLoggedin"));

    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
        return storedUserData;
    } else if (storedUserData && storedUserData.email === email && storedUserData.password !== password) {
        return "invalid_password";
    }

    const users = getUsers();
    const user = users.find(u => u.email === email);
    console.log("user", user);

    if (user) {
        if (user.password === password) {
            sessionStorage.setItem("currentLoggedin", JSON.stringify({ email: user.email, password: user.password }));
            return user;
        } else {
            console.log("Invalid password (JSON data)");
            return "invalid_password";
        }
    }

    return null;
}

function validateUserInput(user) {
    if (!user.first_name || !user.last_name || !user.email || !user.password) {
        throw new Error("All fields are required");
    }

    if (!validateEmail(user.email)) {
        throw new Error("Invalid email address");
    }

    if (user.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function updateUserProfile(user) {
    localStorage.setItem("profile_full_name", user.full_name || "");
    localStorage.setItem("profile_email", user.email || "");
}

function saveUserDetailsToStorage(combinedData) {
    return { success: true, message: "User details saved successfully!" };
}

module.exports = {
    getUsers,
    addUser,
    authenticateUser,
    checkUserExists,
    validateUserInput,
    validateEmail,
    updateUserProfile,
    saveUserDetailsToStorage
};
