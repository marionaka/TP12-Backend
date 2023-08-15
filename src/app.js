//IMPORTACIONES
//Servidor, persistencia y views
import * as path from "path";
import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { app, io } from "./utils/server.util.js";

//Routers
import productRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import messageRouter from "./routers/messages.router.js";
import userRouter from "./routers/users.router.js";
import viewsRouter from "./routers/views.router.js";
import ticketRouter from "./routers/tickets.router.js";
import mockRouter from "./routers/mock.router.js";
import loggerRouter from "./routers/logger.router.js";

//Login, Cookies y Session
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from "./config/passport.config.js";

//Controller para chat
import messageController from "./controllers/message.controller.js";

//Utils y Middlewares
import { appConfig } from "./config/env.config.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { addEnvLogger } from "./middlewares/logger.middleware.js";

//Configuración de servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

//Configuración de carpeta pública
app.use(express.static(path.join(process.cwd() + "/public")));

//Configuración de login y session
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: appConfig.mongoUrl,
      dbName: appConfig.mongoDbName,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 6000,
    }),
    secret: appConfig.sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Configuración de DB
mongoose.connect(appConfig.mongoUrl, { dbName: appConfig.mongoDbName });

//Configuración de Winston logger
app.use(addEnvLogger);

//Configuración de Routers
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);
app.use("/api/tickets", ticketRouter);
app.use("/mockingproducts", mockRouter);
app.use("/loggertest", loggerRouter);
app.use("/", viewsRouter);

//Configuración de Middlewares
app.use(errorMiddleware);

//Configuración de Socket
io.on("connection", async (socket) => {
  socket.on("message", async (data) => {
    await messageController.add(data);
    io.emit("messageLogs", await messageController.get());
  });
  socket.on("sayhello", async (data) => {
    io.emit("messageLogs", await messageController.get());
    socket.broadcast.emit("alert", data);
  });
});


// mongoose.connect(
//   "mongodb+srv://marianonakamura:pU77mD4xz87bI6Tr@codercluster.20kgbjc.mongodb.net/?retryWrites=true&w=majority",
//   { dbName: "ecommerce" }
// );


// app.use(
//   session({
//     store: MongoStore.create({
//       mongoUrl:
//       "mongodb+srv://marianonakamura:pU77mD4xz87bI6Tr@codercluster.20kgbjc.mongodb.net/?retryWrites=true&w=majority",
//       dbName: "ecommerce",
//       mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//       ttl: 6000,
//     }),
//     secret: "pass123",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
