/*
Trigger Timing :
Integration Name : 
Field to Change :Unsync ITS DATA filing Counter
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:

-----Trail------
Trail Object :  
*/

rbv_api.setFieldValue("USER", parseInt("{!R80519204.id}"), "unsync_its_data_filing_counter", 0);
return 0;

