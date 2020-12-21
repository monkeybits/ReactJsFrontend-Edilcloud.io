import ChatPanel from 'app/fuse-layouts/shared-components/chatPanel/ChatPanel';
import QuickPanel from 'app/fuse-layouts/shared-components/quickPanel/QuickPanel';
import NotificationPanel from 'app/fuse-layouts/shared-components/notification/Notification';
import AccessibilityPanel from 'app/fuse-layouts/shared-components/accessibility/Accessibility';
import React from 'react';

function RightSideLayout1(props) {
	return (
		<>
			<ChatPanel />

			<QuickPanel />

			<NotificationPanel />

			<AccessibilityPanel />
		</>
	);
}

export default React.memo(RightSideLayout1);
