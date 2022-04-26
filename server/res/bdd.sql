#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


#------------------------------------------------------------
# -- Delete database
#------------------------------------------------------------
DROP DATABASE IF EXISTS crashteddy;
DROP USER IF EXISTS 'ted'@'localhost';

#------------------------------------------------------------
# -- Create database
#------------------------------------------------------------
CREATE DATABASE crashteddy;

#------------------------------------------------------------
# --Create user
#------------------------------------------------------------
CREATE USER 'ted'@'localhost' IDENTIFIED BY 'CRaSHTeDy19$$';
GRANT ALL PRIVILEGES ON crashteddy.* TO 'ted'@'localhost';
FLUSH PRIVILEGES;

USE crashteddy;

#------------------------------------------------------------
# -- Table: user
#------------------------------------------------------------

CREATE TABLE user(
        email    Varchar (50) NOT NULL ,
        pseudo   Varchar (50) NOT NULL ,
        password Varchar (150) NOT NULL ,
        token    Varchar (250) ,
        balance  Double NOT NULL
	,CONSTRAINT user_PK PRIMARY KEY (email)
)ENGINE=InnoDB;

INSERT INTO user (email, password, pseudo, balance) VALUES ("victor@crashtedy.com", "123", "gouderg", 100), ("aurelien@crashtedy.com", "456", "aurelsan", 10000);

#------------------------------------------------------------
# -- Table: game
#------------------------------------------------------------

CREATE TABLE game(
        hash_game Varchar (250) NOT NULL
	,CONSTRAINT game_PK PRIMARY KEY (hash_game)
)ENGINE=InnoDB;


#------------------------------------------------------------
# -- Table: bet
#------------------------------------------------------------

CREATE TABLE bet(
        id_bet                  Int  Auto_increment  NOT NULL ,
        amount_bet              Double NOT NULL ,
        cash_out_multiplicateur Double ,
        new_balance             Double ,
        hash_game               Varchar (250) NOT NULL ,
        email                   Varchar (50) NOT NULL
	,CONSTRAINT bet_PK PRIMARY KEY (id_bet)

	,CONSTRAINT bet_game_FK FOREIGN KEY (hash_game) REFERENCES game(hash_game)
	,CONSTRAINT bet_user0_FK FOREIGN KEY (email) REFERENCES user(email)
)ENGINE=InnoDB;
