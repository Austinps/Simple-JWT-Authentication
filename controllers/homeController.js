export const homeHandler = (req, res) => {
  res.render('index', { token: res.locals.token });
};
