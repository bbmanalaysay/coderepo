/*
Trigger Timing : After Create | After Update
Integration Name : ^createpayment
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

updatePaymentData();
function updatePaymentData(){	
	var FRN = "{!filing_ref_num}"; 
		FRN = FRN.replace(/-/g,""); 	
	if(FRN != ""){
		var objName="upload1", objId=parseInt("{!id}");
		var qry = "SELECT bank_id, branch_code, channel, TO_CHAR(collection_date,'MM/DD/YYYY'), payment_amount, payment_transaction_number, name, subs_name, tin, rb_seq_no "+
				  "FROM payment_trans WHERE name = ?";
		var PaymentDetails = rbv_api.selectQuery(qry, 1000, FRN);
		var transactionNo, qry1, transId, accumulatedAmount, AmountDue, AmountPaid, collectDate;
		for(var i=0; i < PaymentDetails.length; i++){
			transactionNo = String(PaymentDetails[i][5]); 
			qry1 = "SELECT COUNT(id) FROM payment_track WHERE payment_transaction_number = ?";
			transId = rbv_api.selectNumber(qry1, transactionNo);				
			accumulatedAmount = 0;
			if (transId == 0){
				AmountPaid = parseFloat(PaymentDetails[i][4]);										
				rbv_api.setFieldValue(objName, objId, "payment_amount", AmountPaid);		
				rbv_api.setFieldValue(objName, objId, "bank_id", PaymentDetails[i][0]);				
				rbv_api.setFieldValue(objName, objId, "branch_code", PaymentDetails[i][1]);						
				rbv_api.setFieldValue(objName, objId, "channel", PaymentDetails[i][2]);					
				rbv_api.setFieldValue(objName, objId, "reference_no", PaymentDetails[i][6]);			
				rbv_api.setFieldValue(objName, objId, "subs_name", PaymentDetails[i][7]);				
				rbv_api.setFieldValue(objName, objId, "tin", PaymentDetails[i][8]);						
				rbv_api.setFieldValue(objName, objId, "payment_transaction_number", transactionNo);			
				collectDate = new Date(PaymentDetails[i][3]);
				rbv_api.setFieldValue(objName, objId, "collection_date", collectDate);
				accumulatedAmount += AmountPaid;
				rbv_api.runTrigger(objName, objId, "^data_map_PT");
				
				rbv_api.println("Creating record for payment transaction no. "+transactionNo);
			}
			var totalAmountDue = parseFloat("{!total_amount_payable_BOTH}"); 	
			var totalAmountPaid = parseFloat("{!total_amount_paid}");		  
			var currentAmountPaid = totalAmountPaid + accumulatedAmount;		
			
			if(currentAmountPaid >= totalAmountDue){
				rbv_api.setFieldValue(objName, objId, "Fully_paid", true);
				if("{!partially_paid#value}" == "true")rbv_api.setFieldValue(objName, objId, "partially_paid", false);
			}else if(currentAmountPaid > 0){
				rbv_api.setFieldValue(objName, objId, "partially_paid", true);
			}			
		}
	}
}