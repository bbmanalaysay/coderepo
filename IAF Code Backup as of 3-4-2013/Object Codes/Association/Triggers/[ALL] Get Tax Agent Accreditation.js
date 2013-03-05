/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change :Tax Agent Accredition No.
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
-----Trail------
Trail Object :  
*/
rbv_api.setFieldValue("association", parseInt("{!id}"), "accreditation_number", "{!R98355328.accreditation_number}");
return "{!R98355328.accreditation_number}";
