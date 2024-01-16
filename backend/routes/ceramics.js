const express = require("express");
const {
  createCeramic,
  getCeramics,
  getCeramic,
  deleteCeramic,
  updateCeramic,
} = require("../controllers/ceramicController");
const requireAuth = require("../middleware/requireAuth");

// then we use express router to create those routes in a separate file
const router = express.Router();

//require auth for all workout routes
router.use(requireAuth);

//get ALL ceramics
router.get("/", getCeramics);

//get a single ceramic work
router.get("/:id", getCeramic);

// post a new ceramic work
router.post("/", createCeramic);

//delete a ceramic work
router.delete("/:id", deleteCeramic);

// update a ceramic
router.patch("/:id", updateCeramic);

module.exports = router;
