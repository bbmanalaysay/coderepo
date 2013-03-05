/*
Trigger Timing : After Create 
Integration Name : 
Field to Change :Tin Not Found
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

/* Checks if the entered TIN & Branch code is existing in the reg_registration table */
validateTIN();
function validateTIN(){
	var TIN = "{!tp_tin}";
	var bCode = "{!tp_branch_code}";
	if(TIN != "" && bCode != ""){
		var qry = "SELECT count(id) FROM reg_registration WHERE name = ? AND branch_code = ?";
		var valid_TIN = rbv_api.selectNumber(qry, TIN, bCode );
		rbv_api.println("valid_TIN = " +valid_TIN);
		
		if( valid_TIN == 0 ) return true; // TIN is NOT existing in the reg_registration table!
	}
}