'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// File managing routes
.post('/upload', 'uploads#create')
.get('/download/:id', 'uploads#download')

// calling RESTful uploads, to make it clear that it is different than uploading
// a single file
.resources('uploads', { except: ['create'] })
// .get('/uploads', 'uploads#index')
// .get('/uploads/:id', 'uploads#read')
// .delete('/uploads/:id', 'uploads#delete')
// .patch('/uploads/:id', 'uploads#update')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
