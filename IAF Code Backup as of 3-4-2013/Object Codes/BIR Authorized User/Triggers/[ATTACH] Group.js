/*
Trigger Timing : After Create | After Update
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

Integration Link : Upload ZIP url
timeout(ms) : 5000
*/

var locationId = parseInt("{!locationId}");
if(locationId > 0) return rbv_api.selectNumber("SELECT id FROM $GROUP WHERE locationId = ?", locationId);