<script>
var d=document, userRole;

$(d).ready(function(){
	loader();
	getGroupID()
});

function loader(){
	/* Page Header (edit & new pages) */
	if(parseInt("{!id}") > 0)
		$(".rbs_PageTopicWide").first().html('UPDATE BIR AUTHORIZED USER');
	else
		$(".rbs_PageTopicWide").first().html('NEW BIR AUTHORIZED USER');
		
	$(":submit[value=' Save ']").val("Activate");
	formatTIN("tax_identification_n");
}

function getGroupID(){
	"groupID".c_showHide(false);

	rbf_setFieldValue("groupID", "");
	var locId = parseInt(rbf_getFieldValue("locationId"));
	if(locId > 0){
		var qry = "SELECT id FROM $GROUP WHERE locationId = "+locId;
		rbf_selectQuery(qry, 1, function(data){
			var groupID = parseInt(data[0][0]);
			if(groupID > 0) rbf_setFieldValue("groupID", groupID);
		});
	}
}
function formatTIN(elemID){	
	var inputElem = $("#"+elemID);	
	//Bind KeyUp event
	inputElem.keyup(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
	});
	inputElem.focusout(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		if (charCode != 8 && charCode != 37 && charCode != 39 && charCode != 46 ) $(this).val( rbf_formatUsingMask( $(this).val() , "###-###-###-###") );
		//exclude backspace, delete, left, and right arrows
	});
	//Bind keypress events
	inputElem.attr({
		"onkeydown":"return c_numerical(event,false);",
		"onkeypress":"return c_numerical(event,false);"
	});
}

function c_alphaspec(evt) {/*
	Function: c_alphaspec
	Allows only alpha input & cancels out numerical characters onkeypress/up/down
	Created At: 12-11-2012
	Usage: return c_alphaspec(event); on events onkeypress/up/down */
	evt = (evt) ? evt : event;
	var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0)),
	character = String.fromCharCode(charCode);

	if (character == "-") return true;

	if (charCode == 8 || charCode == 9 || charCode == 13 || charCode == 46 || charCode == 37 || charCode == 39 ||
	charCode == 32) return true;

	if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
		return false;
	} else {
		return true;
	}
}
function c_numerical(evt,deci) {/*
	Function: c_numerical
	Allows only numerical input & cancels out alpha & special characters onkeypress/up/down
	Created At: 06-09-2011
	Usage: return c_numerical(event,true/false); on events onkeypress/up/down
		- set the deci parameter to true to allow decimal points */
	var charCode = (evt.which) ? evt.which : event.keyCode;
	var character = String.fromCharCode(charCode);
	if (deci) { //allow decimal
		if (charCode == 190 || charCode == 110 || charCode == 46) {
			if (character == "%") return false;
			else return true;
		}
	} 
	if (charCode == 8 || charCode == 9 || charCode == 13 || charCode == 46 || charCode == 37 || charCode == 39) {
		if (character == "%") return false;
		else return true;
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57) ) {
		if (charCode >= 96 && charCode <=105) {
			if (character == "%") return false;
			else return true;
		} else return false;
	} else {
		if (character == "%") return false;
		else return true;
	}	
}
</script>