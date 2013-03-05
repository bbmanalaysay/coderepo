<script>
$(document).ready(function(){		
	var t = window.setInterval("removeOtherListViews();",100);
});

/* Hides the other list views that are not related to the Tax Agent's Associations */
function removeOtherListViews(){
	var thisLabel,
		listview1 = "Tax Agent's Associations (Assigned)",
		listview2 = "Tax Agent's Associations (For Deletion Approval)",
		listview3 = "Tax Agent's Associations (Disaccredited Tax Agent)",
		listview4 = "Tax Agent's Associations (Expired Tax Agent Accreditation)",
		listview5 = "Tax Agent's Associations (Removed)";
	 $("[name='listViews'] > option").each(function(){
		thisLabel = $(this).html();
		if(thisLabel.indexOf(listview1) == -1 && thisLabel.indexOf(listview2) == -1 && thisLabel.indexOf(listview3) == -1 && thisLabel.indexOf(listview4) == -1 && thisLabel.indexOf(listview5) == -1) $(this).remove();
	});
}
</script>