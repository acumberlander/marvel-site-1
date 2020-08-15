import React, { PureComponent } from "react";
import "./DetailsPage.scss";
import CardTileComponent from "../CardTileComponent/CardTileComponent.js";
import contentShape from "./../../Helpers/PropShapes/contentShape";
import data from "../../Helpers/Data/Requests/collectionRequest";

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
      user: this.props.user || [],
      myCollection: this.props.user.collection || [],
      isInCollection: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const contentId = this.props.props.match.params.id;
      data.getContentById(contentId).then((res) => {
        this.setState({ contentItem: res });
        this.isInCollectionCheck(res);
      });
    }
  }

  componentDidMount() {
    // console.log(this.props.user);
    data.getCollection().then((res) => {
      this.setState({
        popular: res.Popular,
        movies: res.Movies,
        comics: res.Comics,
        series: res.Series,
      });
    });

    const contentId = this.props.props.match.params.id;
    data.getContentById(contentId).then((res) => {
      this.setState({ contentItem: res });
      this.isInCollectionCheck(res);
    });
  }

  isInCollectionCheck = (contentItem) => {
    const { user } = this.props;
    const uid = user.uid;
    const myCollection = user.collection || [];
    const filteredArr = myCollection.filter((i) => i.id === contentItem.id);
    const isInCollection = filteredArr.length > 0 ? true : false;
    data.getUserCollectionItemsByUid(uid).then((res) => {
      console.log(res);
      this.setState({ isInCollection, myCollection: res });
    });

    return isInCollection;
  };

  addToCollection = (cItem) => {
    const { contentItem } = this.state;
    const uid = this.props.user.uid;
    cItem = contentItem;

    data.getContentById(cItem.id).then((res) => {
      const addedItem = res;
      data.addCollectionItem(uid, addedItem).then(() => {
        data.getUserCollectionItemsByUid(uid).then((res) => {
          this.setState({ myCollection: res, isInCollection: true });
        });
      });
    });
  };

  removeFromCollection = () => {
    const { contentItem } = this.state;
    const uid = this.props.user.uid;
    let itemObject = contentItem;

    data.deleteFromCollection(uid, itemObject);
    data.getUserCollectionItemsByUid(uid).then((res) => {
      this.setState({ mycollection: res, isInCollection: false });
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
    } = this.state;
    const inCollection = (item) => {
      const myCollection = this.props.user.collection || [];
      const filteredArr = myCollection.filter((i) => i.id === item.id);
      const inCollection = filteredArr.length > 0 ? true : false;
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
        />
      );
    });
    const addOrRemoveButton = () => {
      return (
        <>
          <button
            onClick={this.addToCollection}
            type="button"
            className={`${
              isInCollection ? "inactive" : "active"
            } add-to-list-btn btn btn-primary`}
          >
            Add to Collection
          </button>
          <button
            onClick={this.removeFromCollection}
            type="button"
            className={`${
              isInCollection ? "active" : "inactive"
            } remove-from-list-btn btn btn-danger`}
          >
            Remove from Collection
          </button>
        </>
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
            {addOrRemoveButton()}
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
          <section className="slider-row">
            {this.state.myCollection && popularRow}
          </section>
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
