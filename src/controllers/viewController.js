// controllers/viewController.js

export const renderLogin = (req, res, next) => {
  try {
    const error = req.query.error || null; // get the error message from the query string
    console.log('error');
    res.render('login', { error });
  } catch (err) {
    next(err);
  }
};

export const renderRegister = (req, res, next) => {
  try {
    const error = req.query.error || null; // get the error message from the query string
    res.render('register', { error });
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
