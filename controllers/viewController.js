// controllers/viewController.js

export const renderLogin = (_, res, next) => {
  try {
    res.render('login', { error: null });
  } catch (err) {
    next(err);
  }
};
export const renderRegister = (_, res, next) => {
  try {
    res.render('register', { error: null });
  } catch (err) {
    next(err);
  }
};

export const renderDashboard = (req, res, next) => {
  try {
    res.render('dashboard', { error: null, username: req.user.username });
  } catch (err) {
    next(err);
  }
};

export const renderProfile = (req, res, next) => {
  try {
    res.render('profile', { error: null, user: req.user });
  } catch (err) {
    next(err);
  }
};

export const renderEditProfile = (req, res, next) => {
  try {
    res.render('edit-profile', { error: null, user: req.user });
  } catch (err) {
    next(err);
  }
};
