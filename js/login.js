//Login - get token from server
const login = async () => {
  const username = uName.value.trim();
  const password = pass.value.trim();

  if (!username || !password) {
    showErrorNotification("Please enter both a username and a password.");
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
      changePageSuccess('index.html',`You are logged in now ${current_user()}`)
    })
    .catch((error) => {
      console.log(error);
      showErrorNotification("Username or password isn't correct");//tostify if server dosn't recognize user
    });
};


//Register - create new user
const register = async () => {
  const username = uName.value.trim();
  const password = pass.value.trim();
  const email = mail.value.trim()||null

  if (!username || !password) {
    showErrorNotification("Please enter both a username and a password.");
    return;//exit function if input fields are empty
  }

  const registerData = {
    "username": username,
    "password": password,
    "email":email
  };

  try {
    await axios.post(MY_SERVER+"/register", registerData);//send username & pass to server
    showSuccessNotification("User created successfully");
  } catch (error) {
    if (error.response && error.response.status === 500) {
      showErrorNotification("Username is already in use. Please choose another.");//tostify user when server dosn't accept the username
    } else {
      console.error("Registration failed:", error);
    }
  }
};