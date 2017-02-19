navigator.mediaDevices.getUserMedia({ audio: false, video: true }).then(function(stream) {

  var peer = new SimplePeer({
    initiator:location.hash ==='#init',
    trickle:false,
    stream:stream
  })

  peer.on('signal', function(data){
    document.getElementById('yourId').value = JSON.stringify(data)
  });

    console.log(document.getElementById("connect"))
    document.getElementById('connect').addEventListener('click', function(){
      var otherid2 = document.getElementById('otherId').value
      console.log(otherid2)
      var otherId = JSON.parse(document.getElementById('otherId').value)

      peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', function(){
      var yourMessage = document.getElementById('yourMessage').value
      peer.send(yourMessage)
    })
    peer.on('data', function(data){
      document.getElementById('messages').textContent += data +'\n'
    })

    peer.on('stream', function(stream){
      var video = document.createElement('video')
      document.body.appendChild(video)

      video.src = window.URL.createObjectURL(stream)
      video.play()
    })



}).catch(function(err) {
  /* handle the error */
});
