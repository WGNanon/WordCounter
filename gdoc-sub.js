if (!window.isTop) { // true  or  undefined
    var data = get_count("doc-content");
    var header = document.createElement('h5');
    header.innerText = data + " words";
    document.getElementsByClassName("doc-content")[0].insertBefore(header, document.getElementsByClassName("doc-content")[0].firstChild);

    // Send message to top frame, for example:
    chrome.runtime.sendMessage({sendBack:true, data:data});
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