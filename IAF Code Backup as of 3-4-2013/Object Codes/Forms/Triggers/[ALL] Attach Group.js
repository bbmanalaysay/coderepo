/*
Trigger Timing : After Create 
Integration Name : 
Field to Change :Group
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

var loc_ID = parseInt("{!locationId}");
if(loc_ID > 0){
	var qry = "SELECT id FROM $GROUP WHERE locationId = ?";
	var groupId = rbv_api.selectNumber(qry, loc_ID);
	
	if(groupId > 0)return groupId;
}