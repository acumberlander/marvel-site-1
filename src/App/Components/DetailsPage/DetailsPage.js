import React, { Component } from "react";
import "./DetailsPage.scss";
import CardTileComponent from "../CardTileComponent/CardTileComponent.js";
import contentShape from "./../../Helpers/PropShapes/contentShape";
import data from "../../Helpers/Data/comicData.json";
import collectionRequest from "../../Helpers/Data/Requests/collectionRequest";
import authRequests from "../../Helpers/Data/Requests/authRequests";

export class DetailsPage extends Component {
  state = {
    contentItem: contentShape,
    popular: data.Popular,
    movies: data.Movies,
    comics: data.Comics,
    series: data.Series,
    collection: [],
  };

  defaultItem = {};

  componentDidMount() {
    const { popular, movies, comics, series } = this.state;
    const contentId = this.props.match.params.id;
    // const uid = authRequests.getCurrentUid();
    // collectionRequest.getAllCollectionItemsByUid(uid).then((collection) => {
    //   collection.filter(item => item.id === contentId);

    //   this.setState({ collection });
    // });
    const getContentById = (id) => {
      id = contentId;
      let contentArray = [...popular, ...movies, ...comics, ...series];
      let contentItem = contentArray.filter((item) => item.id === id)[0];
      this.setState({
        contentItem: contentItem,
      });
    };

    getContentById();
  }

  addToCollection = () => {
    const { contentItem } = this.state;
    const uid = authRequests.getCurrentUid();
    contentItem.uid = uid;
    let itemObject = { ...contentItem };

    collectionRequest
      .addCollectionItem(itemObject)
      .then(() => {
        collectionRequest.getAllCollectionItemsByUid(uid).then((collection) => {
          console.log(collection);
          this.setState({ collection, contentItem });
        });
      })
      .catch((err) => console.error("error with collectionItem post", err));
  };

  removeFromCollection = () => {
    const { contentItem } = this.state;

    collectionRequest.deleteFromCollection(contentItem.collectionId);
  };

  render() {
    const { contentItem } = this.state;
    const { popular, movies, comics, series } = this.state;
    const popularRow = popular.map((item) => {
      return (
        <CardTileComponent
          contentItem={item}
          key={item.id}
          image={item.image_src}
          name={item.name}
          refresh={this.refreshState}
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
        />
      );
    });
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
              className="add-to-list-btn btn btn-danger"
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
              {/* <p>{contentItem.description}</p> */}
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
                delectus voluptatum. Quasi, reprehenderit. Magni, voluptas.
                Optio veniam tempore nemo ad exercitationem eaque velit quo.
                Aliquid, possimus maxime? Culpa recusandae repudiandae
                voluptatum aperiam, amet sunt, earum tempora dolor similique
                voluptates, saepe expedita nihil blanditiis officiis quisquam
                incidunt suscipit dolorum nostrum. Doloremque corrupti
                necessitatibus placeat, optio fuga, dolore iste adipisci natus
                aliquam vitae in ea eius delectus, esse animi unde rerum
                molestias maiores rem odio eaque sapiente eum! Quae, laboriosam,
                ad quidem corporis eligendi et dolores at numquam aut laudantium
                fuga cum! Quod laborum ea unde distinctio atque sit explicabo
                totam error ut blanditiis quos possimus quasi ab, aliquid
                dolorum placeat perferendis, necessitatibus, voluptate libero
                quia aspernatur. Ad sed quasi exercitationem earum, quo rerum
                cumque saepe ex adipisci mollitia aperiam voluptatibus eligendi
                perferendis debitis quisquam facilis rem quas repudiandae unde
                natus. Dolore architecto sequi aliquid provident dignissimos
                dolores temporibus repellendus voluptate enim!
              </p>
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
