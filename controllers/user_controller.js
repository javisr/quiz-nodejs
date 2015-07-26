var users = {
  admin: {
    id: 1,
    username: "admin",
    password: "1234"
  },
  pepe: {
    id: 2,
    username: "javi",
    password: "javi"
  }
};

exports.autenticar = function(login, password, callback) {
  if (users[login]) {
    if (password === users[login].password) {
      callback(null, users[login]);
    } else {
      callback(new Error('Login incorrecto'));
    }
  } else {
    callback(new Error('Login incorrecto'));
  }
};
