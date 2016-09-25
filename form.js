/**
 * Created by schott on 25.09.16.
 */
function setTorrentLink(){
    var torrentLink = document.forms["download-form"]["torrentlink"].value;
    return checkHTMLStorage(setSessionStorage,'torrent-dl',torrentLink)
}

var dragDrop = new dragDrop();
// When user drops files on the browser, create a new torrent and start seeding it!
dragDrop('#dropbox', function (files) {
    alert(files);
    client.seed(files, function (torrent) {
        console.log('Client is seeding:', torrent.infoHash)
    });
});

function seedFiles(){
    alert("Called seedFiles");
    return false;
}