/*
undeployed
Trigger Timing : After Create | After Update
Integration Name : ^save_dup_links
Field to Change :
Relationship : 

-----Conversion------
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:

-----Trail------
Trail Object :  

----Trigger Properties---- 
Integration Link : 
timeout(ms) :

*/

var objName="upload1", objId=parseInt("{!id}");

/* Duplicate Form */
if("{!is_duplicate#value}" == "true"){
	var dupEntry = "This form has been already filed on {!R167592#P.createdAt#value}. See form <a href='{!R167592#P.name#url}'>{!R167592#P.name#text}</a> for details."
	rbv_api.setFieldValue(objName, objId, "duplicate_entry__text_area",dupEntry);
}