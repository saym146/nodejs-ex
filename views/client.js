const connection = new WebSocket("ws://localhost:6551");
const div = document.getElementById('divTextMsg');
const msg = document.getElementById('txtMessage');

connection.addEventListener('open', () => {
    console.log('Chat server Connected');
});
connection.addEventListener('message', e => {
    let p = document.createElement('p');
    p.textContent = e.data;
    div.appendChild(p);
});

function send(data) {
    if (connection.readyState === WebSocket.OPEN) {
        connection.send(data);
    }
    else {
        throw 'Not Connected';
    }
}

msg.addEventListener('keydown', e=> {
    let kc = e.which || e.keyCode;
    if (kc === 13) {
        send(msg.value);
        msg.value = '';
    }
});