/*
Trigger Timing : After Create | After Update
Integration Name : ^attach_year
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

/* Attach the record to it's respective Return Period's year */
if("{!return_period_end}" != "" && (#CALC_COUNT.R54196( 1 | true ) == 0 ) ){	//R54196 == Year
	var returnPeriod = new Date("{!return_period_end}");
	var rpYear = returnPeriod.getFullYear();
	var qry = "SELECT id from year3 WHERE name = ?";
	var result = rbv_api.selectNumber(qry, rpYear);

	if(result > 0){ 
		var fTypeID = parseInt("{!R95404485.id}");
		if(fTypeID > 0)rbv_api.setFieldValue("form_type", fTypeID, "year", result); 
		
		return result; 
	}
}