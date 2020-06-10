import 'dotenv/config';

import express from 'express';
import Youch from 'youch';
import path from 'path';
import routes from './routes';


import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }
 
  middlewares() {
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler(){
    this.server.use(async(error, request, response, next) => {
      if(process.env.NODE_ENV === 'development'){
        const errors = await new Youch(error, request).toJSON();

        return response.status(500).json(errors);
      }
      return response.status(500).json({error: 'Internal server error!'});

    });
  }
}

export default new App().server;
