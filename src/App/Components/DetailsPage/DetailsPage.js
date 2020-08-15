import React, { PureComponent } from "react";
import "./DetailsPage.scss";
import CardTileComponent from "../CardTileComponent/CardTileComponent.js";
import contentShape from "./../../Helpers/PropShapes/contentShape";
import data from "../../Helpers/Data/Requests/collectionRequest";
import collectionRequest from "../../Helpers/Data/Requests/collectionRequest";
import authRequests from "../../Helpers/Data/Requests/authRequests";
import userRequests from "../../Helpers/Data/Requests/userRequests";

export class DetailsPage extends PureComponent {
  state = {
    contentItem: contentShape,
    popular: [],
    movies: [],
    comics: [],
    series: [],
    collection: [],
    myCollection: [],
    inCollection: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const contentId = this.props.props.match.params.id;
      const myCollection = this.props.user.collection;
      data.getContentById(contentId).then((res) => {
        this.setState({ contentItem: res, myCollection: myCollection });
      });
    }
  }

  componentDidMount() {
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
    });
  }

  addToCollection = (cItem) => {
    const { contentItem } = this.state;
    cItem = contentItem;
    const uid = this.props.user.uid;
    data.getContentById(cItem.id).then((res) => {
      const addedItem = res;
      data.addCollectionItem(uid, addedItem).then(() => {
        data.getAllCollectionItemsByUid(uid).then((res) => {
          this.setState({ myCollection: res });
        });
      });
    });
  };

  // removeFromCollection = () => {
  //   const { contentItem } = this.state;
  //   // const uid = authRequests.getCurrentUid();
  //   let itemObject = contentItem;

  //   collectionRequest.deleteFromCollection(uid, itemObject);
  // };

  render() {
    const { contentItem } = this.state;
    const { popular, movies, comics, series } = this.state;
    const { user } = this.props;
    const myCollection = user.collection || [];
    const inCollection = (item) => {
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
        />
      );
    });
    const makeButton = (inCollection) => {
      const uid = this.props.user.uid;
      data.getUserCollectionItemsByUid(uid).then((myCollection) => {
        // console.log(myCollection);
      });
    };
    if (contentItem === {}) {
      return <h1 className="mt-5">Loading...</h1>;
    }
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
            {makeButton()}
            <button
              onClick={this.addToCollection}
              type="button"
              className="add-to-list-btn btn btn-primary"
            >
              Add to Collection
            </button>
            <button
              onClick={this.removeFromCollection}
              type="button"
              className="remove-from-list-btn btn btn-danger"
            >
              Remove from Collection
            </button>
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
