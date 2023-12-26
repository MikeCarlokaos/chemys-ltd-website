// crud-admin/server/src/routes/shortages.js

const express = require("express");
const Shortage = require("../models/Shortage");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const criteria = req.query.criteria || "name";
    const order = req.query.order || "asc";
    const searchTerm = req.query.search || "";

    console.log("Sorting criteria:", criteria);
    console.log("Sorting order:", order);
    console.log("Search term:", searchTerm);

    const sortOrder = order === "desc" ? -1 : 1;

    const findQuery = {
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { alternatives: { $regex: searchTerm, $options: "i" } },
      ],
    };

    const totalItems = await Shortage.countDocuments(findQuery);

    const sortOptions = {};
    sortOptions[criteria] = sortOrder;

    const shortages = await Shortage.find(findQuery)
      .collation({ locale: "en", strength: 2 })
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json({
      shortages,
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching shortages:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/name-data", async (req, res) => {
  try {
    const nameData = await Shortage.aggregate([
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    res.json(nameData);
  } catch (error) {
    console.error("Error fetching name data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/total-items", async (req, res) => {
  try {
    const totalItems = await Shortage.countDocuments({ _id: { $ne: null } });
    console.log("Total items:", totalItems);
    res.json({ totalItems });
  } catch (error) {
    console.error("Error fetching total items:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
