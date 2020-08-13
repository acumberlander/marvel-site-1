import React, { Component, PureComponent } from "react";
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

  componentDidMount() {
    data.getCollection().then((res) => {
      this.setState({
        popular: res.Popular,
        movies: res.Movies,
        comics: res.Comics,
        series: res.Series,
      });
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     const contentId = this.props.match.params.id;
  //     data.getContentById(contentId).then((res) => {
  //       this.setState({ contentItem: res });
  //     });
  //   }
  // }

  refreshState = (item) => {
    const contentId = item.id;
    data.getContentById(contentId).then((res) => {
      this.setState({ contentItem: res });
    });
  };

  //alternative option to change views/routing
  //  changeView = (item) => {
  //    const view = item.id;
  //    let location = this.props.location;
  //    location.pathname = `/details/${view}`;
  //    this.props.history.push(location);
  //  };

  addToCollection = (cItem) => {
    const { contentItem } = this.state;
    cItem = contentItem;
    const uid = this.props.user.uid;
    data.getContentById(cItem.id).then((res) => {
      const addedItem = res;
      data.addCollectionItem(uid, addedItem).then(() => {
        data.getAllCollectionItemsByUid(uid).then((res) => {
          console.log(res);
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
    const contentId = this.props.match.params.id;
    data.getContentById(contentId).then((res) => {
      this.setState({ contentItem: res });
    });

    const { popular, movies, comics, series } = this.state;
    const popularRow = popular.map((item) => {
      return (
        <CardTileComponent
          contentItem={item}
          key={item.id}
          image={item.image_src}
          name={item.name}
          refreshState={this.refreshState}
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
          addToCollection={this.addToCollection}
        />
      );
    });
    // const makeButton = (inCollection) => {
    //   // const uid = authRequests.getCurrentUid();
    //   data.getAllCollectionItemsByUid(uid).then((myCollection) => {
    //     console.log(myCollection);
    //   });
    // };
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
            {/* {makeButton()} */}
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
