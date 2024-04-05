const express = require("express");
// import express from 'express';
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(process.env.PORT, () => console.log("Server ready on port 3000."));

module.exports = app;