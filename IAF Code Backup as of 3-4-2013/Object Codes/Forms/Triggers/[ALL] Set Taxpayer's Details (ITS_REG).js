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

/* Update Taxpayer's Data based on his/her record in the 'reg_registration' object
	* FK: TIN
	* Details to update:
		1. Branch Code
		2. RDO Code
		3. Person's Name / Name of Corporation
		4. ZIP Code
		5. Address
		6. Telephone Number
		7. Line of Business (optional)
		8. Spouse TIN (optional)
		8. Spouse Branch Code (optional)
*/
		
updateTPData();
function updateTPData(){
	var TIN = "{!tp_tin}";
	var branchCode = "{!tp_branch_code}";
	if(TIN != ""){
		var objName="upload1", objId=parseInt("{!id}");
		var qry = "SELECT indtyp_code, branch_code, rdo_code, last_name, first_name, middle_name, registered_name, "+
				  "zip_code, barangay, street, city, num, description, spouse_tin, spouse_branch_code FROM reg_registration WHERE name = ? AND branch_code = ?";
		var TPDetails = rbv_api.selectQuery(qry, 1, TIN, branchCode);
				
		/* Update the Value of the fields */
		if(TPDetails.length > 0){
			//rbv_api.setFieldValue(objName, objId, "tp_branch_code", TPDetails[0][1]);	// Branch Code
			rbv_api.setFieldValue(objName, objId, "tp_rdo_code", TPDetails[0][2]);		// RDO Code
			
			var tpName="";
			var userType = String(TPDetails[0][0]); // Individual or Non-Individual			
			if(userType == "I"){
				tpName = TPDetails[0][3]+ ", " +TPDetails[0][4]+ ", " +TPDetails[0][5]; // Last, First, Middle Name
			}else if(userType == "N"){
				tpName = TPDetails[0][6];												// Name of Corporation		
			}			
			rbv_api.setFieldValue(objName, objId, "tp_name", tpName);					// TP's Name			
			rbv_api.setFieldValue(objName, objId, "tp_zip", TPDetails[0][7]);			// Zip Code
			
			var tp_address = TPDetails[0][8]+ ", " +TPDetails[0][9]+ ", " +TPDetails[0][10];
			rbv_api.setFieldValue(objName, objId, "tp_addr", tp_address);				// Address
			rbv_api.setFieldValue(objName, objId, "tp_telnum", TPDetails[0][11]);		// Telephone Number			
			if(TPDetails[0][12] != null) rbv_api.setFieldValue(objName, objId, "tp_lob", TPDetails[0][12]); // Line of Business (optional)
			
			/* Spouse Details */
			if(TPDetails[0][13] != null) rbv_api.setFieldValue(objName, objId, "tp_spouse_tin", TPDetails[0][13]); 			// Spouse TIN(special case)
			if(TPDetails[0][14] != null) rbv_api.setFieldValue(objName, objId, "tp_spouse_branch_code", TPDetails[0][14]); 	// Spouse Branch Code(special case)
		}
	}
}