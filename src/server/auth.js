const axios = require('axios');

function auth(req, resp) {
  const request = req.body.request;
  try{
    getToken().then(() => {
      resp.status(200).send({msg : 'Authenticated'})
    }).catch((e) => {
      resp.status(500).send({msg : 'Error contacting Sypht Server'})
    });
  } catch(e) {
    console.log(e);
    resp.status(401).send({msg: "Invalid Authorisation"});
    resp.end();
  }
}

function getToken() {
  return axios.request({
    url :'https://login.sypht.com/oauth/token',
    method: 'post',
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      client_id : process.env.SYPHT_CLIENT_ID,
      client_secret: process.env.SYPHT_CLIENT_SECRET,
      audience: "https://api.sypht.com",
      grant_type: "client_credentials"
    }
  }).then((resp) => {global.token = resp.data.access_token;})
  .catch((error) => {
    console.log(error);
    resp.status(401).send({msg: "Invalid Authorisation"});
    resp.end();
  });
}

module.exports = {auth, getToken};