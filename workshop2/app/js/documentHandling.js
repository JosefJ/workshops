/**
 * Created by buben42 on 27.06.2017.
 */

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}

var holder = document.getElementById('holder');

holder.ondragover = function() {
    return false;
};

holder.ondragend = function() {
    return false;
};

holder.ondrop = function(event) {
    event.preventDefault();

    var file = event.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        var binary = event.target.result;
        bin = binary;
        var hash = sha3_256(binary);
        console.log('Resulting hash: '+hash);
        document.getElementById('hash').innerHTML = hash;
    };
    holder.innerHTML = file.name;

    reader.readAsBinaryString(file);
};