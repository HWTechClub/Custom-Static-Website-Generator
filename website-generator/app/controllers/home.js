const Joi = require('joi');
const csv = require("csvtojson");
const fs = require('fs-extra');
const ejs = require('ejs');


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
    if (templateContent.templates[i].template_name == "Colo_Shop") {

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

  /*fs.createReadStream('./public/Colo_Shop/index.html').pipe(fs.createWriteStream(dir + '/index.html'));
  fs.createReadStream('./public/Colo_Shop/cart.html').pipe(fs.createWriteStream(dir + '/cart.html'));
  fs.createReadStream('./public/Colo_Shop/contact.html').pipe(fs.createWriteStream(dir + '/contact.html'));
 
  copy_folder('./public/Colo_Shop/styles', dir + '/styles');
  copy_folder('./public/Colo_Shop/js', dir + '/js');
  copy_folder('./public/Colo_Shop/plugins', dir + '/plugins');
  copy_folder('./public/Colo_Shop/images', dir + '/images');
 
  ejs2html('./public/Colo_Shop/index.ejs', req.body , dir, "index");
  ejs2html('./public/Colo_Shop/cart.ejs', req.body , dir, "cart");
  ejs2html('./public/Colo_Shop/contact.ejs', req.body , dir, "contact");*/

  const resp = {
    'directory': result
  }

  res.json(resp);
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
