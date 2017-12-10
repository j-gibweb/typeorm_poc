
import {createConnection, createConnections} from "typeorm";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";
import {Routes} from "./routes";
import express from "express"
import bodyParser from "body-parser"


const commonOptions = {
  // "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "jamesweber",
  "password": "",
  // "database": "typeorm_poc",
  "synchronize": true,
  "entities": [
    "dist/entity/*.js"
  ],
  "subscribers": [
    "dist/subscriber/*.js"
  ],
  "migrations": [
    "dist/migration/*.js"
  ],
  "cli": {
    "entitiesDir": "dist/entity",
    "migrationsDir": "dist/migration",
    "subscribersDir": "dist/subscriber"
  },
  logging: true
};

const customerDBs = [
  "typeorm_poc",
  "typeorm_poc2"
];

const connectionConfigs = customerDBs.map((customerDBName) => {
  return {
    ...commonOptions,
    name: customerDBName,
    database: customerDBName
  }
});

createConnections(connectionConfigs).then(async connections => {
  // console.log(connection)
  const app = express();
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach(route => {
    
    // app.get('/posts', (req, res, next) => {
    (app)[route.method](route.route, (req, res, next) => {
      const dbName = req.headers['target-db'];
      
      if (!dbName) {
        return res.status(400).send({message: "must provide db name"})
      }

      // const result = new PostController("type_orm_database").get(req, res, next);
        const result = (new (route.controller)(dbName))[route.action](req, res, next);
        
        if (result instanceof Promise) {
            
          result.then((result) => {
            if (result !== null && result !== undefined) {
              return res.send(result)
            } else {
              return res.send({message: 'not found or something'})
            }
          });
            
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }

    });

  });

  // // start express server
  app.listen(8888);
  console.log("Express server has started on port 8888. Open http://localhost:8888/posts");

}).catch(error => console.log("Error: ", error));