const express = require("express");
const router = express.Router();
const Textile = require("../models/Textile");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth");

// Get all the textiles
router.get("/", (req, res, next) => {
  Textile.find()
    .then((textileDocuments) => {
      res.status(200).json(textileDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

//Get one textile
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

// Update a specific textile
router.patch(
  "/:id",
  requireAuth,
  uploader.single("image"),
  (req, res, next) => {
    const item = { ...req.body };
    console.log(item);
    Textile.findById(req.params.id)
      .then((itemDocument) => {
        if (!itemDocument)
          return res.status(404).json({ message: "Item not found" });
        if (itemDocument.id_user.toString() !== req.session.currentUser) {
          return res
            .status(403)
            .json({ message: "You are not allowed to update this document" });
        }

        if (req.file) {
          item.image = req.file.secure_url;
        }

        Textile.findByIdAndUpdate(req.params.id, item, { new: true })
          .populate("id_user")
          .then((updatedDocument) => {
            return res.status(200).json(updatedDocument);
          })
          .catch(next);
      })
      .catch(next);
  }
);

// create textile
router.post("/", requireAuth, uploader.single("image"), (req, res, next) => {
  const updateValues = { ...req.body };

  if (req.file) {
    updateValues.image = req.file.path;
  }

  updateValues.id_user = req.session.currentUser;

  Textile.create(updateValues)
    .then((plantDocument) => {
      textileDocument
        .populate("id_user")
        .execPopulate() 
        .then((plant) => {
          console.log("here");
          res.status(201).json(textile); 
        })
        .catch(next);
    })
    .catch(next);
});

// Delete textile
router.delete("/:id", (req, res, next) => {
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
