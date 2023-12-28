const { app } = require('./app')
const { connectToDB } = require('./config/database')

let server
let port = process.env.PORT || 9000

async function main() {
  await connectToDB()

  server = await app.listen(port)
  console.log(` \n 🚀 Server listening on port ${port}`)
}

main()

module.exports = { server }
