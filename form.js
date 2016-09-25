/**
 * Created by schott on 25.09.16.
 */
function setTorrentLink(){
    var torrentLink = document.forms["download-form"]["torrentlink"].value;
    return checkHTMLStorage(setSessionStorage,'torrent-dl',torrentLink)
}
