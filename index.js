const express = require('express')

const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())



const clientOrders = []

const checkUserId = (request, response, next) =>{
    const {id} = request.params

    const index = clientOrders.findIndex(user => user.id === id)

    if(index<0){
        return response.status(404).json({message: "user not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.post('/users', (request,response)=>{

    const{order, clientName, price, status} = request.body
    const clientOrder = {id: uuid.v4(), order, clientName, price, status}
    clientOrders.push(clientOrder)
    return response.status(201).json(clientOrder)
})

app.get('/users', (request, response)=>{
    return response.json(clientOrders)
})

app.put('/users/:id', checkUserId, (request, response)=>{

    const {order, clientName, price, status} = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = {id, order, clientName, price, status}

    clientOrders[index]= updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response)=>{

    const index = request.userIndex

    clientOrders.splice(index,1)

    return response.status(204).json()
})

app.get('/users/:id', checkUserId, (request, response)=>{

    const index = request.userIndex

    const clientOrder=clientOrders[index]

    return response.json(clientOrder)
})

app.patch('/users/:id', checkUserId, (request, response)=>{

    const index = request.userIndex

    clientOrders[index].status="Pronto"

    return response.json(clientOrders[index])

})


app.listen(port, ()=>{
    console.log(`server started on port ${port}np`)
})