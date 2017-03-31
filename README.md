### Usage

[![Greenkeeper badge](https://badges.greenkeeper.io/Magnetjs/magnet-mongoose.svg)](https://greenkeeper.io/)
Basic
```
import magnet from 'magnet-core';
import Config from 'magnet-config';
import Logger from 'magnet-bunyan';
import Server from 'magnet-spdy';
import Session from 'magnet-session';
import Router from 'magnet-router';
import Mongoose from 'magnet-mongoose';

let app = await magnet([Config, Logger, Server, Session, Router, Mongoose]);
```

server/models/user.js
```
export function AmUser(app, mongoose) {
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    name: { type: String, required: true },
  });

  UserSchema.pre('save', async function save(next) {
    // Pre save process
  });

  UserSchema.post('save', async function save(next) {
    // Post save process
  });

  UserSchema.statics.someStaticMethod = async function someStaticMethod(email) {
    // Static process
  };

  return mongoose.model('User', UserSchema);
}
```
server/controllers/user.js
```
export default function user({ log, router, models }) {
  router

  .get('/users', async function (ctx, next) {
    try {
      ctx.body = await app.models.User.find().lean();
    } catch (err) {
      log.error(err);
      ctx.respond.internalServerError();
    }
  });
}
```
