# Example how to use [TypeORM](https://github.com/typeorm/typeorm) with JavaScript + Babel

clone repository 
`npm i`

install `watch` -- `npm i -g watch`

in two different windows, from project root, run

`watch "npm run build" ./src/` -- this will watch the src/ dir and rebuild on file changes

and

`npm run start` -- this will run the server with nodemon and restart it whenever the package rebuilds

I'm trying to decide between Typeorm and [Sequelize](http://docs.sequelizejs.com/)

this repo might require other global dependencies `:(` like `babel-cli` or something