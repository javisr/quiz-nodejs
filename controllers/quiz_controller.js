var models = require('../models/models.js');

// AUTOLOAD
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
    where: {
      id: Number(quizId)
    },
    include: [{
      model: models.Comment
    }]
  }).then(function(quiz) {
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
      searched: req.query.search ? req.query.search : '',
      errors: []
    });
  });
};

// GET /quizes/:id
exports.show = function(req, res) {
  console.log('JAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    console.log('JPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')

    res.render('quizes/show', {
      quiz: req.quiz,
      errors: []
    });
  });
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.findById(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === req.quiz.respuesta) {
      res.render('quizes/answer', {
        quiz: req.quiz,
        respuesta: 'Correcto',
        errors: []
      });
    } else {
      res.render('quizes/answer', {
        quiz: quiz,
        respuesta: 'Incorrecto',
        errors: []
      });
    }
  });
};


exports.new = function(req, res) {
  var quiz = models.Quiz.build({
    pregunta: "Pregunta",
    respuesta: "respuesta",
    tematica: ""
  });

  res.render("quizes/new", {
    quiz: quiz,
    errors: []
  });
};

exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  quiz.validate().then(function(err) {
    if (err) {
      res.render("quizes/new", {
        quiz: quiz,
        errors: err.errors
      });
    } else {
      quiz.save({
        fields: ["pregunta", "respuesta", "tematica"]
      }).then(function() {
        res.redirect("/quizes");
      });
    }
  });
};

exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render("quizes/edit", {
    quiz: quiz,
    errors: []
  });
};

exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tematica = req.body.quiz.tematica;

  req.quiz.validate().then(function(err) {
    if (err) {
      res.render("quizes/edit", {
        quiz: req.quiz,
        errors: err.errors
      });
    } else {
      req.quiz.save({
        fields: ['pregunta', 'respuesta', 'tematica']
      }).then(function() {
        res.redirect('/quizes');
      });
    }
  });
};

exports.delete = function(req, res) {
  req.quiz.destroy().then(function() {
    res.redirect('/quizes');
  }).catch(function(error) {
    next(error);
  });
};
