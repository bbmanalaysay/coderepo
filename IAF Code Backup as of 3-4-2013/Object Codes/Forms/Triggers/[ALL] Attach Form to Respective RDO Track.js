/*
Trigger Timing : After Create 
Integration Name : 
Field to Change :RDO Track
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

/* Attaches a Form to it's respective Form Track (RDO - Form Type) */
attachRDOTrack();
function attachRDOTrack(){
	var groupID=parseInt("{!R168067#id}"), formType=parseInt("{!R95404485#id}");
	if(groupID > 0 && formType > 0){
		var qry = "SELECT id FROM rdo_track WHERE R339590 = ? AND R339561 = ?"; //R339590=Group :: R339561=Form Type
		var rdoTrack = rbv_api.selectNumber(qry, groupID, formType);
		rbv_api.println("rdo track id = " +rdoTrack);
		if(rdoTrack > 0) return rdoTrack;
	}
}