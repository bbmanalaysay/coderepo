<script>
$(document).ready(function(){	
	/* Retain only the field name */
	var thisLabel, remove1, remove2;
	$(".rbs_rightLabel, .rbs_rightLabelWide").each(function(){
		thisLabel = $(this).html();		
		/* Everything after these characters/words will be removed */
		remove1 = thisLabel.indexOf("[locationId]");
		remove2 = thisLabel.indexOf("date in");		
		if(remove1 != -1) $(this).html(thisLabel.substring(0, remove1));
		if(remove2 != -1) $(this).html(thisLabel.substring(0, remove2));
	});
	
	/* Remove "Futuristic" Picklist Values in the "Created At" filter */
	$("#dateInterval > optgroup > option").each(function(){
		thisLabel = $(this).html();
		if(thisLabel.indexOf("Next") != -1 || thisLabel.indexOf("Tomorrow") != -1 ) $(this).remove();
	});
});
$('input[value*=Clear]').hide();
</script>