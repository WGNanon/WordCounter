// This part is for gdocs only, because they use iframes
var isTop = true;
chrome.runtime.onMessage.addListener(function(details) {
    handle_gdocs(details);
});

switch(window.location.hostname) {
    case "docs.google.com":
        handle_google();
        break;
    case "rentry.co":
    case "rentry.org":
        handle_rentry();
        break;
    case "pastebin.com":
        handle_pastebin();
        break;
}

function get_text(el) {
    ret = "";
    var length;
    length = el.childNodes.length;

    for(var i = 0; i < length; i++) {
        var node = el.childNodes[i];
        if(node.nodeType != 8) {
            ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
        }
    }
    return ret;
}

function get_count(classname) {
    var el = document.getElementsByClassName(classname)[0];
    var words = get_text(el);
    return words.split(/\s+/).length;
}

function handle_google() {
    var count = get_count("doc-content");
    document.getElementById('title').innerText += " - " + count + " words";
}

function handle_gdocs(count) {
    document.title += " - " + count + " words";
}

function handle_rentry() {
    var count = get_count("entry-text");
    var head = document.createElement('h5');
    head.innerText = count + " words";
    document.getElementsByTagName('Article')[0].insertBefore(head, document.getElementsByTagName('Article')[0].firstChild);
}

function handle_pastebin() {
    var count = get_count("text");
    console.log(count);
    document.getElementsByClassName("info-top")[0].firstElementChild.innerText += " - " + count + " words";
}