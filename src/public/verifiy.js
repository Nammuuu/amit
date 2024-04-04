document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('token');

  document.getElementById('redirectButton').addEventListener('click', function () {
    const enteredPassword = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!isValidPassword(enteredPassword)) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    if (enteredPassword !== confirmPassword) {
      alert('Passwords do not match. Please enter matching passwords.');
      return;
    }
    myFunction(enteredPassword);
  });

  function isValidPassword(password) {
    return password.length >= 8;
  }
  // document.getElementById('redirectButton').addEventListener('click', function () {
  //   window.location.href = 'https://www.korakagaj.com';
  // });

  //   if (enteredPassword !== confirmPassword) {
  //     alert('Passwords do not match. Please enter matching passwords.');
  //     return;
  //   }
  //   console.log(enteredPassword);
  //   myFunction(enteredPassword);
  // });

  function showLoader() {
    document.getElementById('loader').style.display = 'block';
  }

  function hideLoader() {
    document.getElementById('loader').style.display = 'none';
  }

  function myFunction(enteredPassword) {
    showLoader();
    // const apiUrl = `http://localhost:5000/v1/auth/verify-email?token=${idParam}`;
    const apiUrl = `https://api.korakagaj.com/v1/auth/reset-password?token=${idParam}`;
    const requestBody = {
      password: enteredPassword
    };
    const other_params = {
      headers: { 'content-type': 'application/json; charset=UTF-8' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(requestBody)
    };

    fetch(apiUrl, other_params)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Could not reach the API: ' + response.statusText);
        }
      })
      .then(function (data) {
        hideLoader();
        document.getElementById('result').innerHTML = `<p>password Reset Successfully</p>`;
        showLoader();
        setTimeout(function () {
          window.location.href = 'https://www.korakagaj.com';
        }, 2000);
      })
      .catch(function (error) {
        hideLoader();
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }
  // myFunction();
});
