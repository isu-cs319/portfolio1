/**
 * Created by schott on 23.09.16.
 */
var torrentId = 'magnet:?xt=urn:btih:c4809ad1e655399b720b9c6d867662db8cee8660&dn=F%C3%BCr+Mama&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io';

var client = new WebTorrent()
var totalBytes = 0;

// Download the torrent
client.add(torrentId, function (torrent) {

    // Stream the first available file in files array in the browser
    // torrent.files[0].appendTo('#output')
    //var file = torrent.files[0];

   /* torrent.on('metadata', function () {
        alert("Metadata ready!");
        torrent.files.forEach(function(file){
            alert(file.name);
        })
    });*/

    torrent.files.forEach(function(file){
        // Count bytes
        totalBytes += file.length;
        file.getBlobURL(function (err, url) {
            if (err) throw err;
            var a = document.createElement('a');
            a.download = file.name;
            a.href = url;
            a.className += " list-group-item";
            a.textContent = 'Download ' + file.name;
            document.getElementById("file").appendChild(a);
        });
    });
    setInterval(onProgress, 300);

    function onProgress () {
        var downloaded = 'Download speed:' + prettyBytes(torrent.downloadSpeed) + '/s'

        // Remaining time
        var remaining;

        // Check if completed
        if (torrent.done) {
            remaining = 'Done.';
            document.getElementById("summary")
                .style.display="none";
            document.getElementById("success-box")
                .style.display="inline-block";
            document.getElementById("success-box")
                .firstElementChild
                .innerHTML="<strong>Done! </strong>" +
                " Downloaded " + torrent.files.length +
                    " files with total size " + prettyBytes(totalBytes);
        } else {
            remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize();
            remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.';
        }

        // Remaining time
        document.getElementById("time")
            .innerHTML = remaining;

        // Speed rates
        document.getElementById("download")
            .innerHTML = downloaded;

        // Upload Speed
        if (torrent.uploadSpeed > 0){
            document.getElementById("upload")
                .innerHTML = 'Upload Speed: '+ prettyBytes(torrent.uploadSpeed) + '/s'
        }
        else{
            document.getElementById("upload")
                .innerHTML = '';
        }
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
});




/* Too unstable, commented out for now.
    // Trigger statistics refresh
    torrent.on('done', onDone)
    setInterval(onProgress, 500)
    onProgress()

    // Statistics
    function onProgress () {
        // Peers
        $numPeers.innerHTML = torrent.numPeers + ' peers'

        // Progress
        var percent = Math.round(torrent.progress * 100 * 100) / 100
        $progressBar.style.width = percent + '%'
        $downloaded.innerHTML = prettyBytes(torrent.downloaded)
        $total.innerHTML = prettyBytes(torrent.length)

        // Remaining time
        var remaining
        if (torrent.done) {
            remaining = 'Done.'
        } else {
            remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
            remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
        }
        $remaining.innerHTML = remaining

        // Speed rates
        $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
        $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
    }
    function onDone () {
        $body.className += ' is-seed'
        onProgress()
    }
})

// Human readable bytes util
function prettyBytes(num) {
    var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    unit = units[exponent]
    return (neg ? '-' : '') + num + ' ' + unit
}*/