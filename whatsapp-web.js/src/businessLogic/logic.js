const { Website } = require("../models/website");
const { data } = require("../models/data");

module.exports.onWG = () => {
    console.log('hello world');
}

module.exports.onCreate = (id, companyName) => {

    //get the user 
    let user = data.getUser(id);
    if(user == undefined)
    {
        data.addUser(id);
        user = data.getUser(id);
    }

    //add the website with the company name
    user.addWebsite(new Website(companyName));
}



module.exports.help = () =>
{
    let help_signal = [
        `Here are the following commands that can help you create your website`,
        `if you want to create a website use *wg create <company name>* and write the name of your company`,
        `if you already have a website us *wg website <company name>* to get access to the website`,
        `when creating your website you will be asked to give details of your company. To add these details you will have to write *wg website <firstName>* *wg website <lastName>* etc`,
        `If you want to check all the products that have already been created for your websit type *wg product all*`,
        `If you want to create a new product type *wg product new*`,
        `If you want to select a particular product for manipulating its data, give your product id as such: *wg product <id>`,
        `To get all information of the product you selected, type *wg product info*`,
        `To change the product name, type *wg product name <product-name>*`,
        `To change the product cost, type *wg product cost <product-cost>* `,
        `To change the product description, type *wg product desc <product-desc>*`,
        `To change the image of the product, type *wg product image <product-image>*`,
        `When you are done making your website and want to see it ,type *wg website finished*`,
        `If you want to delete a product, type *wg delete product<id>* where id is the product id`,
        `If you want to delete your whole website, type *wg delete website <company name>`,
        `That is all! Hope you make a great website~`
    ];

    return help_signal;
}


module.exports.comp = (input) =>
{
    let create_company = [
        `welcome to building your own website!`,
        `We would like you add the following details:`,
        `wg website firstname *<First_Name>*`, 
        `wg website lastname *<Last_Name>*`,
        `wg website companyname *<Company_name>*`, 
        `wg website logo *<Logo_URL>*`,
        `wg website banner *<Banner_URL>*`, 
        `wg website description *<Description>*`, 
        `wg website email *<Email>*`,
        `For adding information use *wg website <firstname>*`,
       
    ];
    Website.companyName = input;
    if(Website.companyName == null)
    {
        create_company = [`you have not input your company name. Please try again.`];
    }
   return create_company;

}


module.exports.fn = (fdata) =>
{
    


    let info = [`your first name is:` + fdata
                ];
                


                if(Website.companyName == null)
                {
                    info = [`you have not input your company name. Please try again.`]
                }
                else
                {
                    Website.firstname = fdata;
                    console.log('this is data ' +Website.firstname);

                }

    return info;
}


module.exports.ln = (ldata) =>
{
    

    let info = 
    [`your last name is: ` + ldata
    ];

                if(Website.companyName == null)
                {
                   info = [`company name has not been used`];
                }
                else if(Website.firstname == null)
                {
                    info = [`you have not insert first name.`];
                }
                else
                {
                    Website.lastname = ldata;
                    console.log('lname added');
                }
                
    return info;
}

module.exports.cn = (cdata) =>
{
    

    let info = [`your company name is: ` + cdata
                ];
                
         if(Website.firstname == null)
         {
            info = [`you have not insert first name.`];
         }
         else if(Website.lastname == null)
         {
            info = [`you have not insert last name.`];
         }
         else(Website.companyName != cdata)
         {
             Website.companyName = cdata;
             info = [`your company name has been changed to` +cdata];
             console.log('this is data ' +Website.companyName);
         }

    return info;
}

module.exports.logourl = (ldata) =>
{    

    let info = [`the data that you added are as follow:`,
                    `company Name: ` + ldata
                ];
                if(Website.companyName == null)
                {
                    info = [`you have not input your company name. Please try again.`]
                }
                else if(Website.firstname == null)
                {
                   info = [`you have not insert first name.`];
                }
                else if(Website.lastname == null)
                {
                   info = [`you have not insert last name.`];
                }
                else
                {
                    Website.logoUrl = ldata
                }
    return info;
}