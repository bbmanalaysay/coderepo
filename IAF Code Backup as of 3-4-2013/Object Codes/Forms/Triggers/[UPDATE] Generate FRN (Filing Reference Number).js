/*
Trigger Timing :
Integration Name : ^generate_frn
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
/* Generate FRN (Filing Reference Number) */
// if("{!form_error#value}" == "false" && "{!upload_error#value}" == "false") 

generateFRN();
function generateFRN(){
	var dateFiled = new Date("{!createdAt}");				//DATE Filed
	
	/* (1&2) Year & Month */
	var yearFiled = String(dateFiled.getFullYear());		//YEAR Filed
		yearFiled = yearFiled.substring(2);
	var	monthFiled = String(dateFiled.getMonth()+1);		//MONTH Filed
		monthFiled = (monthFiled.length == 1) ? '0'+monthFiled : monthFiled;
	
	/* (3) FType Code */
	var fTypeCode = "{!R95404485.form_type_code}";
	
	/* (4) Six Digit Series */
	
	//dgarfin 12/20/12: Increment 'series' first before assigning to FRN
	//JTrac#359: Same reference numbers are generated when filing unregistered tax return (1600) having different return period
	var incrementSeries = parseInt( rbv_api.getFieldValue("$SETTINGS", parseInt('{!#SETTINGS.id}'), "current_frn_count") ) + 1;
	rbv_api.setFieldValue("$SETTINGS", parseInt('{!#SETTINGS.id}'), "current_frn_count", incrementSeries);	//Increment the FRN Series (settings object)
	
	var series = incrementSeries;	//Increment the series
	while(String(series).length < 6){ series = '0'+ series; }		//Series must be 6 digits long
	
	/* (5) RDO */
	// var rdo = rbv_api.selectValue("SELECT rdo_code_seq FROM $ORG_LOCN WHERE rdo_code = ?", '{!tp_rdo_code}');
	var rdo = '{!tp_rdo_code}';
	rbv_api.println("rdo = " +rdo);
	
	/* (6) Check Digit */
	var data = yearFiled + monthFiled + fTypeCode+ "01" +series + rdo;
	var checkDigit = calculateCheckDigit(data, "SSCC");	
		
	/* Format: Year + Month + Ftype Code + Series + RDO + Check Digit  */
	var frn = yearFiled+ "-" +monthFiled+ "-" +fTypeCode+ "-01-" +series+ "-" +rdo+ "-" +checkDigit;	
	rbv_api.setFieldValue("upload1", parseInt('{!id}'), "filing_ref_num", frn);								//Set the FRN
	rbv_api.println("frn = " +frn);
	

}

function calculateCheckDigit(someData, format) {
	var evenSum = 0;
    var oddSum = 0;
	var len;

	if (format == 'SSCC') {
			len = 17;
	} else {
			len = 11;
	}
	
    if(someData.toString().length != len) {
		rbv_api.println("Data length must be "+len+" to calculate "+format+" check digit.");
	} else {
		//Loop through all the data, summing up the evens and odds
		for(var i = 0; i < someData.toString().length; i++) {
				//Offset since the SSCC standard starts it's index at 1
				if((i + 1) % 2 == 0) {
						evenSum += parseInt(someData.toString().charAt(i));
				} else {
						oddSum += parseInt(someData.toString().charAt(i));
				}
		}
		
		var oddsTotal = oddSum * 3;
		var bothTotal = oddsTotal + evenSum;
		var remainder = bothTotal % 10;
		var checksum = 10 - remainder;
		// rbv_api.println("Checksum calculation: " + oddsTotal + " + " + evenSum + " = " + bothTotal + " % 10 = " + remainder + ", 10" + " - " + remainder + " = " + checksum);
		if(checksum == 10) {
		// rbv_api.println("Trimming checksum of " + checksum + " to 0 so it can fit into one digit.");
			checksum = 0;
		}
		// rbv_api.println("Calculated SSCC checksum of " + checksum + " for data '" + someData + "'");
		return checksum;
	}
} //end
