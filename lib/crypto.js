/*
 * nodeON-crypto
 *
 * A Collection of crypto helper methods.
 * https://github.com/thanpolas/nodeon-crypto
 *
 * Copyright Thanasis Polychronakis
 * Licensed under the MIT license.
 */

var bcrypt = require('bcrypt');
var __ = require('lodash');

var noop = function() {};

/**
 * @fileOverview crypto Base.
 */
var crypto = module.exports = {};

/** @type {string} Internal store for salt. */
crypto.__salt = '';

/**
 * Set the Salt for crypto functions.
 *
 * @param {string} salt The salt.
 */
crypto.setSalt = function (salt) {
  crypto.__salt = salt;
};

/**
 * Salt a string.
 *
 * @param  {string} src The string we want to salt.
 * @return {string} The string salted.
 */
crypto.salt = function(src) {
  return src + crypto.__salt;
};

/**
 * Create a salted hash of the provided string.
 *
 * @param {string} src The string we want to hash.
 * @param {Object|Function(Error=, string=)=} optOpts Options or callback.
 * @param {Function(Error=, string=)=} optDone Callback.
 */
crypto.hash = function(src, optOpts, optDone) {

  var opts = {};
  var done = noop;

  if (__.isObject(optOpts)) {
    opts = optOpts;
  }
  if (__.isFunction(optOpts)) {
    done = optOpts;
  }
  if (__.isFunction(optDone)) {
    done = optDone;
  }

  // bcrypt supports strings up to 72 chars long
  // @see http://security.stackexchange.com/questions/39849/does-bcrypt-have-a-maximum-password-length
  // @see https://github.com/ncb000gt/node.bcrypt.js/issues/325
  if (src.length > 71 && !opts.ignoreLimit) {
    var err = new Error('bcrypt does not support strings longer than 72 characters');
    done(err);
    return;
  }

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      done(err);
      return;
    }
    bcrypt.hash(src, salt, done);
  });
};

/**
 * Check if a string matches a hash.
 *
 * @param {string} hash The encrypted hash.
 * @param {string} src The plain text string to verify.
 * @param {Object|Function(boolean)=} optOpts Options or callback.
 * @param {Function(boolean)=} optDone callback, first arg will always be bool.
 */
crypto.hashVerify = function(hash, src, optOpts, optDone) {
  var opts = {};
  var done = noop;

  if (__.isObject(optOpts)) {
    opts = optOpts;
  }
  if (__.isFunction(optOpts)) {
    done = optOpts;
  }
  if (__.isFunction(optDone)) {
    done = optDone;
  }

  bcrypt.compare(src, hash, function(err, res) {
    if (err) {
      done(false);
    } else {
      done(res);
    }
  });
};
