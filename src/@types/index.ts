import express from 'express';
import jwtAuthenticationMiddleware from '../routes/authorization.route';
import errorHandler from '../middlewares/error-handler.middleware';
import authorizationRoute from '../routes/authorization.route';
import statusRoute from '../routes/status.route';
import usersRoute from '../routes/users.route';

const app = express();
//APP configuration
app.use(express.json()); //middleware
app.use(express.urlencoded({ extended: true }));

//Route configuration
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);
//Error Handler configuration
app.use(errorHandler);

//Start Server
app.listen(3000, () => {
  console.log("Running on port 3000!");
});
