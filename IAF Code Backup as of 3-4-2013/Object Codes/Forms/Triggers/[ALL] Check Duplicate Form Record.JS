/*
Trigger Timing :
Integration Name : ^check_duplicate
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

/* Check Duplicate Form records based on the ff:
	1. TIN - Branch Code
	2. Return Period
	3. Form Type
	
	** Types of Duplicate Forms **
	a. Duplicate Form ( hierarchical rel-1 )
	b. Duplicate Audit Locked Form ( hierarchical rel-1 with tagging )
	c. Duplicate Amended Form ( hierarchical rel-2 ) //This Flagging is removed: JTrac#537 - No checking of duplicate amended forms
*/
checkDuplicate();
function checkDuplicate(){	
	
	var isDuplicate = false, duplicateID=0, is_amended__with_no_original=false;
	var objId = parseInt("{!id}"), objName = "upload1";
	if("{!return_period_end_old}" != ""){	
		var TIN = "{!tp_tin}",
			branchCode = "{!tp_branch_code}",
			returnPd = rbv_api.formatDate(new Date("{!return_period_end_old}"), "MM/dd/yyyy"),
			fType = parseInt("{!R95404485#id}"),
			tctNo = "{!tct}",
			buyerTINFor1707 = "{!buyer_tin}",
			kindofTxn = "{!kind_of_txn}", //JTrac#859
			isAmended = ("{!is_amended#value}" == "true"),
			noDupChecking = ("{!R95404485.no_duplicate_checking#value}" == "true");	//Check if related form type will check for duplicates *TRUE=don't check		
		
		var qry = "SELECT id, for_audit FROM upload1 WHERE id != ? AND tp_tin = ? AND tp_branch_code = ? AND return_period_end_old = to_date(?,'mm/dd/yyyy') AND R95404485 = ? AND successfully_filed_CB = ?";
		if(tctNo != "") qry += " AND tct = '"+tctNo+"'"; //special handling for 1606 and 1706
		if(kindofTxn != "") qry += " AND kind_of_txn = '"+kindofTxn+"'"; //special handling for 2552
		if(buyerTINFor1707 != "") qry += " AND buyer_tin = '"+buyerTINFor1707+"'"; //special handling for 2552
		
		var duplicateRecord = rbv_api.selectQuery(qry, 1, objId, TIN, branchCode, returnPd, fType, 1);
		rbv_api.println("duplicateRecord.length = " +duplicateRecord.length);
		if( duplicateRecord.length > 0 ){ //Duplicate record checker
			duplicateID = (parseInt(duplicateRecord[0][0]));
			for_audit = (parseInt(duplicateRecord[0][1]) == 1);
			isDuplicate = true;
			if(for_audit == true){
				rbv_api.setFieldValue(objName, objId, "parent_is_audit_locked", true);			//Flagging if Parent form is Audit Locked
			}else if(noDupChecking || isAmended){												//Note: Amended Forms can have duplicate forms	
				isDuplicate = false;															
				//JTrac#537 - No checking of duplicate amended forms:
				// if(isAmended) rbv_api.setFieldValue(objName, objId, "Pupload12", duplicateID); 	//Attach to original form (Amended)
			}
			if(isDuplicate)rbv_api.setFieldValue(objName, objId, "Pupload11", duplicateID);	//Attach to original form (Duplicate)
		}
		
		/* Checking if form is amended, but Original(unamended) Form was not filed */
		if( isAmended && !(duplicateRecord.length > 0) ) is_amended__with_no_original=true;
	}
	
	/* Flagging if form is amended, but Original(unamended) Form was not filed */
	rbv_api.println("is_amended__with_no_original = " +is_amended__with_no_original);
	rbv_api.setFieldValue(objName, objId, "is_amended__with_no_original", is_amended__with_no_original);		
	
	/* Flagging if Duplicate or not */
	rbv_api.println("duplicate = " +isDuplicate);
	rbv_api.setFieldValue(objName, objId, "is_duplicate", isDuplicate);
}