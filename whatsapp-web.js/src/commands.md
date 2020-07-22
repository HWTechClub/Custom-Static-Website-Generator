
# Commands available for user interaction

`wg` -> Command wg help to get the avaialabe instructions.    
`wg help` -> All the commands will be made be displayed to the user.  
`wg website <company name>` -> if a website exists with the same **company name**, then that website is selected, else it creates a new website. 

### Note:
After the user uses `wg create <company name>`. The bot should instruct the user to enter the rest of the details.
To see the details to be entered, please check [website.js](https://github.com/HWTechClub/Custom-Static-Website-Generator/blob/master/whatsapp-web.js/src/models/website.js) under models folder.

The commands should follow the rules below :
`wg website firstName`, `wg website lastName`,  etc..

### Following commands only works when a website is created

`wg product all` -> shows all the products that are created.  
`wg product new` -> creates a new product with generated Id.  
`wg product <id>` -> if the id exists, the product with *id* is selected, else, create a new product with the id given.  

### NOTE : 
User should be given feedback on their commands. For example:  
If a user created a product, the bot should reply, *a product has been created with the id : <id>*.   
If a user created a product without a website, the bot should handle the error and reply, *A website should be selected or created before creating a product*.   

### Following command only works if a product is selected 
`wg product info` -> shows the information about the product. Ie name, cost, description, image.  
`wg product name <product-name>` -> set the name of the product.  
`wg product cost <product-cost>` -> set the cost of the product.  
`wg product desc <product-desc>` -> set the description of the product.  
`wg product image <product-image>` -> sets the image of the product. The caption of the image should be the command.  

### Create the website
`wg website finished` -> creates the website and gives a link to the website maker.  

# Delete
Users should be able to delete products and website.  
`wg delete product <id>`, `wg delete website <company name>`  

# Note:
If you think these commands are not enough, please add them in a seperate section with a clear defination.
