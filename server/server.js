const app = require('./app/app')

const port =process.env.PORT || 5000


app.listen(port, () => console.log(`99 pro server listening on ${port}`))