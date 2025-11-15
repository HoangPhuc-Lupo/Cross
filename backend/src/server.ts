import express, { Express } from "express";
import {
  ComicRoutes,
  CountRoutes,
  FavoriteRoutes,
  GenreRoutes,
  UserRoutes,
} from "./routes";
const bodyParser = require("body-parser");
const app: Express = express();
const port = 3000;

const apiVersion = "1";
const apiRoutes = `/api/v${apiVersion}`;

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// parse application/json
app.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Comic Backend!.");
// });

app.use(apiRoutes, UserRoutes);
app.use(apiRoutes, GenreRoutes);
app.use(apiRoutes, ComicRoutes);
app.use(apiRoutes, FavoriteRoutes);
app.use(apiRoutes, CountRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
