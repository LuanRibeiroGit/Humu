import express from 'express'
import transferRoute from './routes/transfer.route'
import tokenRoute from './routes/token.route'

const app = express()
app.use(express.json())

app.use('/', transferRoute, tokenRoute)


app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
