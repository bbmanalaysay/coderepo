/*
Trigger Timing : After Create
Integration Name : 
Field to Change :Form Error
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

if ("{!errors}".length > 0 || "{!tin_not_found__offline#value}" == "true") rbv_api.setFieldValue("upload1", parseInt("{!id}"), "is_duplicate", 0);
return ("{!errors}".length > 0);