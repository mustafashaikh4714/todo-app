const mongoose = require('mongoose')
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log('\n✔️✔️  DB Connected')
  } catch (error) {
    console.log('DB Error:', error)
  }
}

module.exports = { connectToDB }
