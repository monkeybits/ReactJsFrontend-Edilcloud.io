import _ from '@lodash';
import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';

function DemoSidebarContent() {
	function generate(element) {
		return _(30).times(value =>
			React.cloneElement(element, {
				key: value
			})
		);
	}

	return (
		<div>
			<List dense>
				{generate(
					<ListItem button>
						<ListItemText primary="Single-line item" />
					</ListItem>
				)}
			</List>
		</div>
	);
}

export default React.memo(DemoSidebarContent);
