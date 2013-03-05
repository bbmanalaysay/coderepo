/*
Trigger Timing : After Create | After Update
Integration Name : 
Field to Change : ZIP Validator Response
Relationship : 

-----Conversion------
 
Conversion Map : 

-----Email Triggers-----
Send To:
Email Template:
-----Trail------
Trail Object :  
*/

var resp = String(rbv_api.getSharedValue('ReturnBody'));
resp = resp.split('<body>');
resp = String(resp[1]).split('</body>');
return resp[0].replace(/&#39;/gi,"'");
