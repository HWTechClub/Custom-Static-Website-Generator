const Joi = require('joi');
const csv = require("csvtojson");
const fs = require('fs-extra');
const ejs = require('ejs');
const shell = require('shelljs');
const Regex = require("regex");

exports.home = function (req, res) {

  res.render('index.ejs');

}

exports.template_info = function (req, res) {
  //displays template information
  let template = fs.readFileSync("./public/template_details.json");
  let templateContent = JSON.parse(template);

  res.json(templateContent);
}

exports.generate = function (req, res) {

  //we can now manipulate the data
  let result = req.body.companyName;

  //console.log(req.body);

  let dir = './public/pages/' + req.body.companyName;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  else {
    let i = 0;
    while (fs.existsSync(dir)) {
      i++;
      dir = './public/pages/' + req.body.companyName + '_' + i;
    }

    fs.mkdirSync(dir);
    result = req.body.companyName + '_' + i;
  }

  req.body.id = result;
  console.log('great, here is the request body ->', req.body);

  //data.push(result);

  let template = fs.readFileSync("./public/template_details.json");
  let templateContent = JSON.parse(template);

  for (var i = 0; i < templateContent.templates.length; i++) {
    if (templateContent.templates[i].template_name == req.body.template) {

      for (var j = 0; j < templateContent.templates[i].pages.length; j++) {
        //Copying html files can be removed in the future stages
        fs.createReadStream('./public/templates/' + req.body.template + '/' + templateContent.templates[i].pages[j] + '.html').pipe(fs.createWriteStream(dir + '/' + templateContent.templates[i].pages[j] + '.html'));
        ejs2html('./public/templates/' + req.body.template + '/' + templateContent.templates[i].pages[j] + '.ejs', req.body, dir, templateContent.templates[i].pages[j]);
      }

      for (var j = 0; j < templateContent.templates[i].folder.length; j++) {
        copy_folder('./public/templates/' + req.body.template + '/' + templateContent.templates[i].folder[j], dir + '/' + templateContent.templates[i].folder[j]);
      }

    }
  }


  const resp = {
    'directory': result
  }

  res.json(resp);
}

//Function to deploy website to IPFS

exports.deploy_ipfs = function (req, res) {

  var id = req.query.id;

  shell.config.verbose = true; // or set('-v');

  shell.cd('public/pages');

  shell.exec('ipfs add -r ' + '"' + id + '"' + '/', function(code, stdout, stderr) {
        let regex = /((.*?)\n)*/g;
        let match = regex.exec(stdout);
        var index = match.length - 1;

        match = match[index].replace('added ','');
        res.json({"data":match});

});



}

exports.convertCsv = function (req, res, next) {
  console.log(req.body);
  const csvStr = req.body.csv;
  csv()
    .fromString(csvStr)
    .then((jsonObj) => {
      console.log(jsonObj)
      req.body.csv = jsonObj;
      //delete file at path
      next()
    })
    .catch(err => {
      console.log(err)

      res.json({ "message": "Something went wrong, please try again." })
    })
}



exports.validateData = function (req, res) {
  //fix schema
  const schema = Joi.object().keys({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    companyName: Joi.string().required(),
    logoUrl: Joi.string().uri().required(),
    bannerUrl: Joi.string().uri().required(),
    email: Joi.string().email().required(),
    template: Joi.string().required(),
    description: Joi.string().required(),
    csv: Joi.string().required(),
  })
  console.log('REQUEST BODY', req.body);

  schema.validate(req.body, { abortEarly: false })
    .then(validated => {
      next()
    })
    .catch(err => console.log(err))

}


//local function's

//Void function to copy folder
function copy_folder(old_path, new_path) {

  fs.copy(old_path, new_path, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("success!");
    }
  });


}

//Boolean function that converts a ejs file to a static HTML file
function ejs2html(path, information, dir, name) {
  fs.readFile(path, 'utf8', function (err, data) {
    if (err) { console.log(err); return false; }
    var ejs_string = data,
      template = ejs.compile(ejs_string),
      html = template(information);
    fs.writeFile(path + '.html', html, function (err) {
      if (err) { console.log(err); return false }
      fs.createReadStream('./public/templates/' + information.template + '/' + name + '.ejs.html').pipe(fs.createWriteStream(dir + '/' + name + '.html'));
      return true;
    });
  });
}
