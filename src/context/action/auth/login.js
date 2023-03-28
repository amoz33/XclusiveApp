import { LOGIN_USER } from "../../../constants/actionTypes";


const login = (userEmail, userPassword) => (dispatch) => (onSuccess) => {


  let userData = [], userToken = null, userId = '', keyId = '';

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (userEmail == "") {
    alert("Please enter Email address");
  } else if (reg.test(userEmail) === false) {
    alert("Email is Not Correct");
    return false;
  } else if (userPassword == "") {
    alert("Please enter password");
  } else {

    fetch('https://app.xclusiveafrikstyles.com/Auth/login_appUsers', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        // we will pass our input data to server
        email: userEmail,
        password: userPassword
      })

    })
      .then((response) => response.json())
      .then((responseJson) => {

        userData = responseJson;
        //console.log(`foo = `, userData)
        if (responseJson == "Wrong Login Details, Please Try Again") {

          alert("Wrong Login Details, Please Try Again");

        } else {
          //console.log('User Data after login', userData);
          //redirect to profile page
          userToken = 'abcd';
          userId = userData.id;
          keyId = userData.keyId

          //saveAsyncData(userToken, userId, keyId)
          //console.log(userData);
          dispatch({ type: LOGIN_USER, data: userData, token: userToken });
          onSuccess(userToken, userId, keyId)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Keyboard.dismiss();
}

export default login