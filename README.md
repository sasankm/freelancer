##This is a freelance application:

There are three parts to start the application. Database, server and client.


#STARTING THE DATABASE:

MYSQL Database is used. Three tables are created Project, Users and Bids.

#Run the following query to create Users table:

CREATE TABLE `Users` (
  `username` varchar(16) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(80) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `image` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `aboutme` mediumtext,
  `skills` longtext,
  PRIMARY KEY (`username`)
)

#Run the following query to create Project table:

CREATE TABLE `Project` (
  `project_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `title` mediumtext,
  `description` longtext,
  `filepath` mediumtext,
  `skills` mediumtext,
  `budget` mediumtext,
  `status` mediumtext,
  PRIMARY KEY (`project_id`),
  UNIQUE KEY `project_id_UNIQUE` (`project_id`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

#Run the following command to create Bids table:

CREATE TABLE `Bids` (
  `period` int(11) DEFAULT NULL,
  `userName` varchar(16) NOT NULL,
  `projectId` int(11) NOT NULL,
  `bid` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`projectId`,`userName`),
  KEY `username_idx` (`userName`),
  CONSTRAINT `project_idConstraint` FOREIGN KEY (`projectId`) REFERENCES `Project` (`project_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usernameConstraint` FOREIGN KEY (`userName`) REFERENCES `Users` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
)

start the database.

#Starting the server:

1) move to server/ folder
2) Run command --- npm install & npm start ( server starts on 3000 )

#Starting the client:

1) remain in freelancer-application/ folder
2) Run command --- npm install & PORT=3001 npm start (client start on 3001)

You can start viewing the client on http://localhost:3001/
