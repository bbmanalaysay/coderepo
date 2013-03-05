/*
Trigger Timing : After Create | After Update
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

try {
var err = String(rbv_api.getFieldValue("attachments", parseInt("{!R54071.id}"), "zip_validatorResponse"));
rbv_api.println(err);
return (err.indexOf('false') > -1 ) ? true : false;
} catch(e) {}