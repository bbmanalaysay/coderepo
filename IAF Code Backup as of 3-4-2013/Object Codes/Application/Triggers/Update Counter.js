/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change : No. of Times Filed (Unreg Tax Type)
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
*/

if(parseInt("{!R80519204.no__of_times_filed__unreg_tax_type}") > 0 ) return {!R80519204.no__of_times_filed__unreg_tax_type};