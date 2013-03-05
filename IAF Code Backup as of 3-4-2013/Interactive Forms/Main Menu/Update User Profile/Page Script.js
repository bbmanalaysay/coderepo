<style>
#txtR49164, #txtR49151{ display:none; }
</style>

<script>
var d=document;
$(document).ready(function(){

	/* Arrange the tab-indexing of the fields */
	var tabIndex = 1;
	var altEmail, num1, num2;
	$('input,select').each(function() {
		if (this.type != "hidden") {
			var $input = $(this);
			if($(this).attr("id") == "alternate_email_addr") altEmail = tabIndex;
			if($(this).attr("id") == "telephone_number_pre") num1 = tabIndex;
			if($(this).attr("id") == "telephone_number") num2 = tabIndex;
			$input.attr("tabindex", tabIndex);
			tabIndex++;
		}
	});
	$("#alternate_email_addr").attr("tabindex", num1);
	$("#telephone_number_pre").attr("tabindex", num2);
	$("#telephone_number").attr("tabindex", altEmail);
});
</script>