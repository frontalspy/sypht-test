const axios = require('axios');
const request = require('request');
const fs = require('fs');
const auth = require('./auth');

async function upload(req, res) {
  const readstream = fs.createReadStream(req.file.path);
  auth.getToken().then(() =>{
    let options = {
      url:'https://api.sypht.com/fileupload',
      formData: {
        fileToUpload:readstream,
        fieldSets: JSON.stringify(['sypht.invoice','sypht.document'])
      },
      headers:{
        'Authorization': 'Bearer ' + global.token,
      },
      json:true
    }
    request.post(options, (error, response, body) => {
      getResults(body.fileId).then((data) => {
        res.status(200).send({data : data.fields});
        res.end();
      }).catch(() => {
        res.status(500).send({msg : "Error contacting Server"});
        res.end();
      })   
    })
  }).catch(() => {
    res.status(500).send({msg : "Error contacting Server"});
    res.end();
  })
}

function getResults(data) {
  return axios.request({
    url:'https://api.sypht.com/result/final/' + data,
    headers:{
      'Authorization': 'Bearer ' + global.token,
    },
    method: 'get'
  }).then((resp) => {
    return resp.data.results;
  });
}

module.exports = {upload};