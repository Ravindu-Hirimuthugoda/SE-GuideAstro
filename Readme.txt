Before running 

    nodemon index.js

to start the server in VS Code please 

    1) Create the .env File

    it should contain

        port = 456  // 456 should be the port that you use in development

        dbconfig = {"connectionLimit": 10,"user": "root","password": "your passsword for root","host": "localhost","database": "database name that you use"}

    2) Install all the dependencies in the package-lock.json file using the command

        npm install

After the server successfully starts

Use the following endpoints to interact with the server



......................Authentication End points


login POST > localhost:3000/auth/login?username=meelan&password=pass

            * Please note that after login user gets invalidated after 500 minutes

logout DELETE > localhost:3000/api/logout

change passsword POST > localhost:3000/api/changepass?username=meelan&currpassword=pass&newpassword=pass

signup POST > localhost:3000/auth/signup?username=meelan&password=pass&type=admin

            Here type can be      a) admin   or   b)regular



......................User Action containing End points for Space Object Handling


Add Astronomy object POST > localhost:3000/api/AddAstrObj?tag=astro_object_name&image=url_for_the_image&desc=description

Edit Astronomy object PUT > localhost:3000/api/EditAstrObj?tag=obj1&desc=description&image=image

    Here tag should be defined but desc and decription are not compulsory

Edit Planet object PUT > localhost:3000/api/EditPlanet?tag=obj1&image=imgtest&desc=description

    Here also above condition holds

Get list of astro objects GET > localhost:3000/api/getAstrList?count=5&tbName=astronomical_object

    Here count is the number of rows that you need from the DB. tbName is either astronomical_object or planet 
    according to the requirement.

Get an Astro Object GET > localhost:3000/api/getAstrObj?tag=obj1

Get a planet Object GET > localhost:3000/api/getPlanet?tag=obj1


.......................User Action containing End points for news object handling

Add a news POST > localhost:3000/api/AddNews?description=news body

Edit a news PUT > localhost:3000/api/EditNews?id=2&description=Edited news body

Fetch news list  GET > localhost:3000/api/getNewsList?count=5

        * Please Note that the count refers for the number of news articles required

Fetch a news GET > localhost:3000/api/getNews?id=2

        * Here id refers to the news_id of the required news object. You will have to pass it on from the FO

Add a comment POST > localhost:3000/api/addComment?id=2&comment=comment body

Get all the comments GET > localhost:3000/api/getComment?id=1

        * Here id refers to the news_id of the required news object. You will have to pass it on from the FO




