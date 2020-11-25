import React, { PureComponent } from 'react';
import './CardTileComponent.scss';
import { Link } from 'react-router-dom';
import contentShape from '../../Helpers/PropShapes/contentShape';

export class CardTileComponent extends PureComponent {
	static propTypes = {
		contentItem: contentShape,
	};

	state = {
		inCollection: this.props.inCollection,
		isSignedIn: this.props.isSignedIn,
	};

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({ inCollection: this.props.inCollection });
		}
	}

	inCollection = (e) => {
		e.preventDefault();
		const { inCollection, item } = this.props;

		inCollection(item);
	};

	changeView = () => {
		const { changeView, contentItem } = this.props;

		changeView(contentItem);
	};

	addToCollection = (e) => {
		e.preventDefault();
		this.setState({ inCollection: true });
		const { addToCollection, contentItem } = this.props;

		addToCollection(contentItem);
	};

	removeFromCollection = (e) => {
		e.preventDefault();
		this.setState({ inCollection: false });
		const { removeFromCollection, contentItem } = this.props;

		removeFromCollection(contentItem);
	};

	render() {
		const { contentItem, image, name, isSignedIn } = this.props;
		const { inCollection } = this.state;
		const contentDetails = `/details/${contentItem.id}`;
		const captionBuilder = () => {
			if (isSignedIn && !inCollection) {
				return (
					<span className="card-caption-div">
						<div
							id={contentItem.id}
							onClick={this.addToCollection}
							className="add-icon-div"
						>
							<i className="material-icons add-icon">add_circle_outline</i>
						</div>
						<span className="add-text">Add to Collection</span>
					</span>
				);
			}
			if (isSignedIn && inCollection) {
				return (
					<span className="card-caption-div">
						<div onClick={this.removeFromCollection} className="add-icon-div">
							<i className="material-icons add-icon">delete</i>
						</div>
						<span className="add-text">Remove from Collection</span>
					</span>
				);
			}
		};
		if (!inCollection) {
			return (
				<>
					<div className="card-tile">
						{captionBuilder()}
						<Link to={contentDetails}>
							<img src={image} alt={name} />
						</Link>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div id={contentItem.id} className="card-tile">
						{captionBuilder()}
						<Link to={contentDetails}>
							<img src={image} alt={name} />
						</Link>
					</div>
				</>
			);
		}
	}
}

export default CardTileComponent;

// import React, { useState, useEffect, useRef } from 'react';
// import './CardTileComponent.scss';
// import { Link } from 'react-router-dom';
// import contentShape from '../../Helpers/PropShapes/contentShape';

// const usePrevious = (value) => {
// 	const ref = useRef();
// 	useEffect(() => {
// 		ref.current = value;
// 	});
// 	return ref.current;
// };

// const CardTileComponent = (props) => {
// 	const { _inCollection, _isSignedIn, _image, _name, _contentItem } = props;
// 	const prevProps = usePrevious({ _inCollection, _isSignedIn });
// 	const [inCollection, setInCollection] = useState(_inCollection);
// 	const [isSignedIn, setIsSignedIn] = useState(_isSignedIn);

// 	const contentDetails = `/details/${_contentItem.id}`;

// 	useEffect(() => {
// 		if (prevProps !== props) {
// 			setInCollection(_inCollection);
// 		}
// 	}, []);

// 	const inCollection = (e) => {
// 		e.preventDefault();
// 		const { _inCollection, _item } = this.props;

// 		_inCollection(_item);
// 	};

// 	const changeView = () => {
// 		const { _changeView, _contentItem } = this.props;

// 		_changeView(_contentItem);
// 	};

// 	const addToCollection = (e) => {
// 		e.preventDefault();
// 		this.setState({ inCollection: true });
// 		const { _addToCollection, _contentItem } = this.props;

// 		_addToCollection(_contentItem);
// 	};

// 	const removeFromCollection = (e) => {
// 		e.preventDefault();
// 		this.setState({ inCollection: false });
// 		const { _removeFromCollection, _contentItem } = this.props;

// 		_removeFromCollection(_contentItem);
// 	};

// 	const captionBuilder = () => {
// 		if (isSignedIn && !inCollection) {
// 			return (
// 				<span className="card-caption-div">
// 					<div
// 						id={contentItem.id}
// 						onClick={this.addToCollection}
// 						className="add-icon-div"
// 					>
// 						<i className="material-icons add-icon">add_circle_outline</i>
// 					</div>
// 					<span className="add-text">Add to Collection</span>
// 				</span>
// 			);
// 		}
// 		if (isSignedIn && inCollection) {
// 			return (
// 				<span className="card-caption-div">
// 					<div onClick={this.removeFromCollection} className="add-icon-div">
// 						<i className="material-icons add-icon">delete</i>
// 					</div>
// 					<span className="add-text">Remove from Collection</span>
// 				</span>
// 			);
// 		}
// 	};

// 	return (
// 		<>
// 			{!inCollection ? (
// 				<div className="card-tile">
// 					{captionBuilder()}
// 					<Link to={contentDetails}>
// 						<img src={_image} alt={_name} />
// 					</Link>
// 				</div>
// 			) : (
// 				<div id={_contentItem.id} className="card-tile">
// 					{captionBuilder()}
// 					<Link to={contentDetails}>
// 						<img src={_image} alt={_name} />
// 					</Link>
// 				</div>
// 			)}
// 		</>
// 	);
// };
