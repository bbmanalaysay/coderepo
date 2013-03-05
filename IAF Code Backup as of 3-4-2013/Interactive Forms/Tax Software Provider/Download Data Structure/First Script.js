<div align='middle' style='display:none;'>
<select id='form_schema' onchange='downloadForm(this); return false;'>
<option>--</option>
{!#LOOP_BEGIN.all#94256181}
<option value="{!form_type.form_xml_schema#url}">{!form_type.name#text}</option>
{!#LOOP_END.all}
</select>

<a href='#undefined' id='downloader' target='_blank'>Download XML Schema</a>
</div>
<script>
function downloadForm(selectForm) {
	var selectForm = selectForm;
	$("#downloader").attr('href',selectForm.options[selectForm.selectedIndex].value);
}
</script>