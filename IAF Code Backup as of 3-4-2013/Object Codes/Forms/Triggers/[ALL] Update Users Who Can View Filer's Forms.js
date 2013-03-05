/*
Trigger Timing : 
Integration Name : ^show_filer_forms
Field to Change :Show Filter Form to These Users
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

viewFilerForm();
function viewFilerForm(){
	var filedBy = parseInt("{!R105188#id}"),
		filerRole = "{!R105188.role#code}";

	if(filedBy > 0 && (filerRole == "$TA" || filerRole == "$TA_TSP")){
		var taxPayer = parseInt("{!R95411340#id}"),
			filerIsChild = "{!R105188.is_enrolled#value}",
			resultArr = new Array();
			
		if(filerIsChild == "false"){
			if(filedBy != taxPayer) resultArr.push(filedBy);		//As a Tax Agent (Not Child)
		}else{
			var qry = "SELECT PUSER2 FROM USER WHERE CUSER2 IN (?)";
			var parentUser = parseInt(rbv_api.selectNumber(qry, filedBy));
			if(parentUser != taxPayer){
				var filerChildAccounts = rbv_api.selectQuery("SELECT id FROM USER WHERE PUSER2 = ?", 1000, parentUser); //As a Tax Agent (Child Account on behalf of Parent TA)
				for(var i = 0; i < filerChildAccounts.length; i++){
					resultArr.push(parseInt(filerChildAccounts[i][0]));
				}
			}
		}
		if(resultArr.length > 0) return resultArr;
	}
}