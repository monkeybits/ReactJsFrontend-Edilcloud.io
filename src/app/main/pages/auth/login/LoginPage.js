import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import JWTLoginTab from 'app/main/login/tabs/JWTLoginTab';
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TermsModal from './TermsModal';
import FacebookLoginComponent from './FacebookLoginComponent';
import GoogleLoginComponent from './GoogleLoginComponent';
import { useTranslation } from 'react-i18next';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import * as MainActions from 'app/store/actions';
import TippyMenu from 'app/TippyMenu';
import 'tippy.js/themes/light-border.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
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
function LoginPage() {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState('Terms');
	const classes = useStyles();
	const { t } = useTranslation('login');
	const dispatch = useDispatch();

	const theme = useTheme();
	const { i18n } = useTranslation();
	// const [menu, setMenu] = useState(null);

	const currentLng = languages.find(lng => lng.id === i18n.language);

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
				<img className="w-200 " src="assets/images/logos/fuse.svg" />
				<div className="flex flex-col items-center justify-center w-full max-w-425">
					<FuseAnimate animation="transition.expandIn">
						<Card className="w-full">
							<CardContent className="flex flex-col items-center justify-center p-20 sm:p-32">
								<Typography variant="h6" className="text-center font-600 mt-20 mb-4">
									{t('APP_HEADING')}
								</Typography>
								<Typography variant="subtitle1" className="text-muted mb-40">
									{t('APP_SUBHEADER')}
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<FacebookLoginComponent />
										{/* <Button
											variant="outlined"
											color="primary"
											size="large"
											className="border-1 normal-case w-full"
										>
											<img
												src="assets/images/social-icons/facebook.png"
												className="h-20 mr-8"
												alt="Facebook"
											/>
											Facebook
										</Button> */}
									</Grid>
									<Grid item xs={6}>
										<GoogleLoginComponent />
										{/* <Button
											variant="outlined"
											color="primary"
											size="large"
											className="border-1 normal-case w-full"
										>
											<img
												src="assets/images/social-icons/google.png"
												className="h-20 mr-8"
												alt="Google"
											/>
											Google
										</Button> */}
									</Grid>
								</Grid>

								<div className="my-28 flex items-center justify-center or-container">
									<Divider className="w-full" />
									<span className="mx-8 font-size-16 whitespace-no-wrap text-muted">
										{t('OR_SIGN_IN_WITH_EMAIL')}
									</span>
									<Divider className="w-full" />
								</div>

								<JWTLoginTab />

								<div className="flex items-center justify-center w-full pt-28">
									<span className="text-custom font-600 mr-6"> {t('DONT_HAVE_AN_ACCOUNT_ASK')}</span>
									<Link className="text-primary font-600 inline" to="/pages/auth/register">
										{t('SIGN_UP')}
									</Link>
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

export default LoginPage;
