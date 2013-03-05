/*
Trigger Timing : After Create | After Update
Integration Name : ^check_start_month
Field to Change :Invalid Start Month
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

/* Check if the Calendar Start Type and Month is correct.
   This is validated against the 'reg_registration' table. */
var TIN = "{!tp_tin}", isInvalid = false;
if(TIN != ""){

	var qry = "SELECT code_, start_month FROM reg_registration WHERE name = ?";
	var TINData = rbv_api.selectQuery(qry, 1, TIN);
	if(TINData.length > 0){
		var regCode = String(TINData[0][0]), regStartMonth = String(TINData[0][1]);
		var formCode = "{!fiscal_or_calendar#code}", formStartMonth = "{!calendar_type_start_month#code}";
		
		rbv_api.println("regCode = " +regCode+ "   ::   regStartMonth = " +regStartMonth);
		rbv_api.println("formCode = " +formCode+ "   ::   formStartMonth = " +formStartMonth);
		
		// Codes are not the same (F or C : fiscal or calendar)
		if(formCode != "" && regCode != "" && regCode != "null"){
			if(formCode != regCode) isInvalid = true;
		}
		
		// Start Month is not the same (1 - 12 : january - december)
		if(formStartMonth != "" && regStartMonth != "" && regStartMonth != "null"){
			if(formStartMonth != regStartMonth) isInvalid = true;
		}
	}
}

return isInvalid;

