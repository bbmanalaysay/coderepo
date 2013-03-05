/*
Trigger Timing : After Create
Field to Change : 
Integration Name :
*/

/* Validate application against the 'reg_registration' Database
	> Fields to validate:
	1. TIN
	2. Branch Code
	3. RDO Code
	4. Date of Birth / Date of Incorporation */
validateReg();
function validateReg(){
	var applicantType = "{!applicant_type#code}";
	if(applicantType != ""){
	
		/* (1)TIN */
		var TIN_full = "{!tax_identification_n}".replace(/-/g,"");
		var	TIN = TIN_full.substring(0,9);
	
		/* (2)Branch Code */
		var	branchCode = TIN_full.substring(9);
		
		/* Check if the TIN is existing in the reg_registration */
		var qry = "SELECT id FROM reg_registration WHERE name = ? AND branch_code = ?";
		var regID = rbv_api.selectNumber(qry, TIN, branchCode);
		rbv_api.println("TIN Match = " +regID);
		if( regID > 0 ) {			
			/* (3)RDO Code */
			var	rdoCode = "{!$ORG_LOCN.rdo_code}";
							
			if(applicantType == "IND"){			//Individual		
				/* (4)Date of Birth */
				var DoB = new Date("{!date_of_birth}");
					DoB = rbv_api.formatDate(DoB, "dd/MMM/yyyy");
					cond4 = "birth_date = to_date('"+DoB+"','dd/mm/yyyy')"; 	//Oracle query (date)		
			}else if(applicantType == "CO"){	//Non-Individual
				/* (4)Date of Incorporation */
				var DoI = new Date("{!date_of_incorporatio}");
					DoI = rbv_api.formatDate(DoI, "dd/MMM/yyyy");
					cond4 = "date_registered = to_date('"+DoI+"','dd/mm/yyyy')"; //Oracle query (date)
			}
			
			qry += " AND rdo_code = ? AND " +cond4;			
			var regIDsynched = rbv_api.selectNumber(qry, TIN, branchCode, rdoCode);
			
			if(!(regIDsynched > 0)){ //Information is not synched
			
				rbv_api.println("NOT SYNCHED!");
				rbv_api.setFieldValue("app_obj", {!id}, "information_not_synched", true);				//Tag as not Synched
				
			}else{
				rbv_api.println("SYNCHED!");
			}
		}
	}
}