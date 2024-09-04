import axios from "axios";

const getErrorMessage = (code) => {
  if (code == "ERR_BAD_REQUEST") return "Compilation Error ! Please check code"
  else if (code == "ERR_INTERNET_DISCONNECTED" || code == "ERR_NETWORK") return "Check your internet connection !"
  else return "Run Time Error !"
}



const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/2e979232-92fd-4012-97cf-3e9177257d10',
  params: {
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'apikey',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
try {
  const response = await axios.request(options);
  console.log(response.data);
  if (response && response?.data && response.data.token) {
    const options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/' + response.data.token,
      params: {
        base64_encoded: 'false',
        fields: '*'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        // 'Content-Type':'application/json'

      }
    };
    const myInterval = setInterval(async () => {
      try {
        const response2 = await axios.request(options);
        console.log(response2.data);
        console.log(response2.data.status.description);
        if (response2.data.status.description === "Accepted") {
          setOutput(response2.data.stdout)
          clearInterval(myInterval);
          return response2?.data?.stdout
        }

      } catch (error) {
        clearInterval(myInterval);
        console.log("Custom Error inside ", error.message);
        setOutput(getErrorMessage(error.code));
        // console.log(error);
        return error.message;
      }
    }, 2000);
  }

  return "Success";
} catch (error) {
  setOutput(getErrorMessage(error.code));
  console.log("Custom Error at", error);
  return "Error";
}
};




export { createSubmission };
