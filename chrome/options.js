//one, four, two, five, three

// Saves options to localStorage.
function save_options() {
    var select = document.getElementById("tags");
    //console.log("item: " + select);
    
    var tags = select.value;
    //console.log(tags);
    //console.log(typeof tags);
    
    localStorage["tags"] = tags;
    
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
	status.innerHTML = "";
    }, 750);
    
    updateMenu();
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    //console.log("restore_options called")
    var tag_options = localStorage["tags"];
    //console.log("tag_options: " + tag_options)
    if (!tag_options) {
	return;
    }
    var select = document.getElementById("tags");
    //console.log("setting select to: " + tag_options );
    select.value = tag_options;
}

function save_moments() {
    var select = document.getElementById("entries");
    //console.log("item: " + select);
    
    var entries = select.value;
    console.log(entries);
    console.log(typeof entries);
    
    localStorage["moments"] = entries;
    
    // Update status to let user know options were saved.
    var status = document.getElementById("entrystatus");
    status.innerHTML = "Entries Saved.";
    setTimeout(function() {
	status.innerHTML = "";
    }, 750);
}

function restore_moments() {
    //console.log("restore_moments called")
    var moment_options = localStorage["moments"];
    //console.log("moment_options: " + moment_options)
    if (!moment_options) {
	return;
    }
    var select = document.getElementById("entries");
    //console.log("setting select to: " + moment_options );
    select.value = moment_options;
}

function update_options(e) {
    if (!e) { e = window.event; }
    console.log("update_options called");
}

function update_time() {
    document.getElementById("time").innerHTML = moment().format('YYYY.MM.DD HH:mm:ss');
    //console.log(moment().format('hh:mm:ss a'));
}

window.setInterval(function(){update_time()}, 1000);

//document.addEventListener('DOMContentReady', console.log("CONTENT READY"));
document.addEventListener('DOMContentReady', restore_options());
document.querySelector('#save').addEventListener('click', save_options);

document.addEventListener('DOMContentReady', restore_moments());
document.querySelector('#entrysave').addEventListener('click', save_moments);

//trying to trigger the update after a storage event...
//can't seem to get it: 
//document.addEventListener('storage', update_options, false);
//http://diveintohtml5.info/storage.html
//http://dev.w3.org/html5/webstorage/#storage-0

//save_options();
