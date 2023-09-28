const indexR = require("./index");
const usersR = require("./users");
const gamesR = require("./games");
const cookiesR = require("./cookies");


exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/games", gamesR);
  app.use("/cookies", cookiesR);

}

