import React, { PureComponent } from "react";
import "./HomePage.scss";
import data from "../../Helpers/Data/Requests/collectionRequest";
import { Carousel } from "react-bootstrap";
import CardTileComponent from "../CardTileComponent/CardTileComponent.js";

export class HomePage extends PureComponent {
  state = {
    popular: [],
    movies: [],
    comics: [],
    series: [],
    myCollection: [],
    inCollection: false,
    user: {},
  };

  // Lifecycles
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

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const contentId = this.props.props.match.params.id;
      const myCollection = this.props.user.collection;
      data.getContentById(contentId).then((res) => {
        this.setState({ contentItem: res, myCollection: myCollection });
      });
    }
  }

  // Add & Delete from User Collection
  addToCollection = (contentItem) => {
    const uid = this.props.user.uid;
    data.addCollectionItem(uid, contentItem).then(() => {
      data.getUserCollectionItemsByUid(uid).then((res) => {
        this.setState({ myCollection: res });
      });
    });
  };

  removeFromCollection = (contentItem) => {
    // this.setState({})
    const uid = this.props.user.uid;
    data.deleteFromCollection(uid, contentItem).then(() => {
      data.getUserCollectionItemsByUid(uid).then((res) => {
        this.setState({ myCollection: res });
      });
    });
  };

  render() {
    const { popular, comics, movies, series } = this.state;
    const { user } = this.props;
    const myCollection = user.collection || [];
    const inCollection = (item) => {
      const filteredArr = myCollection.filter((i) => i.id === item.id);
      const inCollection = filteredArr.length > 0 ? true : false;
      this.setState({ inCollection: inCollection });
      return inCollection;
    };

    // attempt to fix repeat declarations
    // const contentArr = [popular, comics, movies, series];
    // const rowArray = [popularRow, comicsRow, moviesRow, seriesRow];
    // for (let i=0; i<rowArray.length; i++) {
    //   let rowArray[i] = contentArr[i].map((item) => {
    //     return (
    //       <CardTileComponent
    //         contentItem={item}
    //         key={item.id}
    //         image={item.image_src}
    //         name={item.name}
    //         inCollection={inCollection(item)}
    //         addToCollection={this.addToCollection}
    //         removeFromCollection={this.removeFromCollection}
    //       />
    //     );
    //   })
    // }

    // Row logic
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
