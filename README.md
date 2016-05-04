# nodeON-crypto

> A Collection of crypto helper methods.

[![Build Status](https://secure.travis-ci.org/thanpolas/nodeOn-crypto.png?branch=master)](http://travis-ci.org/thanpolas/nodeOn-crypto)

## Install

Install the module using NPM:

```
npm install nodeon-crypto --save
```

## <a name='TOC'>Table of Contents</a>

1. [API](#api)
    1. [Hash a string using bcrypt](#hash)
    1. [Verify a hashed string match](#hashVerify)
    1. [Set a salt string](#setSalt)

## API

### <a name='hash'>Hash a string using bcrypt</a>

> ### helpers.hash(text, optOpts, done)
>
>    * **text** `string` The string to hash.
>    * **optOpts** `Object=` Optionally define options.
>    * **done** `Function()` Node.js style callback.
>

Hashes a string using the [bcrypt library](https://github.com/ncb000gt/node.bcrypt.js/).

Bcrypt will only hash strings up to 72 chars long. If the passed string is longer than that the `helpers.hash` method will fail with a warning. To ignore that behavior set the `ignoreLimit` option to true:

```js

helpers.hash(longString, {ignoreLimit: true}, function(err, res) {
    // Ignoring limit will not create an error
    expect(err).to.be.null;
    expect(res).to.be.a('string');
});

```

**[[⬆]](#TOC)**


### <a name='hashVerify'>Verify a hashed string match</a>

> ### helpers.hashVerify(hash, text, done)
>
>    * **hash** `string` The hashed string.
>    * **text** `string` The string to test.
>    * **done** `Function(boolean)` Callback with a single argument, boolean.
>

Tests if the given string matches the provided hash.

**[[⬆]](#TOC)**

### <a name='setSalt'>Set a salt string</a>

> ### crypto.setSalt(salt)
>
>    * **salt** `string` Any string.

Use it once to set a salt for the crypto functions.

**[[⬆]](#TOC)**

## Release History

- **v1.0.0**, *04 May 2016*
    - Big Bang

## License

Copyright Thanasis Polychronakis. Licensed under the MIT license.
