const express = require("express");
const router = express.Router();
const Textile = require("../models/Textile");

// http://localhost:4000/api/textiles
router.get("/", (req, res, next) => {
  // Get all the textiles
  Textile.find()
    .then((textileDocuments) => {
      res.status(200).json(textileDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/textiles/{some-id}
router.get("/:id", (req, res, next) => {
  //Get one specific textile
  Textile.findById(req.params.id)
    .then((textileDocument) => {
      res.status(200).json(textileDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/textiles/{some-id}
router.patch("/:id", (req, res, next) => {
  // Update a specific textile
  Textile.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((textileDocument) => {
      res.status(200).json(textileDocument);
      // There's a trap !
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/textiles
router.post("/", (req, res, next) => {
  // Create a textile
  Textile.create(req.body)
    .then((textileDocument) => {
      res.status(201).json(textileDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/textiles/{some-id}
router.delete("/:id", (req, res, next) => {
  // Deletes a textile
  Textile.findByIdAndRemove(req.params.id)
    .then((textileDocument) => {
      // res.sendStatus(204)
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
