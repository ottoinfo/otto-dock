const express = require("express");

const Helpers = require("../helpers");
const Models = require("../models");

const petRoutes = () => {
  const router = express.Router();

  router.get("/pets", async (req, res) => {
    Models.Pet
      .findAll()
      .then(pets => {
        // pets will be an array of all Pet instances
        res.json({ ...Helpers.successPayload, payload: pets });
      })
      .catch(err => {
        console.log({ err });
        res.json({ ...Helpers.errorPayload, err });
      });
  });

  return router;
};

module.exports = petRoutes;
