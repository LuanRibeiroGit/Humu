import express from 'express'
import transferRoute from './routes/transfer.route'

const app = express()
app.use(express.json())

app.use('/', transferRoute)


app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
