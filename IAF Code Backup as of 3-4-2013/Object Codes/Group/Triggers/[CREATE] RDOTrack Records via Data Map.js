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

/* Create X number of RDO records depending on the system's current form type count */
if("{!is_rdo#value}" == "true") createRDO();
function createRDO(){
	var formTypes = rbv_api.selectQuery("SELECT id FROM form_type",1000);
	var objName="$GROUP", objId=parseInt("{!id}");
	rbv_api.println("total no. of form types = " +formTypes.length);
	for(var i = 0; i < formTypes.length; i++){
		rbv_api.setFieldValue(objName, objId, "R339604", formTypes[i][0]);
		rbv_api.runTrigger(objName, objId, "^create_rdo_track");
	}
}