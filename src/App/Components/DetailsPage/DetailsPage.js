import React, { PureComponent } from 'react';
import './DetailsPage.scss';
import CardTileComponent from '../CardTileComponent/CardTileComponent.js';
import contentShape from '../../Helpers/PropShapes/contentShape';
import data from '../../Helpers/Data/Requests/collectionRequest';
import { Button } from 'reactstrap';
export class DetailsPage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			contentItem: contentShape,
			popular: [],
			movies: [],
			comics: [],
			series: [],
			collection: [],
			user: this.props.user,
			myCollection: this.props.user.collection,
			isInCollection: false,
			inCollection: false,
			isSignedIn: false,
		};
	}

	// Lifecycles
	componentDidMount() {
		data.getCollection().then((res) => {
			this.setState({
				collection: [
					...res.Popular,
					...res.Movies,
					...res.Comics,
					...res.Series,
				],
				popular: res.Popular,
				movies: res.Movies,
				comics: res.Comics,
				series: res.Series,
			});
		});

		const contentId = this.props.props.match.params.id;
		const { user } = this.state;
		data.getContentById(contentId).then((contentItem) => {
			this.setState({ contentItem: contentItem });
			this.isInCollectionCheck(contentItem, user);
		});

		if (Object.entries(user).length) {
			this.setState({ isSignedIn: true });
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			const contentId = this.props.props.match.params.id;
			const user = this.props.user;
			const myCollection = user.collection;

			if (user !== prevProps.user) {
				this.setState({ isSignedIn: true });
			} else {
				this.setState({ isSignedIn: false });
			}

			data.getContentById(contentId).then((res) => {
				this.setState({ contentItem: res, myCollection: myCollection });
				this.isInCollectionCheck(res, user);
			});
		}
	}

	// Method for currently displayed item
	isInCollectionCheck = (contentItem, user) => {
		const uid = user.uid;
		const myCollection = user.collection || [];
		const filteredArr = myCollection.filter((i) => i.id === contentItem.id);
		const isInCollection = filteredArr.length > 0 ? true : false;

		data.getUserCollectionItemsByUid(uid).then((res) => {
			this.setState({
				isInCollection: isInCollection,
				myCollection: res,
			});
		});
	};

	// Add & Delete from User Collection
	addToCollection = (contentItem) => {
		const user = this.props.user;
		const uid = user.uid;
		data.addCollectionItem(uid, contentItem).then((res) => {
			data.getUserCollectionItemsByUid(uid).then((res) => {
				this.setState({ myCollection: res, isInCollection: true });
			});
		});
	};

	removeFromCollection = (contentItem) => {
		const user = this.props.user;
		const uid = user.uid;
		data.deleteFromCollection(uid, contentItem).then(() => {
			data.getUserCollectionItemsByUid(uid).then((res) => {
				this.setState({ myCollection: res, isInCollection: false });
			});
		});
	};

	render() {
		const {
			contentItem,
			isInCollection,
			popular,
			movies,
			comics,
			series,
			isSignedIn,
		} = this.state;

		const inCollection = (item) => {
			const myCollection = this.props.user.collection || [];
			const filteredArr = myCollection.filter((i) => i.id === item.id);
			const inCollection = filteredArr.length > 0 ? true : false;
			this.setState({ inCollection: inCollection });
			return inCollection;
		};

		const popularRow = popular.map((item) => {
			return (
				<CardTileComponent
					contentItem={item}
					key={item.id}
					image={item.image_src}
					name={item.name}
					inCollection={inCollection(item)}
					addToCollection={this.addToCollection}
					removeFromCollection={this.removeFromCollection}
					isSignedIn={isSignedIn}
				/>
			);
		});
		const comicsRow = comics.map((item) => {
			return (
				<CardTileComponent
					contentItem={item}
					key={item.id}
					image={item.image_src}
					name={item.name}
					inCollection={inCollection(item)}
					addToCollection={this.addToCollection}
					removeFromCollection={this.removeFromCollection}
					isSignedIn={isSignedIn}
				/>
			);
		});
		const moviesRow = movies.map((item) => {
			return (
				<CardTileComponent
					contentItem={item}
					key={item.id}
					image={item.image_src}
					name={item.name}
					inCollection={inCollection(item)}
					addToCollection={this.addToCollection}
					removeFromCollection={this.removeFromCollection}
					isSignedIn={isSignedIn}
				/>
			);
		});
		const seriesRow = series.map((item) => {
			return (
				<CardTileComponent
					contentItem={item}
					key={item.id}
					image={item.image_src}
					name={item.name}
					inCollection={inCollection(item)}
					addToCollection={this.addToCollection}
					removeFromCollection={this.removeFromCollection}
					isSignedIn={isSignedIn}
				/>
			);
		});
		const inCollectionDisplay = () => {
			return (
				<div class="header-display-container">
					<div
						className={`${
							isInCollection ? 'active' : 'inactive'
						} in-collection`}
					>
						<div>
							{isSignedIn ? (
								<>
									<div>
										<p>In Your Collection</p>
										<span class="checkmark material-icons">done</span>
									</div>

									<Button
										color="danger"
										onClick={(e) => {
											this.removeFromCollection(contentItem);
										}}
									>
										Remove from Collection
									</Button>
								</>
							) : null}
						</div>
					</div>

					<div
						className={`${
							isInCollection ? 'inactive' : 'active'
						} not-in-collection`}
					>
						<div>
							{isSignedIn ? (
								<>
									<div>
										<p>Not In Collection</p>
										<span class="cancel material-icons">close</span>
									</div>

									<Button
										color="success"
										onClick={(e) => {
											this.addToCollection(contentItem);
										}}
									>
										Add to Collection
									</Button>
								</>
							) : null}
						</div>
					</div>
				</div>
			);
		};
		return (
			<div className="detail-page-container">
				<div className="top-area">
					<div id="first-column">
						<h2>{contentItem.name}</h2>
						<img
							className="content-image"
							src={contentItem.image_src}
							alt={contentItem.name}
						/>
						<div className="misc-details">
							<span>Publisher: {contentItem.publisher}</span>
							<span>Date: {contentItem.date}</span>
							<span>Type: {contentItem.type}</span>
						</div>
						{inCollectionDisplay()}
					</div>
					<div id="second-column">
						<div className="video-header-div">
							<h2>Video</h2>
						</div>
						<iframe
							title={contentItem.name}
							className="video-player"
							width="65vw"
							height="60vh"
							src={contentItem.yt_link}
							frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
						<div className="details-header-div">
							<h2>Details</h2>
						</div>
						<div className="details-column-container">
							<p>{contentItem.description}</p>
						</div>
					</div>
				</div>
				<div className="row-container">
					<h2 className="header">Popular</h2>
					<section className="slider-row">{popularRow}</section>
					<h2 className="header">Comics</h2>
					<section className="slider-row">{comicsRow}</section>
					<h2 className="header">Movies</h2>
					<section className="slider-row">{moviesRow}</section>
					<h2 className="header">Series</h2>
					<section className="slider-row">{seriesRow}</section>
				</div>
			</div>
		);
	}
}

export default DetailsPage;
