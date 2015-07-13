// GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question', {
    pregunta: 'Capital de Italia'
  });
}
exports.answer = function(req, res) {
  var regExp = /^Roma$/i;
  if (regExp.test(req.query.respuesta)) {
    res.render('quizes/answer', {
      respuesta: 'Correcto'
    });
  } else {
    res.render('quizes/answer', {
      respuesta: 'Incorrecto'
    });
  }
}