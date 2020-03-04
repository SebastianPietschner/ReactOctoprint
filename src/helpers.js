export function axconf () {
    if (localStorage.getItem('authenabled')) {
      return ({
        baseURL: localStorage.getItem('address') + ":" + localStorage.getItem('port'),
        headers: {
          "X-Api-Key": localStorage.getItem('api_key'),
          "Access-Control-Allow-Origin" : '*'
        },
        auth: {
          username: localStorage.getItem("id"),
          password: localStorage.getItem("password")
        },
        withCredentials: true
        // rejectUnauthorized: false
      });
    } else {
      return ({
        baseURL: localStorage.getItem('address') + ":" + localStorage.getItem('port'),
        headers: {
          "X-Api-Key": localStorage.getItem('api_key'),
          "Access-Control-Allow-Origin" : '*'
        }
      });
    }
  };
  