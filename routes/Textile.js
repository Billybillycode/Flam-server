const express = require("express");
const router = express.Router();
const textile = require("../models/Textile");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth"); // Route protection middleware : )

router.get("/", (req, res, next) => {
  Textile.find({})
    .populate("id_user") // Gives us the author's id (id_user) object document instead of just the id : )
    .then((textileDocuments) => {
      res.status(200).json(textileDocuments);
    })
    .catch(next); // cf app.js error handling middleware
  // same as below
  //.catch(error => next(error))
});

router.post("/", requireAuth, uploader.single("image"), (req, res, next) => {
  const updateValues = { ...req.body };

  if (req.file) {
    updateValues.image = req.file.path;
  }

  updateValues.id_user = req.session.currentUser; // Retrieve the authors id from the session.

  Textile.create(updateValues)
    .then((textileDocument) => {
      textileDocument
        .populate("id_user")
        .execPopulate() // Populate on .create() does not work, but we can use populate() on the document once its created !
        .then((textile) => {
          console.log("here");
          res.status(201).json(textile); // send the populated document.
        })
        .catch(next);
    })
    .catch(next);
});

router.patch(
  "/:id",
  requireAuth,
  uploader.single("image"),
  (req, res, next) => {
    const textile = { ...req.body };

    Textile.findById(req.params.id)
      .then((textileDocument) => {
        if (!textileDocument)
          return res.status(404).json({ message: "textile not found" });
        if (textileDocument.id_user.toString() !== req.session.currentUser) {
          return res
            .status(403)
            .json({ message: "You are not allowed to update this document" });
        }

        if (req.file) {
          textile.image = req.file.secure_url;
        }

        Textile.findByIdAndUpdate(req.params.id, textile, { new: true })
          .populate("id_user")
          .then((updatedDocument) => {
            return res.status(200).json(updatedDocument);
          })
          .catch(next);
      })
      .catch(next);
  }
);

router.delete("/:id", requireAuth, (req, res, next) => {
  Textile.findById(req.params.id)
    .then((textileDocument) => {
      if (!textileDocument) {
        return res.status(404).json({ message: "textile not found" });
      }
      if (textileDocument.id_user.toString() !== req.session.currentUser) {
        return res.status(403).json({ message: "You can't delete this textile" });
      }

      Textile.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
