/**
 * Created by schott on 25.09.16.
 */
function setTorrentLink(){
    var torrentLink = document.forms["download-form"]["torrentlink"].value;
    return checkHTMLStorage(setSessionStorage,'torrent-dl',torrentLink)
}

var client = new WebTorrent();
function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    // files is a FileList of File objects.
    var files = evt.dataTransfer.files; // FileList object.
    client.seed(files, function (torrent) {
        console.log('Client is seeding:', torrent.infoHash);
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<li>Seeding: <strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes',
                '</li>');
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        document.getElementById('uri').href = torrent.magnetURI;
        document.getElementById('uri').style.display = "inline-block";

        // Setup connection updates
        setInterval(onUpload, 300);

        function onUpload(){
            // Peers
            document.getElementById("num-peers")
                .innerHTML = '# Peers: ' + torrent.numPeers;
            // Upload speed
            document.getElementById("upload-speed")
                .innerHTML = 'Upload Speed: ' + prettyBytes(torrent.uploadSpeed) + '/s'
        }
    });
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Human readable bytes util
function prettyBytes(num) {
    var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    unit = units[exponent]
    return (neg ? '-' : '') + num + ' ' + unit
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);