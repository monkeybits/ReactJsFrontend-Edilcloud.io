gantt.form_blocks.multiselect = {
	render(section) {
		let rendText = "<div class='multiselect'><select class='lb_mult_input' multiple>";
		for (let i = 0; i < section.options.length; i++) {
			rendText += `<option value='${section.options[i].key}'>${section.options[i].label}</option>`;
		}
		rendText += '</select>';
		return `${rendText}</div>`;
	},
	set_value(node, value, task, section) {
		const select = node.querySelector('.lb_mult_input');
		for (let i = 0; i < select.childNodes.length; i++) {
			select.childNodes[i].selected = false;
			for (let j = 0; j < value.length; j++) {
				if (select.childNodes[i].value == value[j]) {
					select.childNodes[i].selected = true;
				}
			}
		}
	},
	get_value(node, task, section) {
		const result = [];
		const child = node.querySelectorAll('.lb_mult_input option');
		for (let i = 0; i < child.length; i++) {
			if (child[i].selected) {
				result.push(child[i].value);
			}
		}
		return result;
	},
	focus() {
		return false;
	}
};
