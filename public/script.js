const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
});

const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream);
});

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
});

socket.emit('join-room', ROOM_ID, 10);

socket.on('user-connected', userId => {
  console.log('User connected: ' + userId)
});

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loademetadata', () => {
    video.play()
  });
  videoGrid.append(video)
}
