/*
Trigger Timing : After Create 
Integration Name : ^update_tin
Field to Change :Taxpayer Identification Number[taxpayer_identification_number]
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

if("{!tin_formatted}" != "") return "{!tin_formatted}";