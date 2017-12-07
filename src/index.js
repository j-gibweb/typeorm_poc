
import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";
import {Routes} from "./routes";
import express from "express"
import bodyParser from "body-parser"

// connection settings are in the "ormconfig.json" file
createConnection({
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "jamesweber",
  "password": "",
  "database": "typeorm_poc2",
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
  }
}).then(connection => {
  // console.log(connection.options)
  const app = express();
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach(route => {

    (app)[route.method](route.route, (req, res, next) => {
        const result = (new (route.controller)(req.headers['target-db']))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
  });


  // start express server
  app.listen(8888);
  console.log("Express server has started on port 3000. Open http://localhost:3000/posts");

  const category1 = new Category();
  category1.name = "TypeScript";

  const category2 = new Category();
  category2.name = "Programming";

  const post = new Post();
  post.title = "Control flow based type analysis 2";
  post.text = "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
  post.categories = [category1, category2];

  // return connection
  //   .getRepository(Post)
  //   .save(post)
  //   .then(post => {
  //     console.log("Post has been saved: ", post);
  //   });

}).catch(error => console.log("Error: ", error));