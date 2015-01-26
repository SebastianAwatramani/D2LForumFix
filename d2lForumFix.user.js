
var rows, excludedClasses; //init

rows = document.getElementsByTagName("TR"); //D2L also uses tables for everything, including layout, which they shouldn't but they do.  Get all table rows
excludedClasses = ["d_gact", "dsearch", "dsearch_header", "d_FG", "d_t"]; //Array to hold classes with TRs we don't want to target

for (var i = 0; i < rows.length; i++) { 
	var anchor, childHeader, count, rowsGrandParent; //init
	rowsGrandParent = rows[i].parentNode.parentNode; //Gets the grandparent of each row so we can check if the GP is one of the excluded classes above, because those are not the TRs we're looking for
	if (rows[i].className == "" ||  rows[i].className == " d_dbold") { //The TRs we're looking for either have no class or their class is d_dbold (if it's an unread message)
		if (excludedClasses.indexOf(rowsGrandParent.className) > -1) { //Check the array for excluded classes
			continue; //if so then end this iteration
		} else {
			count = countDgle(rows[i]); //Set count to determine how much to indent the messages
			rows[i].id = "trRow" + i; //Sets an id for the TR so we can select the child table header
			childHeader = document.querySelector("#trRow" + i + " > th:first-of-type"); //Selects the child table header
			if(!childHeader) { //If it doesn't have a child table header then it's not a message and we don't need it so...
				rows[i].id = ""; //remove the id
				continue; //End this iteration
			} else {
				childHeader.id = "childHeader" + i; //Set an ID for the table header so we can target the anchor
				anchor = document.querySelector("#childHeader" + i + " > a:first-of-type"); //Target the anchor
				if(anchor) { //Makes sure there is an anchor, otherwise we're in the wrong table header
					anchor.style.marginLeft = count + "px"; //Indents
					anchor.style.paddingLeft = "10px";
					if (count > 0) { //Checks if it's the top level message, if it's not then it adds a border and some padding to the subject to make it easier to follow
						anchor.style.borderLeft = "2px solid grey";
						anchor.style.borderRadius = "10px 0px 0px 10px";
					} else if (count === 0) { //Different border for the top level message
						anchor.style.borderLeft = "2px solid grey";
           				anchor.style.borderTopLeftRadius = "4px 0px 0px 4px";
					}
				}
			}
		}
	}
}

function countDgle(row) { //D2l uses a poorly named TH called "d_g_l_e" to indent the names of who sent the message (rather than, you know, CSS).  This function counts how many times this TH exists in order to determine how far to indent
	let count = 0; //init
	for (var i = 0; i < row.children.length; i++) { //Goes through all the children of the row to count the headers
		if (row.children[i].className == "d_g_l_e") { //Checks each class to see if it matches
			count++;
		} 
	} return (count -1) * 20; //returns the number of pixels to indent.  E.g. one message deep = 20 px, two messages = 40px etc.  Change the multiplier if you need a different amount for your screen resulution
}
