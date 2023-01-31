require ("dotenv").config();
const express = require ("express");
const connectDB = require( "./config/db" );
const urlRoutes = require ("./routes/url");
const Url = require("./models/Url");

const app = express();

// connectDB();
connectDB ();

app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));
app.set("view engine", "ejs");

// Route-> Home Page
app.use("/", async(req, res) => {
    const urls = await Url.find();
    res.render("home", {urls: urls});
  });

app.use("/", urlRoutes);
// Route-> Redirection
app.use("/", require("./routes/urlRedirect"));
// Route-> Shorteneing
app.use("/shorten", require("./routes/url"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log( `App is running on port ${PORT}` );
});


