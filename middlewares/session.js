import session from 'express-session';
import fnKnexStore from 'connect-session-knex';

import db from '../utils/db.js';

export default function (app) {
  //   const KnexStore = fnKnexStore(session);
  //   const store = new KnexStore({ knex: db });


  // {
  //     auth : boolean
  //     authAccount : object
  //      otp : string
  //      signup : object
  // }
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'SECRECT_KEY',
    resave: true,
    saveUninitialized: true,
    //store: store,
    cookie: {
      secure: false,            //setting this false for http connections
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000) 
    }
  }))
}