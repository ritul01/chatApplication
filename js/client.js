const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const msgInp=document.getElementById('msgInput')
const msgContainer=document.querySelector(".container")
var audio=new Audio('tone.mp3');
const append=(message,position)=>{
    const msgElement=document.createElement('div');
    msgElement.innerText=message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=msgInp.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    msgInp.value='';
})

const name=prompt("Enter your name to join ");
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})