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
      const { uri, ...config } = this.config
      mongoose.Promise = bluebird
      this.insert(await mongoose.connect(
        uri,
        config
      ))
    } catch (err) {
      this.app.log.error(err)
    }
  }
}
