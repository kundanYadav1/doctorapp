const http = require('http')
const url = require('url')
const external = require('./helper')

const server = http.createServer((req, res) => {
    const path = req.url
    console.log(path)
    console.log(url.parse(path, true))
    const { query } = url.parse(path, true)
    if (query.id == '1') {
        res.writeHead(200)
        res.end(external.one())
    } else if (query.id == '2') {
        res.writeHead(200)
        res.end(external.two())
    } else {
        res.writeHead(404)
        res.end(external.notfound())
    }
})

server.listen(8000, () => {
    console.log('Started Nims server')
})
