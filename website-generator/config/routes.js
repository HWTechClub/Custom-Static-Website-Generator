const home = require('../app/controllers/home');

module.exports = function (app){

  app.get('/', home.home);

  //post form
  // generate site
  app.post('/generate',home.convertCsv, home.generate);

  app.post('/generate_with_json_data', home.generate);

  app.get('/template_info',home.template_info);

  app.get('/ipfsdeploy', home.deploy_ipfs);

 }
