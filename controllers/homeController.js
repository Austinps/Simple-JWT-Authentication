export const homeHandler = (_, res, next) => {
  try {
    res.render('index', { token: res.locals.token });
  } catch (err) {
    next(err);
  }
};
