/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :
Relationship : Year Created

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

var dateCreated = new Date("{!createdAt}");
var yearCreated = dateCreated.getFullYear();
return rbv_api.selectNumber("SELECT id FROM year3 WHERE name = ?", yearCreated);