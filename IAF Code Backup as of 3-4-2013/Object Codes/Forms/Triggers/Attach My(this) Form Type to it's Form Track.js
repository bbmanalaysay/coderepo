/*
Trigger Timing : After Create 
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

----Trigger Properties---- 
Integration Link : 
timeout(ms) :

*/

var locationId = parseInt("{!locationId}");
var formTypeId = parseInt("{!R95404485.id}");
if(locationId > 0 && formTypeId > 0){
	var qry = "SELECT id FROM form_track WHERE locationId = ?"
	var formTrackID = rbv_api.selectNumber(qry, locationId);
	if(formTrackID > 0){
		/* Attach Form Track to the Form Type */
		rbv_api.attach("R163551", "form_track", formTrackID, "form_type", formTypeId);
	}
}