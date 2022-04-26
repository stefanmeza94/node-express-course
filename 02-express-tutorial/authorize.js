const authorize = (req, res, next) => {
  const { user } = req.query;

  if (user === "john") {
    // ovo je primer samo radi demonstracije kako mozemo da authorizujemo usera, normalno ovde bi storovali jwt token, a ne usera u req objekat!
    // ovo sto smo dodali u req objekat bice dostpuno u svim rutama tamo koje gadjamo, zato su ovi middlware toliko mocni.
    req.users = { name: "John", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
