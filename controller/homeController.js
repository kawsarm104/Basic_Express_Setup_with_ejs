// get login page
function getHome(req, res, next) {
  res.render("home");
}

module.exports = {
  getHome,
};
