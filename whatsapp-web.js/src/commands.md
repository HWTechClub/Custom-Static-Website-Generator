
# Commands available for user interaction

*wg* -> Command wg help to get the avaialabe instructions
*wg help* -> The following are the available commands:
*wg create <company name> -> creates a framework for the website after getting details of the website

# Following commands only works when a website is created

*wg product all* -> shows all the products that are created
*wg product new* -> creates a new product with generated Id
*wg product <id>* -> if the id exists, the product with “id“ is selected, else, create a new product with the id given

# NOTE : 
User should be given feedback on their commands. For example:
If a user created a product, the bot should reply, "a product has been created with the id : <id>"
If a user created a product without a website, the bot should handle the error and reply, "A website should be selected or created before creating a product"

# Following command only works if a product is selected 
*wg product info* -> shows the information about the product. Ie name, cost, description, image
*wg product name* <product-name> -> set the name of the product
*wg product cost* <product-cost> -> set the cost of the product
*wg product desc* <product-desc> -> set the description of the product
*wg product image* <product-image> -> sets the image of the product. The caption of the image should be the command.
*wg finished* -> creates the website and gives a link to the website maker


# Note:
If you think these commands are not enough, please add them in a seperate section with a clear defination.