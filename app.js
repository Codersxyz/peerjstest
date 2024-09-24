const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const peerIdInput = document.getElementById('peerIdInput');
const callButton = document.getElementById('callButton');

const peer = new Peer(); // Create a new PeerJS connection

// Get local video stream
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        localVideo.srcObject = stream;

        // Listen for incoming calls
        peer.on('call', call => {
            call.answer(stream); // Answer the call with our stream
            call.on('stream', remoteStream => {
                remoteVideo.srcObject = remoteStream; // Show stream in remote video
            });
        });

        callButton.onclick = () => {
            const peerId = peerIdInput.value;
            const call = peer.call(peerId, stream); // Call the specified peer
            call.on('stream', remoteStream => {
                remoteVideo.srcObject = remoteStream; // Show stream in remote video
            });
        };
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

// Display peer ID
peer.on('open', id => {
    console.log('My peer ID is: ' + id);
    peerIdInput.value = id; // Optionally set the input field with this peer ID
});
