/**
 * Created by schott on 23.09.16.
 */
var torrentId = 'magnet:?xt=urn:btih:edbec04892199c188bb988a99f56aeac6c11a5aa&dn=pdfurl-guide.pdf&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io'

var client = new WebTorrent()

// HTML elements
var $body = document.body
var $progressBar = document.querySelector('#progressBar')
var $numPeers = document.querySelector('#numPeers')
var $downloaded = document.querySelector('#downloaded')
var $total = document.querySelector('#total')
var $remaining = document.querySelector('#remaining')
var $uploadSpeed = document.querySelector('#uploadSpeed')
var $downloadSpeed = document.querySelector('#downloadSpeed')

// Download the torrent
client.add(torrentId, function (torrent) {

    // Stream the first available file in files array in the browser
    // torrent.files[0].appendTo('#output')
    var file = torrent.files[0];

    file.getBlobURL(function (err, url) {
        if (err) throw err;
        var a = document.createElement('a');
        a.download = file.name;
        a.href = url;
        a.textContent = 'Download ' + file.name;
        document.body.appendChild(a)
    })
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