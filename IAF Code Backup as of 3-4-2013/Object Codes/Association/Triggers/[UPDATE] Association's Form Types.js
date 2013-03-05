/*
Trigger Timing : 
Integration Name : 
Field to Change :
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:

-----Trail------
Trail Object :  
*/

/* Attaches Association's Form Types */
rbv_api.setFieldValue("association", {!id}, "R100282402", 0); //clear form types

var formPermID = parseInt("{!R99589028#id}");	//Related Form Permission
var formTypes = rbv_api.getRelatedIds("R99579630", formPermID);

for(var i = 0; i < formTypes.length; i++){
	rbv_api.attach("R100282402", "association", {!id}, "form_type", formTypes[i]);
}

