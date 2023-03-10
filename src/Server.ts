import express, { Request, Response } from "express";
import bodyParser  from "body-parser";
import { validationResult } from "express-validator";
import Validation from "../src/Validation";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Node server is running on this port ${port}`);
});

app.get("/", (request: Request, response: Response) => {
  response.send("Hello World");
});

app.post(
  "/api/user",
  new Validation().Validate(),
  (request: express.Request, response: express.Response) => {
    const error = validationResult(request);

    if (!error.isEmpty()) {
      response.status(200).json(error);
    } else {
      response.json("Successfully validated");
    }
  }
);
