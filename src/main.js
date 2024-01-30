import express from 'express'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

import config from './config/globals'
// import api from './api'
// import logger from './config/logger'
import indexRoutes from './routes'

// creating express server
const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false
  })
)

// APIs
app.use('/api', indexRoutes)
app.get('/', async(req, res) => {
  const result = listEndpoints(app).map((c) => {
    return {
      path: c.path,
      methods: c.methods.join(',')
    }
  })
  res.json(result)
})

// healthcheck endpoint
app.get('/health-check', (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: 'Health Check Success' })
})

// Invalid endpoint error handling
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

// list endpoints
// logger.info('-----------------------------------------')
// listEndpoints(app).forEach((c) => {
//   logger.info(`${c.methods.join(',')} -> ${c.path}`)
// })
// logger.info('-----------------------------------------')

// start app server
app.listen(config.app.port, function() {
  console.log(
    `Proof Generation API server has started on port ${config.app.port}`
  )
})
