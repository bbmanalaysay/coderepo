/*
Trigger Timing : Before Create
Field to Change : 
Integration Name :
*/

/* Validate if TIN and Branch Code is existing in the 'reg_registration' Database */
if(rbv_api.isPortal())validateTIN();

function validateTIN(){

	var TIN_full = "{!tax_identification_n}".replace(/-/g,"");
	var	TIN = TIN_full.substring(0,9);
	var bCode = TIN_full.substring(9);
	
	rbv_api.println("TIN = " +TIN);
	rbv_api.println("bCode = " +bCode);
	var qry = "SELECT id FROM reg_registration WHERE name = ? AND branch_code = ?";
	var regID = rbv_api.selectNumber(qry, TIN, bCode);
	
	rbv_api.println("TIN Match = " +regID);
	if( !(regID > 0) ){										//TIN-Branch Code is not existing in 'reg_registration'
		return "TIN ({!tax_identification_n}) is Invalid.";
	}
	if(regID > 0){
		qry = "SELECT count(id) FROM app_obj WHERE tin__for_query = ? AND information_not_synched = ?";
		var attempts = rbv_api.selectNumber(qry, TIN, 1);
		if(attempts >= 2){
			return "Your account has been locked. Please update your ITS_REG record in your respective RDO";	//TIN is locked
		}
	}
}

function addDash(str) {
	var result = '';
	while (str.length > 0) {
		result += str.substring(0, 3) + '-';
		str = str.substring(3);
	}
	return result;
}