import Base from 'magnet-core/base'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

export default class Mongoose extends Base {
  init () {
    this.moduleName = 'magnet_folder_loader'
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
