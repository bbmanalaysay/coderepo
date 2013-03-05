/*
Trigger Timing :
Integration Name : ^recompute_values
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

/* Recompute the Tax Computations of the Taxpayer, and Spouse(if applicable) */
computeAll();
function computeAll(){
        rbv_api.setFieldValue("upload1", parseInt("{!id}"), "computed_", 'true'); //isComputed
	var	tp_taxDue = parseFloat("{!tax_due}");	//Taxpayer
	var sp_taxDue = parseFloat("{!tax_dueX}");	//Spouse
	
	if(tp_taxDue >= 0) reCompute(tp_taxDue, "surcharge", "interest", "compromise", "total_penalties", "total_amount_payable");
	if(sp_taxDue > 0) reCompute(sp_taxDue, "surchargeX", "interestX", "compromiseX", "total_penaltiesX", "total_amount_payX");
}

/*Recalculates the computations submitted through the Offline Form 
	Parameters: 
		> taxDue = Tax Due amount
		> in_XXXX = Integration name of the fields */
function reCompute(taxDue, in_surcharge, in_interest, in_compro, in_penalties, in_payable){
	var balance=0, surcharge=0, interest=0, compromise=0, total_penalty=0, gracePd=0, add5Days=0, add15Days=0, willAdd15Days=false, willAdd5Days=false, isLeap=false;  // *For negative tax dues, values will be set to ZERO(0)
	var dateDue = new Date("{!return_period_end}"); //Same Date will be used For forms: 1604CF, 1604E and 2552dateDue
	var dateDueMonth = new Date("{!return_period_end}").getMonth();
	var dateToday = new Date(rbv_api.formatDate(new Date(), "MM/dd/yyyy")),
		currYear = dateToday.getFullYear();
		
	/* Get the correct Due Date */
	var RPdetails = rbv_api.selectQuery("SELECT due_date, grace_period, add_5_days_if_dec, add_15_days_if_dec FROM return_period WHERE R99183336 = ? AND year_text = ?", 1, {!R95404485.id},currYear ); //R99183336=Form Type -- {!R95404485.id}=Form Type ID	
	if(RPdetails.length > 0){
		gracePd = parseFloat(RPdetails[0][1]);
		
		add5Days = parseInt(RPdetails[0][2]);
		if (add5Days == 1 && dateDueMonth == 11) {
			willAdd5Days = true;
		}
		
		add15Days = parseInt(RPdetails[0][3]);
		if (add15Days == 1 && dateDueMonth == 11) {
			willAdd15Days = true;
		}		

		
		if(gracePd > 0){
			dateDue = addDays("{!return_period_end}", gracePd); //Compute for the Due Date WITH the GRACE PERIOD
		}else{
			dateDue = new Date(RPdetails[0][0]);
		}	

		if (willAdd5Days) {
			dateDue = addDays(dateDue, 5); 
		}	

		if (willAdd15Days) {
			dateDue = addDays(dateDue, 15); 
		}		
		
		/* Leap Year Handling (JTrac # 873) */
		var dueDateBefore = new Date("{!return_period_end}"),  dueDateAFter = dateDue;				
		var leapCounter=0, currMonth, currYear, currDay = dueDateBefore.getDate(); 
		if(currDay > 28) dueDateBefore = new Date(dueDateBefore.setDate(28));
		printDivider();		
		while(dueDateBefore < dueDateAFter){ //Loop through each Month
			currMonth = dueDateBefore.getMonth();
			currYear = dueDateBefore.getFullYear();
			if(currMonth == 1 && (((new Date(currYear, 1, 29)).getMonth()) == 1)){
				rbv_api.println("Leap Year!!! - Month:" +currMonth+ " Year:" +currYear);
				leapCounter++; //Increment leap year counter
			}
			currMonth++;	//Increment for the next month	
			dueDateBefore = new Date(dueDateBefore.setMonth(currMonth)); //Set new month
		}		
		rbv_api.println("total leap year(s) = " +leapCounter);
		printDivider();
		if(leapCounter > 0) dateDue = addDays(dateDue, leapCounter);
		/* End Leap Year Handling */		
		
		// 'dateDue' will now be tested if it's a Business Day.
		// If it's not, then it will determine the next possible BusinessDay
		dateDue = getBusinessDay(dateDue);	
		
	} //*Same Date Will be used if there is no data returned by the Query

	rbv_api.println("grace period = " +gracePd+ "\nDate Today = " +dateToday+ "\nFINAL Date Due = " +dateDue); printDivider();	
	var test = 0;
	//if(taxDue > 0 &&  (dateDue.getTime() < dateToday.getTime())) {
	if(taxDue > 0 &&  (dateDue < dateToday)) {
		surcharge = taxDue * 0.25;				
		
		var totalDays = Math.floor(getDaysInBetween(dateDue, dateToday));
		interest = 0.20 * taxDue * (totalDays/365);
		
		var amtDue = surcharge + interest + taxDue;
		// var payment = 10000;		//FOR TESTING!  - ODI_DB.Payment_trans.amount_paid
		
		var noCompro = amtDue; //before deducting payment
		//var noCompro = amtDue - payment; //after deducting payment
		
		//Get corresponding compromise value from the Compromise Maintenance Object
		if (taxDue > 5000000) {
			compromise = 50000;
		} else {
			var qry2 = "SELECT compromise_is FROM compromise1 WHERE " +taxDue+ " >= range_from AND " +taxDue+ " < range_to";
			compromise = parseFloat(rbv_api.selectValue(qry2));
		}
		if(!isNaN(compromise)){
			balance = noCompro + compromise;	
		}		
		test = 1;
	} else if ( taxDue > 0 && (dateDue >= dateToday) ) {
		balance = taxDue;	
		surcharge=0, interest=0, compromise=0, total_penalty=0;	
		test = 2;
	} else if ( taxDue == 0 && (dateDue < dateToday)) {	
		var qry2 = "SELECT compromise_is FROM compromise1 WHERE " +taxDue+ " >= range_from AND " +taxDue+ " < range_to";
		compromise = parseFloat(rbv_api.selectValue(qry2));	
		surcharge=0, interest=0, total_penalty=0;	
		balance =  compromise;	
		test = 3;
	} else if ( taxDue == 0 && (dateDue >= dateToday) ) {
		balance = taxDue;	
		surcharge=0, interest=0, compromise=0, total_penalty=0;	
		test = 4;
	}
	

	
	balance = balance.toFixed(2);
	total_penalty = surcharge + interest + compromise;
		

	
	/* Set the NEW VALUES */
	var objName="upload1", objId=parseInt("{!id}");
	
	/* Special handling for 1604CF and 1604E since these forms will not have any penalty computation */
	if ("{!R95404485.no_penalty_computation#value}" == 'true') {
		surcharge=0, interest=0, compromise=0, total_penalty=0, balance=0;	
		test = 5;
	}
	
	/* DEBUG */
	rbv_api.println("dateDue.getTime() = " +dateDue.getTime());	
	rbv_api.println("dateToday.getTime() = " +dateToday.getTime());	
	rbv_api.println("dateDue = " +dateDue);	
	rbv_api.println("dateToday = " +dateToday);			
	
	rbv_api.println("taxDue = " +taxDue);
	rbv_api.println("surcharge = " +surcharge);
	rbv_api.println("interest = " +interest);
	rbv_api.println("compromise = " +compromise);
	rbv_api.println("total_penalties = " +total_penalty);
	rbv_api.println("total_amount_payable = " +balance);
	rbv_api.println("test = " +test);
	printDivider();	
	
	rbv_api.setFieldValue(objName, objId, in_surcharge, surcharge);
	rbv_api.setFieldValue(objName, objId, in_interest, interest);
	rbv_api.setFieldValue(objName, objId, in_compro, compromise);
	rbv_api.setFieldValue(objName, objId, in_penalties, total_penalty);
	rbv_api.setFieldValue(objName, objId, in_payable, balance);		

}

/* Computes for the days in between two Dates */
function getDaysInBetween(start, end){	
	start = new Date(start);
	end = new Date(end);
	
	var one_day = parseInt(1000*60*60*24);
	var result = parseInt(end - start);
		result = result/one_day;
		
	return result;
}

/* Adds desired no. of DAYS to Date */
function addDays(dateVal, daysToAdd){
	dateVal = new Date(dateVal);
	rbv_api.println("[addDays] Date = " +dateVal);
	
	var newDay = new Date(dateVal.setDate(dateVal.getDate() + daysToAdd));
	rbv_api.println("[addDays] Date + "+daysToAdd+ " days = " +newDay); printDivider();	
	
	return newDay;
}

	//var RPdetails = rbv_api.selectQuery("SELECT due_date, grace_period, add_5_days_if_dec FROM return_period WHERE R99183336 = ? AND year_text = ?", 1, {!R95404485.id},currYear ); //R99183336=Form Type -- {!R95404485.id}=Form Type ID	
	//if(RPdetails.length > 0){
	//gracePd = parseFloat(RPdetails[0][1]);

/* Determines the next Business Day / Holiday available given the {!return_period_end} */
function getBusinessDay(day){
	rbv_api.println("Inside getBusinessDay() : day = " +day);	
	var qry = "SELECT Count(id) FROM holiday5 WHERE is_active = ? AND end_date = to_date(?,'mm/dd/yyyy')";
	var qryHoliday;
    for (var i = 0; i <= 6; i++) {
        if (day.getDay() == 0) { //Sunday
            day.setDate(day.getDate() + 1);		
			rbv_api.println("Inside Sunday : day = " +day);	
            continue;
        } else if (day.getDay() == 6) { //Saturday
            day.setDate(day.getDate() + 2);
			rbv_api.println("Inside Saturday : day = " +day);	
            continue;
		} else if (day.getDay() > 0 && day.getDay() < 6) { //Weekdays
			//Test for holiday query here...			
			qryHoliday = rbv_api.selectNumber(qry, 1, rbv_api.formatDate(day, "MM/dd/yyyy"));
			rbv_api.println("queried count = " +qryHoliday);
			if(qryHoliday > 0){
				//is a holiday so 'continue' to test next day
				rbv_api.println("It is a holiday! : day = " +day);
				day.setDate(day.getDate() + 1);
				continue;
			}
		} else {
            break;
        }
	}
	rbv_api.println('BusinessDay = '+day);
    return day;
}

function printDivider(){ rbv_api.println("========================================================="); }