import axios from "axios"
axios.get('http://httpbin.org/#/HTTP_Methods/get_get').then(res => {
  console.log(res);

})
