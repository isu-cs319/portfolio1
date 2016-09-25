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
    });
    // files is a FileList of File objects. List some properties.
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);