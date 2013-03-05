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

/* Creates Region records for each RDO whose "is region" CB is checked */
var region = rbv_api.selectNumber("SELECT COUNT(id) FROM region18 WHERE R311566 = ?","{!id}"); //R311566=Group
if (region == 0 && "{!is_region#value}" == "true"){
	var objName = "$GROUP", objId = parseInt("{!id}");
	var regionCode = "{!$ORG_LOCN.region_code}";
	rbv_api.println("regionCode = " +regionCode);

	rbv_api.setFieldValue(objName, objId, "region_code", regionCode);
	rbv_api.runTrigger(objName, objId, "^create_region");
}