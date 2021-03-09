import React, { useState } from 'react';
import loadable from '@loadable/component';
import { Button, ListItemIcon, ListItemText, MenuItem, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
const TippyMenu = loadable(() => import('app/TippyMenu'))

const languages = [
	{
		id: 'en',
		title: 'English',
		flag: 'us'
	},
	{
		id: 'it',
		title: 'Italian',
		flag: 'tr'
	}
];

function LanguageSwitcher(props) {
	const dispatch = useDispatch();

	const theme = useTheme();
	const { i18n } = useTranslation();
	const [menu, setMenu] = useState(null);

	const currentLng = languages.find(lng => lng.id === i18n.language);

	const userMenuClick = event => {
		setMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setMenu(null);
	};

	function handleLanguageChange(lng) {
		const newLangDir = i18n.dir(lng.id);
		localStorage.setItem('language', lng.id);
		/*
        Change Language
         */
		i18n.changeLanguage(lng.id);

		/*
        If necessary, change theme direction
         */
		if (newLangDir !== theme.direction) {
			dispatch(Actions.setDefaultSettings({ direction: newLangDir }));
		}

		userMenuClose();
	}

	return (
		<>
			<TippyMenu
				icon={
					<>
						<Button className="h-64 w-64 text-default" onClick={userMenuClick}>
							<img
								className="mx-4 min-w-20"
								src={`assets/images/flags/${currentLng.flag}.png`}
								alt={currentLng.title}
							/>

							<Typography className="mx-4 font-600">{currentLng.id}</Typography>
						</Button>
					</>
				}
				outsideClick
			>
				{languages.map(lng => (
					<MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
						<ListItemIcon className="min-w-40">
							<img className="min-w-20" src={`assets/images/flags/${lng.flag}.png`} alt={lng.title} />
						</ListItemIcon>
						<ListItemText primary={lng.title} />
					</MenuItem>
				))}

				{/* <MenuItem
					component={Link}
					to="/documentation/working-with-fuse-react/multi-language"
					onClick={userMenuClose}
					role="button"
				>
					<ListItemText primary="Learn More" />
				</MenuItem> */}
			</TippyMenu>
		</>
	);
}

export default LanguageSwitcher;
