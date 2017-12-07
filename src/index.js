// require("babel-core/register");
// require("babel-polyfill");

import {createConnection} from "typeorm";
import {Post} from "./entity/Post";
import {Category} from "./entity/Category";
import {Routes} from "./routes";
import express from "express"
import bodyParser from "body-parser"

// connection settings are in the "ormconfig.json" file
createConnection().then(connection => {
  console.log('hey')

  const app = express();
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach(route => {
    (app)[route.method](route.route, (req, res, next) => {
        const result = (new (route.controller))[route.action](req, res, next);
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

  // const category1 = new Category();
  // category1.name = "TypeScript";

  // const category2 = new Category();
  // category2.name = "Programming";

  // const post = new Post();
  // post.title = "Control flow based type analysis";
  // post.text = "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.";
  // post.categories = [category1, category2];

  // return connection
  //   .getRepository(Post)
  //   .save(post)
  //   .then(post => {
  //     console.log("Post has been saved: ", post);
  //   });

}).catch(error => console.log("Error: ", error));