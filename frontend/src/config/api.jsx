const BASE_URL = "http://localhost:8080";

const Endpoint = {
  BACKEND:{
    getUrl:`${BASE_URL}`
  },
  LOGIN: {
    getUrl: `${BASE_URL}/api/v1/auth/authenticate`,
    method: "POST",
  },
  REGISTER: {
    getUrl: `${BASE_URL}/api/v1/auth/register`,
    method: "POST",
  },
};

export default Endpoint;
