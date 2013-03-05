/*
Trigger Timing : 
Integration Name : 
Field to Change : No. of Times Filed (Unreg Tax Type)
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
*/

rbv_api.setFieldValue("USER", parseInt("{!R80519204.id}"), "no__of_times_filed__unreg_tax_type", 0);
return 0;