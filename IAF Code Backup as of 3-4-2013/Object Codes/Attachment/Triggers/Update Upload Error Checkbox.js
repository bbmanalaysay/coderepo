/*
Trigger Timing : After Create | After Update | After Delete
Integration Name : 
Field to Change :Upload Error?
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
-----Trail------
Trail Object :  
*/

var err = String(rbv_api.getFieldValue("attachments", parseInt("{!id}"), "zip_validatorResponse"));
rbv_api.println(err);
return (err.indexOf('false') > -1 ) ? true : false;