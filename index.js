const express = require("express");

const app = express();

app.use(express.json({ extented: false }));

// function logger(req, res, next) { //function banakr pass krdia, use humesha get se upper as a middleware us kreinge
//   req.name = "huzaifa";  //req ek object pass kia name ka
//   next();
// }

app.use((req, res, next) => {
  console.log("logger");
  next();
});

app.get("/", (req, res) => {
  //hit data on route
  {
    res.json({ success: true });
  }
  console.log(req.body);
});

app.get("/users", Auth, (req, res) => {
  //get for speicifc route || use for global
  res.status(200).json({ users: [{}, {}, {}] });
});

function Auth(req, res, next) {
  console.log("Auth is a middleware");
  let isvalid = false;
  if (isvalid) {
    next();
  } else {
    res
      .status(404)
      .send({ success: "False", message: "Invalid Credidentials" });
  }
}

app.use((req, res) =>
  res.status(404).send({
    message: "API not found",
    route: `${req.hostname}${req.url}`,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
