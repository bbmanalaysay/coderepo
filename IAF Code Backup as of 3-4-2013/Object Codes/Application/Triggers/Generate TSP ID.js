/*
Trigger Timing :
Integration Name : 
Field to Change :

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
*/

// Generate TSP ID (assigned to a SUCESSFULLY ENROLLED TSP)
generateTSPID();
function generateTSPID() {
	if( "{!user_classification#code}" == "TSP" || "{!user_classification#code}" == "TA_TSP") {
		var enrollDate = new Date("{!enrollment_date}");		//DATE of Enrollment		
		// Year & Month
		var enrollYear = String(enrollDate.getFullYear());		//YEAR of Enrollment			
		var	enrollMonth = String(enrollDate.getMonth()+1);		//MONTH of Enrollment
			enrollMonth = (enrollMonth.length == 1) ? '0'+enrollMonth : enrollMonth;
		
		//Increment the TSP ID Series (settings object)
		var series = parseInt( rbv_api.getFieldValue("$SETTINGS", parseInt('{!#SETTINGS.id}'), "current_tsp_count") ) + 1;
		rbv_api.setFieldValue("$SETTINGS", parseInt('{!#SETTINGS.id}'), "current_tsp_count", series);
		
		// Format 5-digit series
		series = String( series ); //Increment the series
		while( series.length < 5) series = '0' + series;
		
		// Check Digit
		var data = enrollYear + enrollMonth + series;
		var checkDigit = calculateCheckDigit(data, "GTIN");
		
		// Set the TSP ID Format: Date of enrollment YYMM-Series-Check Digit
		var tspID = enrollYear.substring(2,4) + enrollMonth + "-" + series + "-" + checkDigit;
		rbv_api.setFieldValue("app_obj", parseInt('{!id}'), "tsp_id", tspID);
		rbv_api.setFieldValue("USER", parseInt('{!R80519204#id}'), "tsp_id", tspID);
	}
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
		rbv_api.println("len = " +len);
		rbv_api.println("2 = "+someData.toString().length);

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