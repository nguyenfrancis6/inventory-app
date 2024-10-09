const express = require("express");
const baseRouter = require("./routes/baseRoutes");
const traitRouter = require("./routes/traitRoutes");
const championRouter = require("./routes/championRoutes");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");
const PORT = process.env.PORT || 3000;

app.use("/", baseRouter);
app.use("/traits", traitRouter);
app.use("/champions", championRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
