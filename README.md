MYOB AD Coding competition  - Aidan & Pavan & Simon

This is the judges solution to the MYOB AD Coding competition

you can't judge the competition unless you understand the pain that went into building an entry :)

we should get thsi solution to a point where we can upload, import and search the data in Neo..

Its an 8 week challange for the developers at MYOB to wrap their heads around 
Neo4J, Heroku and node.js

the competition details are here

https://github.com/ptpavankumar/Competition


So far I have just copied the code this code (https://github.com/aseemk/node-neo4j-template)

The code demonstrates how to build out a simple social graph over Neo4J using the RESTful API

Next step is to strip it back and start to implement the real solution

TO DO LIST
**********

O Figure out a first data model nodes and relationships on whiteboard 

O Translate  model to Neo4J

O Basic File upload processing using node.js

O csv file processing using neo

O Batch import APIs

O document search APIs


To deploy to Heroku...
**********************

grab all this code...

heroku login

git init

git add .

git commit -m "init"

heroku create

heroku addons:add neo4j

git push heroku master

heroku ps:scale web=1


be sure to scale down the web role when you are done
heroku ps:scale web=0


