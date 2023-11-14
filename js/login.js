//Chaeck if allredy logged in and display logout button
const checkStatus = () => {
  if(token) display.innerHTML = `<br><h4>logged in as ${current_user()}</h4><br><button id="logoutbutton" onclick="logout()" class="btn btn-primary mb-3">Log Out</button>`
}

//Login - get token from server
const login = async () => {
  loginbutton.innerHTML = displaySpiner()
  const username = uName.value.trim();
  const password = pass.value.trim();

  if (!username || !password) {
    showErrorNotification("Please enter both a username and a password.");
    loginbutton.innerHTML = 'Login'
    return;//exit function if input fields are empty
  }

  const loginData = {
    username: username,
    password: password,
  };

  res = await axios.post(MY_SERVER+"/login/", loginData)//send username & pass to server
    .then((res) => {
      const temp_token = res.data.access;
      sessionStorage.setItem('token', temp_token);//save access token to sessionstorage
      token = temp_token
      loginbutton.innerHTML = 'Login'
      displayLoginLink()
      changePageSuccess('index.html',`You are logged in now ${current_user()}`)
    })
    .catch((error) => {
      loginbutton.innerHTML = 'Login'
      console.log(error);
      showErrorNotification("Username or password isn't correct");//tostify if server dosn't recognize user
    });
};


//Register - create new user
const register = async () => {
  registerbutton.innerHTML = displaySpiner()
  const username = uName.value.trim();
  const password = pass.value.trim();
  const email = mail.value.trim()||null

  if (!username || !password) {
    showErrorNotification("Please enter both a username and a password.");
    registerbutton.innerHTML = 'Sign Up'
    return;//exit function if input fields are empty
  }

  const registerData = {
    "username": username,
    "password": password,
    "email":email
  };

  try {
    await axios.post(MY_SERVER+"/register", registerData);//send username & pass to server
    registerbutton.innerHTML = 'Sign Up'
    showSuccessNotification("User created successfully");
  } catch (error) {
    if (error.response && error.response.status === 500) {
      showErrorNotification("Username is already in use. Please choose another.");//tostify user when server dosn't accept the username
      registerbutton.innerHTML = 'Sign Up'
    } else {
      console.error("Registration failed:", error);
      registerbutton.innerHTML = 'Sign Up'
    }
  }
};

const logout = async () => {
  logoutbutton.innerHTML = displaySpiner()
  try {
    await axios.get(MY_SERVER + "/logout/");
    changePageSuccess('login.html', `You've been logged out`);
    logoutbutton.innerHTML = 'Logout'
    sessionStorage.removeItem('token'); // Clear the token from session storage
  } catch (error) {
    console.error("Logout failed:", error);
    showErrorNotification("Logout failed. Please try again.");
  }
}
