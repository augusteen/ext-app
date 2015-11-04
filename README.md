# ExtJS App

Follow along in this tutorial http://www.extjstips.com/2015/11/03/build-an-extjs-and-laravel-application-part-1/

## Usage

Unzip the archive into your htdocs folder on your web server.

If using apache make sure mod_rewrite is enabled.  If using IIS make sure
URLRewrite is installed and enabled.  There is a .htaccess file and web.config
file provided to remove index.php from the URL.

## Edit Config File

Change the name of the /laravel/.env.example to .env.

Edit the .env file and change the DB info such has host, user and password

## Create the Database

This application is using a MySQL (v5.6) database.  To get started create a
new database called ext_app with a UTF8 character set and a uft8_unicode_ci collation.

## Create database tables

There are 2 ways to create the tables.

1) In your terminal go to the /laravel directory and type php artisan migrate

Or

2) Import the ext_app.sql file located in /laravel