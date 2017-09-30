import { Module } from 'magnet-core/module'
import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'

export default class MagnetMongoose extends Module {
  init () {
    this.moduleName = 'mongoose'
    this.defaultConfig = __dirname
  }

  async setup () {
    try {
      await new Promise((resolve, reject) => {
        const { uri, ...config } = this.config
        this.app.mongoose = mongoose.connect(
          uri,
          config
        )
        this.app.mongoose.Promise = bluebird

        const db = this.app.mongoose.connection
        db.on('error', function listenError (err) {
          reject(err)
        })
        db.once('open', function listenOpen (callback) {
          resolve()
        })
      })
    } catch (err) {
      this.app.log.error(err)
    }
  }
}
