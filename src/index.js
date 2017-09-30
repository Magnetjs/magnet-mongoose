import { Module } from 'magnet-core/module'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

export default class MagnetMongoose extends Module {
  init () {
    this.moduleName = 'mongoose'
    this.defaultConfig = __dirname
  }

  async setup () {
    try {
      await new Promise((resolve, reject) => {
        this.app.mongoose = mongoose.connect(`mongodb://${this.config.host}/${this.config.database}`)
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
