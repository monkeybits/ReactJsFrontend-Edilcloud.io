import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import {
	AppBar,
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Icon,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function TimelineTab() {
	const [data, setData] = useState(null);

	useEffect(() => {
		axios.get('/api/profile/timeline').then(res => {
			setData(res.data);
		});
	}, []);

	if (!data) {
		return null;
	}

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					{/* <div>
						<Card className="w-full overflow-hidden">
							<Input
								className="p-16 w-full"
								classes={{ root: 'text-14' }}
								placeholder="Write something.."
								multiline
								rows="6"
								margin="none"
								disableUnderline
							/>
							<AppBar
								className="card-footer flex flex-row border-t-1"
								position="static"
								color="default"
								elevation={0}
							>
								<div className="flex-1 items-center">
									<IconButton aria-label="Add photo">
										<Icon>photo</Icon>
									</IconButton>
									<IconButton aria-label="Mention somebody">
										<Icon>person</Icon>
									</IconButton>
									<IconButton aria-label="Add location">
										<Icon>location_on</Icon>
									</IconButton>
								</div>

								<div className="p-8">
									<Button variant="contained" color="primary" size="small" aria-label="post">
										POST
									</Button>
								</div>
							</AppBar>
						</Card>

						<Divider className="my-32" />
					</div> */}

					{data.posts.map(post => (
						<Card key={post.id} className="mb-32 overflow-hidden">
							<CardHeader
								avatar={<Avatar aria-label="Recipe" src={post.user.avatar} />}
								action={
									<IconButton aria-label="more">
										<Icon>more_vert</Icon>
									</IconButton>
								}
								title={
									<span className="flex">
										<Typography className="font-medium" color="primary" paragraph={false}>
											{post.user.name}
										</Typography>
										<span className="mx-4">
											{post.type === 'post' && 'posted on your timeline'}
											{post.type === 'something' && 'shared something with you'}
											{post.type === 'video' && 'shared a video with you'}
											{post.type === 'article' && 'shared an article with you'}
										</span>
									</span>
								}
								subheader={post.time}
							/>

							<CardContent className="py-0">
								{post.message && (
									<Typography component="p" className="mb-16">
										{post.message}
									</Typography>
								)}

								{post.media && <img src={post.media.preview} alt="post" />}

								{post.article && (
									<div className="border-1">
										<img
											className="w-full border-b-1"
											src={post.article.media.preview}
											alt="article"
										/>
										<div className="p-16">
											<Typography variant="subtitle1">{post.article.title}</Typography>
											<Typography variant="caption">{post.article.subtitle}</Typography>
											<Typography className="mt-16">{post.article.excerpt}</Typography>
										</div>
									</div>
								)}
							</CardContent>

							<CardActions disableSpacing className="px-12">
								<Button size="small" aria-label="Add to favorites">
									<Icon className="text-16" color="action">
										favorite
									</Icon>
									<Typography className="normal-case mx-4">Like</Typography>
									<Typography className="normal-case">({post.like})</Typography>
								</Button>
								<Button aria-label="Share">
									<Icon className="text-16" color="action">
										share
									</Icon>
									<Typography className="normal-case mx-4">Share</Typography>
									<Typography className="normal-case">({post.share})</Typography>
								</Button>
							</CardActions>

							<AppBar
								className="card-footer flex flex-column p-16"
								position="static"
								color="default"
								elevation={0}
							>
								{post.comments && post.comments.length > 0 && (
									<div className="">
										<div className="flex items-center">
											<Typography>{post.comments.length} comments</Typography>
											<Icon className="text-16 mx-4" color="action">
												keyboard_arrow_down
											</Icon>
										</div>

										<List>
											{post.comments.map(comment => (
												<div key={comment.id}>
													<ListItem className="px-0 -mx-8">
														<Avatar
															alt={comment.user.name}
															src={comment.user.avatar}
															className="mx-8"
														/>
														<ListItemText
															className="px-4"
															primary={
																<div className="flex">
																	<Typography
																		className="font-medium"
																		color="initial"
																		paragraph={false}
																	>
																		{comment.user.name}
																	</Typography>
																	<Typography className="mx-4" variant="caption">
																		{comment.time}
																	</Typography>
																</div>
															}
															secondary={comment.message}
														/>
													</ListItem>
													<div className="flex items-center mx-52 mb-8">
														<Button className="normal-case">Reply</Button>
														<Icon className="text-14 mx-8 cursor-pointer">flag</Icon>
													</div>
												</div>
											))}
										</List>
									</div>
								)}

								<div className="flex flex-auto">
									<Avatar className="mr-12" src="assets/images/avatars/profile.jpg" />
									<div className="flex-1">
										<Paper elevation={0} className="w-full mb-16">
											<Input
												className="p-8 w-full border-1"
												classes={{ root: 'text-13' }}
												placeholder="Add a comment.."
												multiline
												rows="6"
												margin="none"
												disableUnderline
											/>
										</Paper>
										<Button
											className="normal-case"
											variant="contained"
											color="primary"
											size="small"
										>
											Post Comment
										</Button>
									</div>
								</div>
							</AppBar>
						</Card>
					))}
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default TimelineTab;
