const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    const path = req.url
    console.log(path)
    const { query } = url.parse(path, true)
    console.log(query)
    res.writeHead(200)
    res.end(`Sent id is ${query.id}`)
})

server.listen(8000, () => {
    console.log('Started Nims server')
})
