const http=require('http')
const server=http.createServer((req,res)=>{
    res.end("Hello Form the Nims University")
})
server.listen(8000,()=>{
    console.log("Sarted Nims Server")
})