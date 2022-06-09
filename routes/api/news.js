const express = require("express");
const router = express.Router();
const News = require("../../models/News");

router.post("/addNews", (req, res) => {
  const { newsType, postTime, author, content, imageUrl } = req.body;
  const news = new News({
    newsType,
    postTime,
    author,
    content,
    imageUrl,
  });

  news
    .save()
    .then((news) => res.json(news))
    .catch((err) => console.log(err));
});

router.get("/all", async (req, res) => {
  const news = await News.find();
  res.status(200).json({ msg: "SUCCESS", news });
});

router.get("/filteredNews/:tech/:author", async (req, res) => {
  let authors =
    req.params.author !== "null" ? req.params.author.split("-") : [];
  let techs = req.params.tech !== "null" ? req.params.tech.split("-") : [];
  let filterCriteria = {};
  if (techs.length !== 0 && authors.length !== 0) {
    filterCriteria = {
      author: { $in: authors },
      newsType: { $in: techs },
    };
  } else {
    if (techs.length === 0 && authors.length === 0) {
      filterCriteria = {};
    } else if (techs.length === 0) {
      filterCriteria = {
        author: { $in: authors },
      };
    } else {
      filterCriteria = {
        newsType: { $in: techs },
      };
    }
  }

  const filtered = await News.find(filterCriteria);
  if (filtered.length > 0) {
    return res.status(200).json({ msg: "SUCCESS", filtered });
  }
  return res.json({ msg: "FAILURE", filtered });
});
module.exports = router;
