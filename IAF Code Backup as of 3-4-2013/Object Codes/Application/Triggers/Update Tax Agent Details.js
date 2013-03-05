/*
Undeployed
Trigger Timing : After Create
Field to Change : 
Integration Name :
*/

var userClass = "{!user_classification#code}";
if(userClass == "TA" || userClass == "TA_TSP"){
	var TA_details = rbv_api.selectQuery("SELECT accreditation_board, expiration_date FROM accredited_agent WHERE accreditation_number = ?", 1, "{!accreditation_number}");
	
	if(TA_details.length > 0){
		var objName="app_obj", objId=parseInt("{!id}");
		
		// Accreditation Board:
		var accBoard = parseInt(TA_details[0][0]);
		if(accBoard > 0) rbv_api.setFieldValue(objName, objId, "accreditation_board", accBoard);
		
		//Expiration Date:
		var expDate = new Date(TA_details[0][1]);
		rbv_api.setFieldValue(objName, objId, "expiration_date", expDate);
	}
}