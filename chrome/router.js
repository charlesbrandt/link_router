
//one, four, two, five, three

//test = [ "one", "two", "test", "alpha" ];
//test.sort()
//console.log(test)
//console.log( "Type Test:" );
//console.log( typeof test );

var menu_map = {};

//http://www.qodo.co.uk/blog/javascript-trim-leading-and-trailing-spaces/
// remove multiple, leading or trailing spaces 
function strip(s) { 
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," "); 
    s = s.replace(/\n /,"\n"); return s;
}

function generateMoment(info, tab) {
    //keeping this super simple
    //don't need to use a complete javascript clone of the moments module
    //just to make a moment entry
    //
    //that is one of the main points about moments... 
    //easy to create in many different ways

    //var menu_map = localStorage["menu_map"];
    //if (!menu_map) {
	//menu_map = {};
    //};

    var buffer = localStorage["moments"];
    if (!buffer) {
	buffer = "";
    };

    var entry = "";

    //http://momentjs.com/
    entry += "*" + moment().format("YYYY.MM.DD HH:mm:ss") + " ";
    //var now = new Date();
    //entry += "*" + now.format("Y.m.d H:i:s") + " ";
    entry += menu_map[info.menuItemId] + "\n";
    entry += info.linkUrl + "\n\n";
    console.log(entry)
    
    // this puts entry at the end:
    //buffer += entry;
    //localStorage["moments"] = buffer;

    // this puts entry at the beginning:
    entry += buffer;
    localStorage["moments"] = entry;

    restore_moments();
}

function updateMenu() {
  // could loop over menu_map here for remove
  // but removeAll should be sufficient:
  chrome.contextMenus.removeAll();
  //clear global map
  menu_map = {};

  var tag_string = localStorage["tags"];

  var tags_pre;
  if (tag_string) {
    tags_pre = tag_string.split(',');
  }
  else {
    //want to make sure something shows up initially,
    //so users know the extension was actually installed
    tags_pre = "change,these,in,extension,options".split(',');
  }
  
  //var tags_pre = tag_string.split(',');
  //console.log("router tags_pre: ");
  //console.log(typeof tags_pre);
  //console.log(tags_pre);
  
  var tags = [];
  //strip any extra whitespace:
  if (tags_pre) {
    for (var i = 0; i < tags_pre.length; i++) {
      var tag = tags_pre[i];
      //console.log("Checking tag: " + tag)
      if (tag) {
        tags.push(strip(tag));
      };
      
    }
  };
  //console.log("router Tags: ");
  //console.log(typeof tags);
  
  if (tags) {
    //this will alphabetize the tags, but that doesn't seem to be ideal
    //better to have highest priority items first
    //tags.sort();
    
    //console.log(tags);
    
    for (var i = 0; i < tags.length; i++) {
      var tag = tags[i];
      var title = tag;
      //making context options available for all contexts is tricky...
      //easy to think you're clicking on a link when you're not
      //var id = chrome.contextMenus.create({"title": title, "onclick": generateMoment, "contexts": ["link","page","selection","image","video","audio"]});
      var id = chrome.contextMenus.create({"title": title, "onclick": generateMoment, "contexts": ["link"]});
      //console.log("'" + tag + "' item:" + id);
      menu_map[id] = tag;
      //console.log(menu_map);
    }
    //localStorage["menu_map"] = menu_map;
  };
}

updateMenu();
