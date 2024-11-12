function selects() {
    $("[data-js='select']").select2({
		placeholder: "Фильтр",
		allowClear: true
	});

	const formSelects = document.querySelectorAll("[data-js='formSelect']")

	formSelects.forEach(formSelect => {
		let placeholder = $(formSelect).attr('placeholder')

		$(formSelect).select2({
			placeholder: placeholder,
			allowClear: true
		});
	}) 




	$("[data-js='formSelect']").on('select2:open', () => {
		$(".select2-dropdown").addClass("select2-dropdown--form")
	})
}
