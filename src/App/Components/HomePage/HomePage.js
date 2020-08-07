import React, { Component } from "react";
import "./HomePage.scss";
import { Carousel } from "react-bootstrap";
import CardTileComponent from "../CardTileComponent/CardTileComponent.js";
import data from "../../Helpers/Data/comicData.json";

export class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      popular: data.Popular,
      movies: data.Movies,
      comics: data.Comics,
      series: data.Series,
    };
  }
  componentDidMount() {
    // comicVine.getCharacters();
  }

  render() {
    const { popular, comics, movies, series } = this.state;
    // Row logic
    const popularRow = popular.map((item) => {
      return (
        <CardTileComponent
          key={item.id}
          image={item.image_src}
          name={item.name}
        />
      );
    });
    const comicsRow = comics.map((item) => {
      return (
        <CardTileComponent
          key={item.id}
          image={item.image_src}
          name={item.name}
        />
      );
    });
    const moviesRow = movies.map((item) => {
      return (
        <CardTileComponent
          key={item.id}
          image={item.image_src}
          name={item.name}
        />
      );
    });
    const seriesRow = series.map((item) => {
      return (
        <CardTileComponent
          key={item.id}
          image={item.image_src}
          name={item.name}
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
