/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :Form Type[R95404485]
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

var fTypeText = rbv_api.selectNumber("SELECT id FROM form_type WHERE name = ?","{!form_type_text}");
var fTypeID = parseInt("{!R95404485#id}");
if("{!form_type_text}" != ""){ return fTypeText; } else if(fTypeID > 0) { return fTypeID; }