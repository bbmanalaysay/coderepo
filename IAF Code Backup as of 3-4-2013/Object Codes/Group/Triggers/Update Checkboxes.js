/*
Undeployed
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

var objName="$GROUP", objId=parseInt("{!id}");
rbv_api.setFieldValue(objName, objId, "is_national_office", {!$ORG_LOCN.is_national_office#value});
rbv_api.setFieldValue(objName, objId, "is_region", {!$ORG_LOCN.is_region#value});
rbv_api.setFieldValue(objName, objId, "is_division_", {!$ORG_LOCN.is_division_#value});
rbv_api.setFieldValue(objName, objId, "is_rdo", {!$ORG_LOCN.is_rdo#value});
rbv_api.setFieldValue(objName, objId, "is_section", {!$ORG_LOCN.is_section#value});