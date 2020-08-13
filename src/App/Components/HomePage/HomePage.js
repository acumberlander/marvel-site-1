import React, { Component } from "react";
import "./HomePage.scss";
import data from "../../Helpers/Data/Requests/collectionRequest";
import { Carousel } from "react-bootstrap";
import CardTileComponent from "../CardTileComponent/CardTileComponent.js";
import authRequests from "../../Helpers/Data/Requests/authRequests";
import userRequests from "../../Helpers/Data/Requests/userRequests";

export class HomePage extends Component {
  state = {
    popular: [],
    movies: [],
    comics: [],
    series: [],
    myCollection: [],
    inCollection: false,
    user: {},
  };

  // componentDidUpdate(prevProps) {
  //   if (this.props.user !== prevProps.user) {
  //     this.fetchData(this.props.user);
  //   }
  // }

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

  refreshState = (item) => {
    const contentItem = item;
    this.setState({ contentItem: contentItem });
  };

  changeView = (item) => {
    const view = item.id;
    const location = {
      pathname: `/${view}`,
    };
    this.props.history.push(location);
  };

  addToCollection = (contentItem) => {
    const uid = authRequests.getCurrentUid();
    data.getContentById(contentItem.id).then((res) => {
      const addedItem = res;
      data.addCollectionItem(uid, addedItem).then(() => {
        data.getAllCollectionItemsByUid(uid).then((res) => {
          this.setState({ myCollection: res });
        });
      });
    });
  };

  render() {
    const { popular, comics, movies, series } = this.state;
    const { user } = this.props;
    const myCollection = user.collection;
    const inCollection = (item) => {
      const filteredArr = myCollection.filter((i) => i.id === item.id);

      return filteredArr.length > 0 ? true : false;
    };

    // Row logic
    const popularRow = popular.map((item) => {
      return (
        <CardTileComponent
          contentItem={item}
          key={item.id}
          image={item.image_src}
          name={item.name}
          inCollection={inCollection}
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
          inCollection={inCollection}
          refreshState={this.refreshState}
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
          inCollection={inCollection}
          refreshState={this.refreshState}
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
          inCollection={inCollection}
          refreshState={this.refreshState}
          addToCollection={this.addToCollection}
        />
      );
    });
    return (
      <div>
        <div className="homepage-container">
          <div id="top-carousel">
            <Carousel>
              <Carousel.Item>
                <div className="item-container">
                  <img
                    className="top-carousel-image"
                    src="https://images4.alphacoders.com/953/thumb-1920-953244.jpg"
                    alt="Spider-Man"
                  />
                  <Carousel.Caption className="top-caption">
                    <div className="caption-text-container">
                      <h3>Spider-Man: Into the Spider-Verse</h3>
                      <p>
                        Bitten by a radioactive spider in the subway, Brooklyn
                        teenager Miles Morales suddenly develops mysterious
                        powers that transform him into the one and only
                        Spider-Man.
                      </p>
                    </div>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="top-carousel-image"
                  src="https://images.alphacoders.com/803/thumb-1920-803177.png"
                  alt="Green Lantern"
                />

                <Carousel.Caption className="top-caption">
                  <div className="caption-text-container">
                    <h3>Green Lantern</h3>
                    <p>
                      John Stewart, one of the characters known as Green
                      Lantern, is a fictional superhero appearing in American
                      comic books published by DC Comics and was the first
                      African-American superhero to appear in DC Comics.
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="top-carousel-image"
                  src="https://images2.alphacoders.com/830/thumb-1920-830602.jpg"
                  alt="Cyborg"
                />

                <Carousel.Caption className="top-caption">
                  <div className="caption-text-container">
                    <h3>Cyborg</h3>
                    <p>
                      Cyborg is a fictional superhero appearing in American
                      comic books published by DC Comics.
                    </p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
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
      </div>
    );
  }
}

export default HomePage;
