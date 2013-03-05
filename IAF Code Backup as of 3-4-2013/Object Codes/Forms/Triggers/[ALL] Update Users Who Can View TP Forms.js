/*
Trigger Timing :
Integration Name : ^show_tp_forms
Field to Change :Show Tp Form to These Users
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

viewTPForm();
function viewTPForm(){
	var taxPayer = parseInt("{!R95411340#id}");
	if(taxPayer > 0){
		var filedBy = parseInt("{!R105188#id}");
		var	tpChildAccounts = rbv_api.selectQuery("SELECT id FROM USER WHERE PUSER2 = ?", 1000, taxPayer);

		var resultArr = new Array();
			resultArr.push(taxPayer, filedBy);
			
		rbv_api.println("No. of Child Accounts = " +tpChildAccounts.length);
		for(var i = 0; i < tpChildAccounts.length; i++){
			resultArr.push(parseInt(tpChildAccounts[i][0]));
		}		
		return resultArr;
	}	
}