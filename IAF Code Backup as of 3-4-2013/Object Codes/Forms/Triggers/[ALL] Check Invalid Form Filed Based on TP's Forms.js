/*
Trigger Timing : After Create 
Integration Name : 
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

validateForm();
function validateForm(){
	var filedBy = parseInt("{!R105188#id}");				//Filed By
	var taxPayer = parseInt("{!R95411340#id}");				//Taxpayer
	var fTypeID = parseInt("{!R95404485#id}");				//Form Type
	var filersParent = parseInt("{!R105188.PUSER2#id}");	//Parent of Filer (applicable only if child account)
	var is_invalid = true, objName = "upload1", objId = parseInt("{!id}");
	
	if(taxPayer > 0 && fTypeID > 0 && filedBy > 0){
		/* Check if the filed form is registered to the Taxpayer
			Note: Checking for unreg tax type will only run if 
				1. the filer is the TP himself
				2. the filer is a child of the TP
				  otherwise, checking for association with the filer will commence (VALIDATION #2)*/
		if(taxPayer == filedBy || taxPayer == filersParent){			
			var TP_forms = rbv_api.getRelatedIds("R50143", taxPayer);	//Taxpayer's Valid Form Types
			for(var i=0; i < TP_forms.length; i++){
				rbv_api.println(fTypeID+ " == " +TP_forms[i]);
				if( fTypeID == parseInt(TP_forms[i]) ){ //Match!
					rbv_api.println("is registered!");
					is_invalid = false;					
					break;
				}
			}
			rbv_api.setFieldValue(objName, objId, "is_invalid", is_invalid); //Flagging for Unregistered Tax Type			
		}else{
			is_invalid = false;
		}		
		
		/* Increment Filers Count for Unregistered Tax Type Filing */
		if(is_invalid){
			rbv_api.println("is unregistered!");
			var invalidFiles = parseInt("{!R105188.no__of_times_filed__unreg_tax_type}");
			rbv_api.setFieldValue("USER", filedBy, "no__of_times_filed__unreg_tax_type", invalidFiles+1);
			
			//For unlocking purposes (app_obj)
			var userApplication = parseInt("{!R105188.R80519204#id}");
			if(userApplication > 0)
				rbv_api.setFieldValue("app_obj", userApplication, "no__of_times_filed__unreg_tax_type", invalidFiles+1);
		}else{	//VALIDATION #2
			/* Check if the filer is associated to the TP (for TA or TA-TSP roles only) */
			var is_assigned = false;
			if(taxPayer != filedBy && taxPayer != filersParent){ 
				var qry = "SELECT R99589028 FROM association WHERE (R98355328 = ? OR R98355328 = ?) AND R98355364 = ? AND status = ?";	//R99589028=Form Permission R98355328 = TA
				var assignedCode = rbv_api.getIdByCode("association", "status", "$assigned");
				var formPermID = rbv_api.selectNumber(qry, filedBy, filersParent, taxPayer, assignedCode);
				rbv_api.println("formPermID = " +formPermID);
				if( formPermID > 0 ) {
					var assignedFTypes = rbv_api.getRelatedIds("R99579630", formPermID); //TP's assigned form types to the TA
					for(var i=0; i < assignedFTypes.length; i++){
						if(fTypeID == assignedFTypes[i]){
							is_assigned = true;
							break;
						}
					}		
				}
			rbv_api.println("is_assigned = " +is_assigned);
			if(is_assigned)
					rbv_api.setFieldValue(objName, objId, "not_included_in_tp_assignment", false);
				else
					rbv_api.setFieldValue(objName, objId, "not_included_in_tp_assignment", true);				
			}else{
				rbv_api.setFieldValue(objName, objId, "not_included_in_tp_assignment", false);
			}
		}
	}else{//Other errors will prevail
		rbv_api.setFieldValue(objName, objId, "is_invalid", false);
	}
}