import session from 'express-session';
import fnKnexStore from 'connect-session-knex';

import db from '../utils/db.js';

export default function (app) {
//   const KnexStore = fnKnexStore(session);
//   const store = new KnexStore({ knex: db });


// {
//     auth : boolean
//     authAccount : object
// }
  app.set('trust proxy', 1) // trust first proxy
  app.use(session({
    secret: 'SECRECT_KEY',
    resave: false,
    saveUninitialized: true,
    //store: store,
    cookie: {
      // secure: true
    }
  }))
}