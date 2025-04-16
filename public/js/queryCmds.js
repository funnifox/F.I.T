//=================================================================================================
// FETCH METHOD
// This function uses the fetch API to make a request to the server.
//=================================================================================================
function fetchMethod(url, callback, method, data, token) {
  if (token !== null){
    let token = " [token present]"
    console.log("fetchMethod: ", url, method, data, token);
  }else{
    console.log("fetchMethod: ", url, method, data, token);
  }
  
  const headers = {};

  if (data) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }
  let options = {
    method: method.toUpperCase(),
    headers: headers
  };
  if (method.toUpperCase() !== "GET" && data !== null) {
    options.body = JSON.stringify(data);
  }

  
  fetch(url, options)
  .then((response) => {
    switch (response.status) {
      case 204:
        callback(response.status, {});
        return;
      default:
        response.json()
        .then((responseData) => {
            callback(response.status, responseData);
        })
        .catch(() => {
            callback(response.status);
        });
    }
  })
  .catch((error) => {
      console.error(`Error from ${method} ${url}:`, error);
  });
}
