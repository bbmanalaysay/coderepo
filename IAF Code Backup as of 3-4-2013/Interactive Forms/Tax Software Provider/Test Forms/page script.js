<script>
$('.rbs_PageTopicWide').html("Test Forms");

$('input[name*="tsp_upload_file"]').each(function(){
 $(this).attr({ //handler to file upload
  'accept':'.xml',
  'onchange':'return check_file(this);'
 });
});

function check_file(elem) { //file extension checking
	str=elem.value.toUpperCase();
	if( str.indexOf(".XML") == -1) {
		alert('File type not allowed,\nAllowed File type: *.xml');
		elem.value = ''; return false;
	}
}

$(document).ready(function(){
	$(":submit[value=' Save ']").val(" Validate ");
});

</script>