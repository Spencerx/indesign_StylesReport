// Returns a sequential list of paragraph styles in use, for each paragraph
// as well as either the first 20 characters of the paragraph text 
// or the full paragraph if it is less than 20 chars

(function() {
if (app.documents.length > 0) {
processDocument(app.documents[0]);
}

function processDocument(aDoc) {
var curr, last = [], len = 0;
var page = aDoc.pages[0];
var myDoc = app.activeDocument;
var myStory = myDoc.stories.item(0);
var myParas = myStory.paragraphs;
var arr = [];
for (var k = 0; myParas.length > k; k++) {
  var currStyle = myParas[k].appliedParagraphStyle.name;
  var charCount = myParas[k].characters.length;
  if (charCount < 20)
  {
    var currText = myParas[k].contents;
  } else {
    var myStartCharacter = myParas[k].characters.item(0);
    var myEndCharacter = myParas[k].characters.item(20);
    var currText = myParas[k].texts.itemByRange(myStartCharacter, myEndCharacter).contents;
  }
  var value = currStyle + " : " + currText;
  arr.push(value);
}

var myTextFile = new File(aDoc.filePath+"/StylesReport.txt");
myTextFile.open("w");
if (!myTextFile.open("w"))  
    {  
       alert ("Uh-oh something went wrong :(");  
       exit(0);  
    }
for (var k = 0; arr.length > k; k++) {
  myTextFile.seek(0, 2);
  myTextFile.write(arr[k] + "\n");
}
myTextFile.close(); 

alert ("Your Paragraph Styles Report is complete! You can check it out here: "+aDoc.filePath+"/StylesReport.txt");

}
}())

