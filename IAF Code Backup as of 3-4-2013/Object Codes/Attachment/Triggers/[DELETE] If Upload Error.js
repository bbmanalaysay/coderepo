/*
Trigger Timing : After Create | After Update
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
*/

/* Delete Record if the file attached was tagged as an "Upload Error" */
if("{!upload_error_checkbox#value}" == "true"){
	/* Update the Counter for deleted (for overriding of Standard Grid Message After Create|Update|Delete) -- JTrac #656 */
	var objName="USER", objId=parseInt("{!#CURR_USER.id}");
	var deletedCount = parseInt(rbv_api.getFieldValue(objName, objId, "count_of_deleted_attachments"));
		deletedCount = (isNaN(deletedCount)) ? 1 : deletedCount + 1;
	rbv_api.setFieldValue(objName, objId, "count_of_deleted_attachments", deletedCount);

	rbv_api.deleteRecord("attachments", parseInt("{!id}"));
	
}