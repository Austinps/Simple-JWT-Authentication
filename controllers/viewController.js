// controllers/viewController.js

export const renderLogin = (req, res) => {
  res.render('login');
};

export const renderRegister = (req, res) => {
  res.render('register');
};

export const renderDashboard = (req, res) => {
  res.render('dashboard', { username: req.user.username });
};

export const renderProfile = (req, res) => {
  res.render('profile');
};
