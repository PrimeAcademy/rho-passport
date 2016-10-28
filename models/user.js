// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const pool = require('../db/connection');

// find by username
function findByUsername(username) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE username=$1',
                   [username],
                   function(err, result){
                     done();
                     if (err) {
                       reject(err);
                     }

                     resolve(result.rows[0]);
                   });
    });
  });
}



// find by id
function findById(id) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('SELECT * FROM users WHERE id=$1',
                   [id],
                   function(err, result){
                     done();
                     if (err) {
                       reject(err);
                     }

                     resolve(result.rows[0]);
                   });
    });
  });
}

// create
function create(username, password) {
  return new Promise(function(resolve, reject){
    pool.connect(function(err, client, done){
      if (err) {
        done();
        return reject(err);
      }

      client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
                   [username, password],
                   function(err, result){
                     done();
                     if (err) {
                       reject(err);
                     }

                     resolve(result.rows[0]);
                   });
    });
  });
}

// compare password


module.exports = {
  findByUsername: findByUsername,
  findById: findById,
  create: create
};
// // make sure that everytime we save a user, the password gets hashed
// userSchema.pre('save', function(done){
//   const user = this;
//
//   bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash){
//     if (err) {
//       console.log('Error hashing password', err);
//       return done(new Error('Error hashing password'));
//     }
//
//     user.password = hash;
//     done();
//   });
// });
//
//
// userSchema.methods.comparePassword = function(password) {
//   const user = this;
//
//   return new Promise(function(resolve){
//     bcrypt.compare(password, user.password, function(err, match){
//       if (err) {
//         console.log('Error comparing password', err);
//         return resolve(false);
//       }
//
//       resolve(match);
//     });
//   });
// };
//
// const User = mongoose.model('User', userSchema);
//
// module.exports = User;
