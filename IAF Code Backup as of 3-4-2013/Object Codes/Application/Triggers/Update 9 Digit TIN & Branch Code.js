/*
Trigger Timing : After Create
Field to Change : TIN(for Query)
Integration Name :^update_tin9
*/

var TINfull = "{!tax_identification_n}";
if(TINfull != ""){
	TINfull = TINfull.replace(/-/g,"");
	var bCode = TINfull.substring(9);
	rbv_api.println("bCode = " +bCode);
	rbv_api.setFieldValue("app_obj", parseInt("{!id}"), "branch_code", bCode);		//Branch Code
	
	var TIN = TINfull.substring(0,9);
	return TIN;
}