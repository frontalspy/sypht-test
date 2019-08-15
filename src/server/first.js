const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Please enter Client ID: ', (clientID) => {
      if(clientID !== '' && typeof clientID !== "undefined") {
        fs.writeFileSync('.env', 'SYPHT_CLIENT_ID=' + clientID, (error) =>{
          if(error) {
            console.log(error);
            reject();
          }
        });
      }
      resolve();
    })
  });
}

const question2 = () => {
  return new Promise((resolve, reject) => {
    rl.question('Please enter Client Secret: ', (clientSecret) => {
      if(clientSecret !== '' && typeof clientSecret !== "undefined") {
        fs.appendFile('.env', '\nSYPHT_CLIENT_SECRET=' + clientSecret, (error) =>{
          if(error) {
            console.log(error);
            reject();
          }
        });
      }
      resolve();
    })
  })
}

const main = async () => {
  await question1()
  await question2()
  rl.close()
}

main()