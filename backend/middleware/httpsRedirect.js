//redirect user to HTTPS if request for HTTP
exports.httpsRedirect = async (req, res, next) => {
  if (process.env.NODE_ENV !== "development") {
    if (req.headers["x-forwarded-proto"] !== "https")
      // the statement for performing our redirection
      return res.redirect("https://" + req.headers.host + req.url);
    else return next();
  } else return next();
};
