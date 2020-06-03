# NodeJS REST API + TypeScripts

Hanya untuk belajar :) Have Fun

## Package
- Typescripts
- Nodemon
- ExpressJS
- Mongoose
- Bcrypt
- JSON Web Token

## Install
```bash
yarn install
```

## Development
```bash
yarn tsc
yard dev
```

## Production

- Ada 2 perbedaan ketika install package :
    - `yarn install` untuk development dan compile. Size `node_modules` -+ 81MB (Check 2/6/2020)
    - `yarn install --prod=true` untuk production. Size `node_modules` -+ 26MB (Check 2/6/2020)
- Jika install menggunakan `yarn install --prod=true`, maka semua package dev dependency akan di lewati, tetapi tidak bisa compile, karena untuk compile, butuh semua paket dev dan dependency


## Reference
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken#readme)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
- Typescript Tutorial :
    - https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
    - https://medium.com/@tomanagle/strongly-typed-models-with-mongoose-and-typescript-7bc2f7197722
    - https://github.com/tomanagle/Mongoose-TypeScript-example
    - https://github.com/microsoft/TypeScript-Node-Starter