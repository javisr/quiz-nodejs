var models = require('../models/models.js');

// AUTOLOAD
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(function(quiz) {
    if (quiz) {
      req.quiz = quiz;
      next();
    } else {
      next(new Error('No existe quizId=' + quizId));
    }
  }).catch(function(error) {
    next(error);
  });
};

exports.index = function(req, res) {
  var sql;
  sql = {
    order: "pregunta"
  };

  if (req.query.search) {
    sql.where = ["pregunta LIKE ?", ('%' + req.query.search.replace(/\s/g, '%') + '%').replace(/%{2,}/g, '%')];
  }

  models.Quiz.findAll(sql).then(function(quizes) {
    res.render('quizes/index', {
      quizes: quizes,
      searched: req.query.search ? req.query.search : ''
    });
  });
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {
      quiz: req.quiz
    });
  });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === req.quiz.respuesta) {
      res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: 'Correcto'
      });
    } else {
      res.render('quizes/answer', {
        quiz: quiz,
        respuesta: 'Incorrecto'
      });
    }
  });
};
