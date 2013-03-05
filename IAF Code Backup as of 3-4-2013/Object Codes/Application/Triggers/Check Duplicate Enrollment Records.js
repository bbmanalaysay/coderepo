/*
Trigger Timing : Before Create
Field to Change : 
Integration Name :
*/

/* Check for a duplicate Enrollment Record */
checkDuplicate();
function checkDuplicate(){
	var qry = "SELECT status FROM app_obj WHERE id ! = ? AND tax_identification_n = ?";	
	var appStatusID = rbv_api.selectNumber(qry, parseInt("{!id}"), '{!tax_identification_n}');
	if(appStatusID > 0){
		var appStatus = rbv_api.getCodeById("app_obj", "status", appStatusID);
		rbv_api.println("application status = " +appStatus);
		
		if(appStatus == "$FA"){ return "Your TIN has a pending application. Visit your RDO for account activation"; }	//For Approval
		if(appStatus == "$Approved"){ return "You are already enrolled in the eBIRForms System"; }						//Approved
	}	
}