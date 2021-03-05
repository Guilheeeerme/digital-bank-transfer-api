import { Router } from "express";

import accountRouter from "./account.routes";
import authRouter from "./auth.routes";
import transferRouter from "./transfer.routes";

const routes = Router();

routes.use("/accounts", accountRouter);
routes.use("/login", authRouter);
routes.use("/transfers", transferRouter);

export default routes;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzMjBmZDI5LWI4MDctNDYwYS1iZWM0LTEyY2RkYTAzODllMiIsImlhdCI6MTYxNDk3MzE3MCwiZXhwIjoxNjE1MDU5NTcwfQ.ADuJw7uwoaKI5PX9n09y1-8yQ5xSaXcJZOowA77FWVQ
