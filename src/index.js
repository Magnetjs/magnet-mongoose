import Base from 'magnet-core/dist/base'
import mongoose from 'mongoose'
import bluebird from 'bluebird'

export default class Mongoose extends Base {
  async setup () {
    try {
      await new Promise((resolve, reject) => {
        const config = this.app.config.mongoose

        this.app.mongoose = mongoose.connect(`mongodb://${config.host}/${config.database}`)
        this.app.mongoose.Promise = bluebird

        const db = this.app.mongoose.connection
        db.on('error', function listenError (err) {
          reject(err)
        })
        db.once('open', function listenOpen (callback) {
          resolve(true)
        })
      })

      if (!this.app.models) {
        this.app.models = {}
      }
    } catch (err) {
      this.app.log.error(err)
    }
  }
}
