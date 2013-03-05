/*
Trigger Timing : After Create 
Integration Name : 
Field to Change :Upload Error
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

var err = String(rbv_api.getFieldValue("upload1", parseInt('{!id}'), 'upload_error_s'));
rbv_api.println(err);
if(err.indexOf('Validation failed!') > -1 || err.indexOf('ERROR') > -1 || err.indexOf('Invalid') > -1)
	rbv_api.setFieldValue("upload1", parseInt("{!id}"), "is_duplicate", false);

return ( err.indexOf('Validation failed!') > -1 || err.indexOf('ERROR') > -1 || err.indexOf('Invalid') > -1) ? true : false;