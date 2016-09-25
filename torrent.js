/**
 * Created by schott on 23.09.16.
 */
var torrentId = getSessionStorage("torrent-dl");
var client = new WebTorrent()
var totalBytes = 0;


// Download the torrent
client.add(torrentId, function (torrent) {
    client.on('torrent', function (torrent) {
        var id = 0;
        // Display all available files while they are being downloaded
        torrent.files.forEach(function (file) {
            // Count bytes
            totalBytes += file.length;
            var a = document.createElement('a');
            a.download = file.name;
            a.href = '#';
            a.onclick = downloadFile(id);
            a.className += " list-group-item disabled";
            a.textContent = file.name;
            document.getElementById("file").appendChild(a);
            id++;
        });
        // Create download link
        function downloadFile(id) {
            torrent.files[id].getBlobURL(function (err, url) {
                if (err) throw err;
                var link = document.getElementsByTagName("a").item(id);
                link.href = url;
            });
        }
    });
    setInterval(onProgress, 300);

    function onProgress() {
        var downloaded = 'Download speed:' + prettyBytes(torrent.downloadSpeed) + '/s'

        // Remaining time
        var remaining;

        // Check if completed
        if (torrent.done) {
            remaining = 'Done.';
            // TODO: keep this, continue seeding?
            document.getElementById("summary")
             .style.display="none";
            document.getElementById("success-box")
                .style.display = "inline-block";
            document.getElementById("success-box")
                .firstElementChild
                .innerHTML = "<strong>Done! </strong>" +
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
        if (torrent.uploadSpeed > 0) {
            document.getElementById("upload")
                .innerHTML = 'Upload Speed: ' + prettyBytes(torrent.uploadSpeed) + '/s'
        }
        else {
            document.getElementById("upload")
                .innerHTML = '';
        }
        // Update download links once ready
        checkCompletion();
        function checkCompletion() {
            var as = document.getElementsByTagName("a");
            var i;
            for (i = 0; i < as.length; i++) {
                if (as[i].href.slice(-1) != "#" && as[i].classList.contains("disabled")) {
                    as[i].className = " list-group-item";
                    as[i].innerHTML += '<span class="badge"><i class="fa fa-check" aria-hidden="true"></i></span>';
                }
            }
        }
    }
});
// Fetches GET variables from URL
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
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