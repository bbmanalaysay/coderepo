/*
Trigger Timing : After Create
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

formData();
function formData() {
	rbv_api.println("{!tsp_file#url}".length);
	if ("{!tsp_file#url}".length > 0) {
		var uploadResp = rbv_api.getFieldValue("upload1", parseInt('{!id}'), 'upload_response');
		var	TIN1 = getTIN(uploadResp, "TIN1"),
			TIN2 = getTIN(uploadResp, "TIN2"),
			TIN3 = getTIN(uploadResp, "TIN3"),
			TIN = TIN1 + TIN2 + TIN3,
			branchCode = getBranchCode(uploadResp);
			rbv_api.println("TIN = " +TIN+ "\nBranch Code = " +branchCode);
		/* Check if TIN is existing in the 'reg_registration' DB */
		if(TIN.length == 9 && branchCode != ""){
			rbv_api.setFieldValue("upload1", parseInt('{!id}'), 'tp_tin', TIN );				//tax identification number
			rbv_api.setFieldValue("upload1", parseInt('{!id}'), 'tp_branch_code', branchCode );	//branch code
			var qry = "SELECT Count(id) FROM reg_registration WHERE name = ? AND branch_code = ?";
			var valid_TIN = rbv_api.selectNumber(qry, TIN, branchCode); // find the TIN & Branch Code (reg_registration)
				
			if ( valid_TIN == 0 ){	//TIN not existing
				rbv_api.setFieldValue("upload1", parseInt('{!id}'), 'tin_not_found__offline', true ); //tin not found CB
			}else{
				rbv_api.setFieldValue("upload1", parseInt('{!id}'), 'tin_not_found__offline', false ); //tin not found CB
			}
		}else{
			rbv_api.setFieldValue("upload1", parseInt('{!id}'), 'tin_not_found__offline', true ); //tin not found CB
		}		
	}
}
/* Parser for the TIN */
function getTIN(str, tin_toGet) {

	var tinParam = new Array();
	if(tin_toGet == "TIN1") tinParam = ["txtTIN1", "tinPart1", "tinA", "txtTin1", "txtDonorTIN1", "txt5TIN1"];
	else if(tin_toGet == "TIN2") tinParam = ["txtTIN2", "tinPart2", "tinB", "txtTin2", "txtDonorTIN2", "txt5TIN2"];
	else if(tin_toGet == "TIN3") tinParam = ["txtTIN3", "tinPart3", "tinC", "txtTin3", "txtDonorTIN3", "txt5TIN3"];	
	
	for(var i=0; i < tinParam.length; i++){
		if(String(str).indexOf(tinParam[i]) != -1){
			str = String(str).split(tinParam[i]+">");
			str = String(str[1]).split("</");
			return str[0];
			break;
		}
	}
}

function getBranchCode(str){
	var bCodeTags = ["txtBranchCode", "branchCode", "txt5BranchCode", "txt7BranchCode", "txtBranch", "txtBranchCodeB", "txtDonorBranchCode", "txtDonee1BranchCode", "txtDonee2BranchCode", "txtBranchCodeE"];
	
	for(var i = 0; i < bCodeTags.length; i++){
		if(String(str).indexOf(bCodeTags[i]) != -1){
			str = String(str).split(bCodeTags[i]+">");
			str = String(str[1]).split("</");
			return str[0];
			break;
		}
	}
}