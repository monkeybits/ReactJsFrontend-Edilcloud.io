import FuseAnimate from '@fuse/core/FuseAnimate';
import loadable from '@loadable/component';
import {
	Button,
	Card,
	CardContent,
	FormControl,
	Typography,
	InputLabel,
	MenuItem,
	ListItemText
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as MainActions from 'app/store/actions';
import 'tippy.js/themes/light-border.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const TippyMenu = loadable(() => import('app/TippyMenu'));

const useStyles = makeStyles(theme => ({
	root: {
		background: `#ffffff)`,
		color: theme.palette.primary.contrastText
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

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

function SplashPage() {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState('Terms');
	const [deviceType, setDeviceType] = React.useState('');
	const history = useHistory();
	const classes = useStyles();
	const { t } = useTranslation('splash');
	const dispatch = useDispatch();

	const theme = useTheme();
	const { i18n } = useTranslation();

	const currentLng = languages.find(lng => lng.id === i18n.language);

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
			dispatch(MainActions.setDefaultSettings({ direction: newLangDir }));
		}
	}

	return (
		<>
			<div
				className={clsx(
					classes.root,
					'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white'
				)}
			>
				<img width="250" src="assets/images/logos/fuse.svg" />
				<img width="250" src="assets/images/splash/Construction-amico.svg" />
				<div className="flex flex-col items-center justify-center w-full max-w-425">
					<FuseAnimate animation="transition.expandIn">
						<Card className="w-full">
							<CardContent className="flex flex-col items-center justify-center p-20 sm:p-32">
								<Typography variant="h5" className="text-center font-bold mt-20 mb-4">
									{t('SPLASH_HEADING')}
								</Typography>
								<Typography variant="subtitle1" className="text-center mb-4">
									{t('SPLASH_SUBHEADER')}
								</Typography>
								<Typography variant="subtitle1" className="text-center mb-16">
									{t('SPLASH_SUBTEXT')}
								</Typography>
							</CardContent>
						</Card>
					</FuseAnimate>
				</div>
				<Button
					type="button"
					variant="contained"
					size="large"
					color="secondary"
					className="w-full mx-auto mb-28 uppercase"
					aria-label="Sign In"
					value="legacy"
					onClick={() => {
						history.push({
							pathname: '/pages/auth/login'
						});
					}}
				>
					{t('SIGN_IN_BUTTON')}
				</Button>
				<div className="flex items-center justify-between mt-8 w-full text-default font-600 px-32">
					<FormControl className={clsx(classes.formControl, 'custom-select-remove-border')}>
						<TippyMenu
							icon={
								<>
									{/* <InputLabel id="demo-simple-select-label">{t('LANGUAGE')}</InputLabel> */}
									<InputLabel id="demo-simple-select-label">
										{currentLng.title}{' '}
										<span className="arrow-icon">
											{' '}
											<KeyboardArrowDownIcon />{' '}
										</span>{' '}
									</InputLabel>
								</>
							}
							// ref={menuRef}
							outsideClick
						>
							{languages.map(lng => (
								<MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
									<ListItemText primary={lng.title} />
								</MenuItem>
							))}
						</TippyMenu>
					</FormControl>
					<div className="flex">
						<a href="javascript:;" className="text-muted mr-20">
							{t('HELP')}
						</a>
						<a
							href="javascript:;"
							className="text-muted mr-20"
							onClick={() => {
								setTitle('Privacy');
								setOpen(true);
							}}
						>
							{t('PRIVACY')}
						</a>
						<a
							href="javascript:;"
							className="text-muted"
							onClick={() => {
								setOpen(true);
								setTitle('Terms');
							}}
						>
							{t('TERMS')}
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default SplashPage;
