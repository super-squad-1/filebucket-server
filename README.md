# Filebucket Server
<!-- * A short description of your application -->
Filebucket is a Dropbox-like app that allows users to upload files into a
virtual file system. Anyone can read or dowload files and owners can delete
or rename their own files. Filebucket stores information for the files on a
MongooseDB database and stores the files in and AWS S3 bucket. The client is
built using Bootstrap and Handlebars

## Deployed back-end app
<!-- * A link to the deployed back-end app. -->
https://safe-retreat-33747.herokuapp.com

## Deployed front-end app
<!-- * A link to the repo for your front-end. -->
https://super-squad-1.github.io/filebucket-client/

## Routes
<!-- * A catalog of routes (paths and methods) that the API expects. -->
Method    Path
GET       /
GET       /uploads
GET       /uploads/:id
POST      /uploads
PATCH     /uploads/:id
PUT       /uploads/:id
DELETE    /uploads/:id
POST      /sign-up
POST      /sign-in
DELETE    /sign-out/:id
PATCH     /change-password/:id
GET       /users
GET       /users/:id

## Developers
@prankmode
@pjliddy
@eliottenos
@jbeltrami
