<script>
$(document).ready(function(){		
	var t = window.setInterval("removeOtherListViews();",100);
});

/* Hides the other list views that are not related to the Taxpayer's Associations */
function removeOtherListViews(){
	var thisLabel,
		listview1 = "Taxpayer's Associations (Assigned)",
		listview2 = "Taxpayer's Associations (For Deletion Approval)",
		listview3 = "Taxpayer's Associations (Disaccredited Tax Agent)",
		listview4 = "Taxpayer's Associations (Expired Tax Agent Accreditation)",
		listview5 = "Taxpayer's Associations (Removed)";
	 $("[name='listViews'] > option").each(function(){
		thisLabel = $(this).html();
		if(thisLabel.indexOf(listview1) == -1 && thisLabel.indexOf(listview2) == -1 && thisLabel.indexOf(listview3) == -1 && thisLabel.indexOf(listview4) == -1 && thisLabel.indexOf(listview5) == -1) $(this).remove();
	});
}
</script>