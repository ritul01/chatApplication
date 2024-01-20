const socket=io('http://localhost:8000')

// get DOM elements in the respective js variables
const form=document.getElementById('send-container');
const msgInp=document.getElementById('msgInput')
const msgContainer=document.querySelector(".container")
// Audio that will play on recieving message
var audio=new Audio('tone.mp3');

// function ehich will append event info to the container
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

// if the form get submitted then send message to the server
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=msgInp.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    msgInp.value='';
})

//ask new user for their name and let the server know
const name=prompt("Enter your name to join ");
socket.emit('new-user-joined',name);

// if new uswe joins, recievetheir name from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})
// if server send a message , recieve it
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left')
})
// if a user leaves the chat , apaaend the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})