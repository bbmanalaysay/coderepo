/*
Trigger Timing : After Update
Integration Name : 
Field to Change :Date of Removal
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
-----Trail------
Trail Object :  
*/
if("{!status#code}" == "$removed") return new Date(rbv_api.getCurrentDate());
