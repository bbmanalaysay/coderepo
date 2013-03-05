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
Integration Link : XML Validator
timeout(ms) :20000

*/

var errs = String( rbv_api.getFieldValue("upload1", parseInt('{!id}'), 'upload_error_s') );
return ("{!tsp_file#url}".length > 0 && errs.indexOf('Validation failed!') == -1 && errs.indexOf('ERROR') == -1 );