/*
Trigger Timing : After Create 
Integration Name : 
Field to Change :XML Validator Response
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

function update_resp() {
	var resp = String(rbv_api.getSharedValue('ReturnBody'));
	resp = resp.split('<body>');
	resp = String(resp[1]).split('</body>');	
	if ( resp[0].indexOf('Validation failed!') > -1 || resp[0].indexOf('ERROR') > -1)
		rbv_api.setFieldValue("upload1", parseInt("{!id}"), 'upload_error_s', resp[0].replace(/&#39;/gi,"'") );
	else rbv_api.setFieldValue("upload1", parseInt("{!id}"), 'upload_error_s', '' );
	return resp[0].replace(/&#39;/gi,"'");
}
var errs = String( rbv_api.getFieldValue("upload1", parseInt('{!id}'), 'upload_error_s') );
if ("{!tsp_file#url}".length > 0 && errs.indexOf('Validation failed!') == -1 && errs.indexOf('ERROR') == -1) update_resp();