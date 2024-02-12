const serveApp = (req, res) => {
  res.send({ serveApp: "serve app" });
};

module.exports = { serveApp };
