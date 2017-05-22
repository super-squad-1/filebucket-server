'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// File managing routes
.resources('uploads', { except: ['edit', 'new'] })
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
