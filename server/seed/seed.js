const seeder = require('mongoose-seed')
const dotenv = require('dotenv')
const config = require('config')
dotenv.config()

const data = require('./data.json')

seeder.connect(config.get('MONGO_URL'), () => {
	seeder.loadModels(['src/models/User'])

	seeder.clearModels(['User'], () => {
		seeder.populateModels(data, () => {
			seeder.disconnect()
		})
	})
})