import FuseAnimate from '@fuse/core/FuseAnimate';
import { Card, Icon, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const NoteLabel = loadable(() => import('./NoteLabel'));
const NoteReminderLabel = loadable(() => import('./NoteReminderLabel'));
const setDescriptionStyle = loadable(() => import('./setDescriptionStyle'));

function NoteListItem(props) {
	const dispatch = useDispatch();

	return (
		<FuseAnimate animation="transition.fadeIn" duration={400} delay={100}>
			<Card
				className={clsx('cursor-pointer', props.className)}
				onClick={() => dispatch(Actions.openNoteDialog(props.note.id))}
			>
				{props.note.image && props.note.image !== '' && (
					<img src={props.note.image} className="w-full block" alt="note" />
				)}

				{props.note.title && props.note.title !== '' && (
					<Typography className="p-16 pb-8 text-14 font-bold">{props.note.title}</Typography>
				)}

				{props.note.description && props.note.description !== '' && (
					<Typography className="py-8 px-16" component="div">
						<div
							className={clsx('w-full break-words', props.variateDescSize ? 'font-200' : 'text-14')}
							ref={el => {
								setTimeout(() =>
									setDescriptionStyle(props.note.description, el, props.variateDescSize)
								);
							}}
						>
							{props.note.description}
						</div>
					</Typography>
				)}

				{props.note.checklist && props.note.checklist.length > 0 && (
					<ul className="py-8 px-16 flex flex-wrap list-reset">
						{props.note.checklist.map(item => (
							<li key={item.id} className="flex items-center w-full">
								<Icon color="action" className="text-16">
									{item.checked ? 'check_box_outline' : 'check_box_outline_blank'}
								</Icon>
								<Typography
									className={clsx('truncate mx-8', item.checked && 'line-through')}
									color={item.checked ? 'textSecondary' : 'inherit'}
								>
									{item.text}
								</Typography>
							</li>
						))}
					</ul>
				)}

				{(props.note.labels.length > 0 || props.note.reminder) && (
					<div className="py-8 px-16 flex flex-wrap w-full -mx-2">
						{props.note.reminder && <NoteReminderLabel className="mt-4 mx-2" date={props.note.reminder} />}
						{props.note.labels.map(id => (
							<NoteLabel id={id} key={id} className="mt-4 mx-2" linkable />
						))}
					</div>
				)}
			</Card>
		</FuseAnimate>
	);
}

export default NoteListItem;
