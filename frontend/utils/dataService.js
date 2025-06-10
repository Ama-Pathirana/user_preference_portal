const USERS_FILE = "/dummydata/users.json";
// const USERS_FILE = "http://127.0.0.1:8000/users/";

//Fetch users from the JSON file
async function getUsers() {
  console.log("entered get user")
  try {
    const response = await fetch(USERS_FILE);
    console.log("response",response)
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error loading users:", error);
    return [];
  }
}

// async function getUsers() {
//   console.log("entered get user");
//   try {
//     const response = await fetch("http://127.0.0.1:8000/api/users/"); // Replace with your actual API endpoint
//     console.log("response", response);
//     if (!response.ok) throw new Error("Failed to fetch users");
//     return await response.json();
//   } catch (error) {
//     console.error("Error loading users:", error);
//     return [];
//   }
// }



// Check if user already exists
async function checkUserExists(email) {
  const users = await getUsers();
  return users.some(user => user.email === email);
}

// async function checkUserExists(email) {
//   try {
//     const response = await fetch('http://127.0.0.1:8000/signup/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: email })
//     });
//     console.log("response",response)
//     // Check if the response is ok (status in the range 200-299)
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     return data.exists; // true or false
//   } catch (error) {
//     console.error('Error checking user existence:', error);
//     return false; // or handle as needed
//   }
// }

function addUser(newUser) {
  const users = getUsers();
  console.log("Users before adding:", users); // Debugging line

  const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

  const formattedUser = {
    id: newUserId,
    fullName: `${newUser.first_name} ${newUser.last_name}`,
    email: newUser.email,
    password: newUser.password,
  };

  // Store the user in sessionStorage with email as the key
  sessionStorage.setItem(newUser.email, JSON.stringify(formattedUser));

  console.log("User added to session storage:", formattedUser);
}


async function authenticateUser(email, password) {

  // Check if the user is already logged in (in sessionStorage)
  const storedUserData = JSON.parse(sessionStorage.getItem("currentLoggedin"));
  //console.log("storedUserEmail",storedUserData.email );
  //console.log("storedUserPassword",storedUserData.password);

  if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
    //console.log("entered storedUserData");
    return storedUserData; // User is authenticated from session storage
  }
  else if (storedUserData && storedUserData.email === email && storedUserData.password !== password) {
    return "invalid_password"; // Password does not match
  }

  // If user is not found in sessionStorage, check the JSON file (fetch from 'dummydata' directory)
  const users = await getUsers(); // Fetch users from JSON file
  const user = users.find(u => u.email === email); // Search for the user
  console.log("user",user)
  if (user) {
    if (user.password === password) {
      // console.log("User found in JSON data");
      sessionStorage.setItem("currentLoggedin", JSON.stringify({ email: user.email, password: user.password })); // Store credentials
      return user; 
    } else {
      console.log("Invalid password (JSON data)");
      return "invalid_password"; 
    }
  }


  return null; 
}


// Validate user input
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

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function updateUserProfile(user) {
  localStorage.setItem("profile_full_name", user.full_name || "");
  localStorage.setItem("profile_email", user.email || "");

}

async function checkUserByEmail(email) {
  try {
    const users = await getUsers();
    // Check if any user matches the given email
    return users.find(user => user.email === email);
  } catch (error) {
    console.error("Error checking user by email:", error);
    return null;
  }
}

async function updateUser(userId, updatedData) {
  try {
    const users = await getUsers();
    const index = users.findIndex(u => u.id === userId);
    
    if (index === -1) throw new Error("User not found");
    
    users[index] = { ...users[index], ...updatedData };
    
    if(sessionStorage.getItem("currentLoggedin")) {
      sessionStorage.setItem("currentLoggedin", JSON.stringify(users[index]));
    }
    
    return users[index];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

async function saveProfileData(userId, profileData) {
  try {
    // Update local storage
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profileData));
    
    // Update server data (mock implementation)
    const users = await getUsers();
    const user = users.find(u => u.id === userId);
    
    if (user) {
      user.profile = profileData;
      // Here you would typically make a PUT request to update the server data
    }
    
    return profileData;
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
}

// Fetch user details by email
async function fetchUserDetailsByEmail(email) {
  try {
    // Fetch user details from getUsers() first
    const users = await getUsers();
    const user = users.find((user) => user.email === email);

    // If user is found in getUsers(), return the details
    if (user) {
      return {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        gender: user.gender,
        marital_status: user.marital_status,
        date_of_birth: user.dob,
        occupation: user.occupation,
      };
    }

    // If no user found from getUsers(), check sessionStorage
    const storedData = sessionStorage.getItem("currentLoggedin");

    // If data is found in sessionStorage, return it
    if (storedData) {
      return {
        email: JSON.parse(storedData).email,
        password: JSON.parse(storedData).password,
      };
    }

    // If no user found in both sources, return null
    return null;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
}


// Populate user form fields
async function populateUserFormFields() {
  const storedData = sessionStorage.getItem("currentLoggedin");
  const userEmail = storedData ? JSON.parse(storedData).email : null;
  console.log("User email:", userEmail);

  if (!userEmail) {
    console.log("No logged-in user found");
    return;
  }

  try {
    const userData = await fetchUserDetailsByEmail(userEmail);

    if (userData) {
      if ($$("profileSection")) {
        $$("profileSection").setValues({
          full_name: userData.fullName || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      }
      
      if ($$("personalSection")) {
        $$("personalSection").setValues({
          address: userData.address || "",
          date_of_birth: userData.date_of_birth || "",
          gender: mapGender(userData.gender),
        marital_status: mapMaritalStatus(userData.marital_status),
          occupation: userData.occupation

        });
      }
      
      console.log("User form fields populated successfully");
    } else {
      console.log("Failed to load user details");
    }
  } catch (error) {
    console.log("Error populating form fields:", error);
  }
}
function mapGender(gender) {
  const genderMap = {
      "Male": "male",
      "Female": "female",
      "Other": "other"
  };
  return genderMap[gender] || ""; 
}

function mapMaritalStatus(status) {
  const statusMap = {
      "Single": "single",
      "Married": "married",
      "Divorced": "divorced",
      "Widowed": "widowed",
      "Other": "other"
  };
  return statusMap[status] || ""; 
}

function saveUserDetailsToStorage(combinedData) {
  return { success: true, message: "User details saved successfully!" };
}


export { getUsers, addUser, authenticateUser, checkUserExists, validateUserInput, validateEmail, updateUserProfile, checkUserByEmail, updateUser, saveProfileData,fetchUserDetailsByEmail, populateUserFormFields, saveUserDetailsToStorage };


