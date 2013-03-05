/*
Trigger Timing : After Create 
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

Integration Link : Upload ZIP url
timeout(ms) : 5000
*/

var objName="bir_authorized_user", objId=parseInt("{!id}");
rbv_api.setFieldValue(objName, objId, "office_service_division_rdo_TEXT", "{!locationId#value}");
rbv_api.setFieldValue(objName, objId, "user_role_TEXT", "{!R139397#value}");
rbv_api.setFieldValue(objName, objId, "email_address_TEXT", "{!email#value}");