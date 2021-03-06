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
	Grid,
	Divider,
	ListItemText
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as MainActions from 'app/store/actions';
import 'tippy.js/themes/light-border.css';

const TippyMenu = loadable(() => import('app/TippyMenu'));
const TermsModal = loadable(() => import('../login/TermsModal'));
const JWTRegisterTab = loadable(() => import('app/main/register/tabs/JWTRegisterTab'));

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
function RegisterPage() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState('Terms');
	const [deviceType, setDeviceType] = React.useState('');

	const { t } = useTranslation('register');
	const dispatch = useDispatch();

	const theme = useTheme();
	const { i18n } = useTranslation();
	// const [menu, setMenu] = useState(null);

	const currentLng = languages.find(lng => lng.id === i18n.language);

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}
	}, []);

	// const userMenuClick = event => {
	// 	setMenu(event.currentTarget);
	// };

	// const userMenuClose = () => {
	// 	setMenu(null);
	// };

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

		// userMenuClose();
	}

	return (
		<>
			<div
				className={clsx(
					classes.root,
					'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white'
				)}
			>
				<img width="250" src="assets/images/logos/fuse.svg" alt="logo" />
				<div className="flex flex-col items-center justify-center w-full max-w-425">
					<FuseAnimate animation="transition.expandIn">
						<Card className="w-full">
							<CardContent className="flex flex-col items-center justify-center p-20 sm:p-32">
								<Typography variant="h6" className="text-center font-600 mt-20 mb-4">
									{t('APP_HEADING')}
								</Typography>
								<Typography variant="subtitle1" className="text-muted text-center mb-40">
									{t('APP_SUBHEADER')}
								</Typography>

								<div className="my-28 flex items-center justify-center or-container">
									<Divider className="w-32" />
									<span className="mx-8 font-size-16 whitespace-no-wrap text-muted">
										{t('OR_SIGN_UP')}
									</span>
									<Divider className="w-32" />
								</div>
								<JWTRegisterTab />

								<div className="flex items-center justify-center w-full pt-24">
									<span className="text-custom font-600 mr-6">
										{t('ALREADY_HAVE_AN_ACCOUNT_ASK')}
									</span>
								</div>
								<div className="flex items-center  justify-center w-full ">
									<Button
										type="submit"
										variant="contained"
										size="large"
										className="w-full bg-dark-blue mx-auto mt-16 uppercase"
										aria-label="Login"
										value="legacy"
									>
										<Link className="text-white font-600 inline" to="/pages/auth/login">
											{t('LOGIN')}
										</Link>
									</Button>
								</div>
							</CardContent>
						</Card>
					</FuseAnimate>
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
							{/* <Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								// onChange={handleChange}
							>
								{languages.map(lng => (
									<MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
										<ListItemText primary={lng.title} />
									</MenuItem>
								))}
							</Select> */}
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
			</div>
			<TermsModal open={open} setOpen={setOpen} title={title} />
		</>
	);
}

export default RegisterPage;
