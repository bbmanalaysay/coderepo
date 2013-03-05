/*
Trigger Timing : After Create 
Integration Name : ^update_taxpayer
Field to Change :Taxpayer[R95411340]
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

rbv_api.setFieldValue("upload1", parseInt("{!id}"), "R105188",  parseInt("{!createdBy#id}"));						//Filed By

var tp_tin = "{!tp_tin}", bCode = "{!tp_branch_code}";
if(tp_tin != ""){
	var isEnrolled, isBau;
	var qry = "SELECT id, is_enrolled, is_bau FROM USER WHERE tin__for_query = ? AND branch_code = ?";
	var arr = rbv_api.selectQuery(qry, 1000, tp_tin, bCode);
	for(var i=0; i < arr.length; i++){
		isEnrolled = parseInt(arr[i][1]);
		isBau = parseInt(arr[i][2]);
		if(isEnrolled != 1 && isBau != 1){
			return parseInt(arr[i][0]);
			break;
		}
	}
}else{
	rbv_api.setFieldValue("upload1", parseInt("{!id}"), "unregistered_taxpayer", true);	//Unregistered Taxpayer
}