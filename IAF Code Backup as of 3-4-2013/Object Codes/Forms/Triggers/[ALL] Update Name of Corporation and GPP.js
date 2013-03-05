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
Integration Link : 
timeout(ms) :

*/

/* Store the GPP and Name of Corporation (for Detailed Search) */
var objName = "upload1", objId = parseInt("{!id}");

/* GPP */
var TA_gpp = "{!R95411340.gpp_company}";
if(TA_gpp != "") rbv_api.setFieldValue(objName, objId, "gpp_company", TA_gpp);

/* Name of Corporation */
var nameCorp = "{!R95411340.name_of_corporation}";	
if(nameCorp != "") rbv_api.setFieldValue(objName, objId, "name_of_corporation", nameCorp);