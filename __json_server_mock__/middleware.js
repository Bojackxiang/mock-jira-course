module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin") {
      res.status(200).json({
        user: {
          token: "123",
          username: "admin",
        },
      });
      return;
    } else {
      res.status(400).json({
        message: "wrong password",
      });
      return;
    }
  }

  if (req.path === "/me") {
    res.status(200).json({
      user: {
        token: 123,
        username: "admin",
      },
    });
    return;
  }

  console.log(req.method);

  next();
};
