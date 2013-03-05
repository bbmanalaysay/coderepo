/*
Trigger Timing : 
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

/* For Testing, reset values */
resetAll();
function resetAll(){
	var objName="upload1", objId=parseInt("{!id}");
	
	/* Computations */
	rbv_api.setFieldValue(objName, objId, "surcharge", 0);
	rbv_api.setFieldValue(objName, objId, "interest", 0);
	rbv_api.setFieldValue(objName, objId, "compromise", 0);
	rbv_api.setFieldValue(objName, objId, "total_penalties", 0);
	rbv_api.setFieldValue(objName, objId, "total_amount_payable", 0);
	rbv_api.setFieldValue(objName, objId, "surchargeX", 0);
	rbv_api.setFieldValue(objName, objId, "interestX", 0);
	rbv_api.setFieldValue(objName, objId, "compromiseX", 0);
	rbv_api.setFieldValue(objName, objId, "total_penaltiesX", 0);
	rbv_api.setFieldValue(objName, objId, "total_amount_payX", 0);
	
	/* Checkboxes */
	rbv_api.setFieldValue(objName, objId, "is_duplicate", true)
	rbv_api.setFieldValue(objName, objId, "computed_", false);
	rbv_api.setFieldValue(objName, objId, "form_error", false);
}