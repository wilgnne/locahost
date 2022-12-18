import app from './app'

const PORT = process.env.PORT !== undefined ? parseInt(process.env.PORT) : 3000

app.listen(PORT, '0.0.0.0', 0, () => console.log(`Server listen on http://localhost:${PORT}`))
