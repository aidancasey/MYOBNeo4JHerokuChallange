 _______                  _____      ____. _________
 \      \   ____  ____   /  |  |    |    | \_   ___ \  ____   _____ ______
 /   |   \_/ __ \/  _ \ /   |  |_   |    | /    \  \/ /  _ \ /     \\____ \
/    |    \  ___(  <_> )    ^   /\__|    | \     \___(  <_> )  Y Y  \  |_> >
\____|__  /\___  >____/\____   |\________|  \______  /\____/|__|_|  /   __/
        \/     \/           |__|                   \/             \/|__|

 Aidan & Pavan & Simon

This is the judges solution to the MYOB AD Coding competition

you can't judge the competition unless you understand the pain that went into building an entry :)

 import and search the data in Neo4J - I'm not fussed about uploading the files

Its an 8 week challenge for the developers at MYOB @MYOBTeam to wrap their heads around the following technologies
Neo4J, Heroku and node.js

full competition details are here

https://github.com/ptpavankumar/Competition


I've copied the code this code (https://github.com/aseemk/node-neo4j-template) which gives you a
basic Express website that writes to Neo4J but I'm not a fan of the jade templating engine - this will get ripped out
and we'll use knockout.js and clean RESTful services


TO DO LIST
**********

O Figure out a first data model nodes and relationships on whiteboard

O Translate  model to Neo4J

X Create basic structure

X Neo4J integration

X csv file processing using neo

O parse each csv -> to JSON -> to Neo4J

O Clean RESTful API's for all service calls

O Twitter integration to identify influential clients

O Feed in Share prices to determine wealthiest clients

O Cypher queries to bring back all the data!!

How to deploy to Heroku...
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


