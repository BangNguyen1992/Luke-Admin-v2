

var AUTH0_CLIENT_ID = '{CLIENT_ID}';
var AUTH0_DOMAIN = '{DOMAIN}';

fetch("http://www.balticapp.fi/lukeA/authzero")
  .then((data) => data.json())
  .then(res => {
    AUTH0_CLIENT_ID = res.AUTH0_CLIENT_ID;
    AUTH0_DOMAIN = res.AUTH0_DOMAIN
  })