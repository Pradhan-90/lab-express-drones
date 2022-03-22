const express = require("express");
const async = require("hbs/lib/async");
const DroneModel = require("../models/Drone.model");
const router = express.Router();

// require the Drone model here

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  const drones = await DroneModel.find();
  console.log(drones);
  res.render("drones/list", { drones });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const droneToCreate = req.body;
    await DroneModel.create(droneToCreate);

    res.render("/drones");
  } catch {
    res.redirect("/drones/create");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const drone = await DroneModel.findById(req.params.id);
    res.render("drones/update-form", { drone });
  } catch {
    next();
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  //   // Iteration #4: Update the drone
  try {
    const droneToUpdate = req.body;
    await Drone.findByIdAndUpdate(req.params.id, droneToUpdate);

    router.post("/drones/:id/delete", (req, res, next) => {
      res.redirect("/drones");
    });
  } catch {
    res.redirect(`/drones/${req.params.id}/edit`);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    await DroneModel.findByIdAndDelete(req.params.id);
    res.redirect("/drones");
  } catch {
    res.send(`it didn't work`);
  }
});

module.exports = router;
