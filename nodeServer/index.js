const io=require('socket.io')(8000)
const users={}

io.on('connection',socket=>{
    // if any new user joined,let other user connected to the server know!
    socket.on('new-user-joined',name=>{
        // console.log("new user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //if someone sends the message,broadcast it to other people
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]})
    // if someone leaves the chat , let other know
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})