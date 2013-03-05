/*
Trigger Timing :After Update
Integration Name : 
Field to Change :
Relationship : Accredited Agents
-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
*/

var accNumber = "{!accreditation_number}";
if(accNumber != ""){
	var qry = "SELECT id FROM accredited_agent WHERE accreditation_number = ?";
	var accId = rbv_api.selectNumber(qry, accNumber);
	
	if(accId > 0){
		return accId;
	}
}