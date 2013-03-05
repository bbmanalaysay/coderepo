<style>
.vcenter a { display:none; }
span { font-weight: bolder; font-size: 14px;}
</style>

<script>
$(document).ready(function(){
	/* Retain only the field name */
	var thisLabel, remove1, remove2;
	$(".rbs_rightLabel, .rbs_rightLabelWide").each(function(){
		thisLabel = $(this).html();		
		/* Everything after these characters/words will be removed */
		remove1 = thisLabel.indexOf("date in");
		remove2 = thisLabel.indexOf("[R95404485]");
		if(remove1 != -1) $(this).html(thisLabel.substring(0, remove1));
		if(remove2 != -1) $(this).html(thisLabel.substring(0, remove2));
	});
	
	/* Remove "Futuristic" Picklist Values in the "Created At" filter */
	$("#dateInterval > optgroup > option").each(function(){
		thisLabel = $(this).html();
		if(thisLabel.indexOf("Next") != -1 || thisLabel.indexOf("Tomorrow") != -1 ) $(this).remove();
	});
	
	$("input[value*='Clear']").hide().after("<input type='button' value=' Clear ' class='bold' onClick='clearAll();' />");
});
function clearAll() {
	$("#dateInterval").prop('selectedIndex', 0); //Modified Clear Function 2/7/2013 by Benjie Manalaysay
	$("#opValueDet0").prop('selectedIndex', 0);	
}
//clear onload:
clearAll();
// $("input[name*='opValueDet']").val(""); -- gutchi: removed since there are no input fields
</script>