const curl = require("curl")

var fetch = require('node-fetch');

fetch('https://api.fullcontact.com/v3/company.search',{
  method: 'POST',
  headers: {
    "Authorization": "Bearer AIIVtsVTUY4BbYgV6tyMOSMglmjlEbr5"
  },
  body: JSON.stringify({
    "companyName": "fullcontact"
    })
}).then(function(res) {
  return res.json();
}).then(function(json){
  console.log(json);
});

//  fetch('https://kgsearch.googleapis.com/v1/entities:search?query=salesforce&key=AIzaSyD1jqXFp1x1N3Skgh8hQrwG-TTMvjt7Ewo&limit=1&indent=True',{
//   method: 'GET'
// }).then(function(res) {
//   return res.json();
// }).then(function(json){
//   console.log(json["itemListElement"][0]["result"]["detailedDescription"]);
// });

// fetch('https://api.linkedin.com/v2/organizations?q=vanityName&vanityName=Linkedin',{
//   method: 'GET'
// }).then(function(res) {
//   return res.json();
// }).then(function(json){
//   console.log(json);
// });

fetch('https://financialmodelingprep.com/api/v3/company/profile/AAPL',{
  method: 'GET'
}).then(function(res) {
  return res.json();
}).then(function(json){
  console.log(json);
});

// curl.header("Authorization: Bearer {Your API Key}")
// get("https://api.fullcontact.com/v3/company.search?")
// curl -H"X-FullContact-APIKey:$your_key" 'https://api.fullcontact.com/v2/company/search.json?companyName=fullcontact'

