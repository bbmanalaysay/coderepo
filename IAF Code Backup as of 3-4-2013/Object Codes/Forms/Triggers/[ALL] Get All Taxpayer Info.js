/*
Trigger Timing :
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

function update() {
  var frn = "{!filing_ref_num}";
  var bday = new Date("{!R95411340.date_of_birth}");
  var email_adr = "{!R95411340.email#text}";
  var tele_no = "{!R95411340.telephone_number}";
  var cell_no = "{!R95411340.cellphone_number}";
  var addr = "{!R95411340.address_}";
  var penalty = parseFloat("{!penalty_BOTH}");
  var total = parseFloat("{!total_amount_payable_BOTH}");
  penalty = penalty.toFixed(2);
  total = total.toFixed(2);
  rbv_api.println(penalty);
  rbv_api.println(total);
  var objName = "upload1";
  var objId = parseInt("{!id}");
  
  /* set values */
  rbv_api.setFieldValue(objName, objId, "frn_rpt", frn);
  rbv_api.setFieldValue(objName, objId, "date_of_birth___incorporation", bday);
  rbv_api.setFieldValue(objName, objId, "email_address", email_adr);
  rbv_api.setFieldValue(objName, objId, "telephone_number", tele_no);
  rbv_api.setFieldValue(objName, objId, "cellphone_number", cell_no);
  rbv_api.setFieldValue(objName, objId, "address", addr);
  rbv_api.setFieldValue(objName, objId, "penalties_amount_due_", penalty);
  rbv_api.setFieldValue(objName, objId, "total_amount_due_", total);

  
  

} update();