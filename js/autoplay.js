window.addEventListener('load', function () {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var source = audioCtx.createBufferSource();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'audio-autoplay.wav');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function (r) {
        audioCtx.decodeAudioData(
                xhr.response, 
                function (buffer) {
                    source.buffer = buffer;
                    source.connect(audioCtx.destination);
                    source.loop = false;
                });
        source.start(0);
    });
    xhr.send();
});