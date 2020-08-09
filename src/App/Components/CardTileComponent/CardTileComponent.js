import React, { Component } from "react";
import "./CardTileComponent.scss";
import { Link } from "react-router-dom";
import contentShape from "../../Helpers/PropShapes/contentShape";

export class CardTileComponent extends Component {
  static propTypes = {
    contentItem: contentShape,
  };

  render() {
    const { contentItem } = this.props;
    const contentDetails = `/details/${contentItem.id}`;
    return (
      <>
        <div className="card-tile">
          <span className="card-caption-div">
            <div className="add-icon-div">
              <i className="material-icons add-icon">add_circle_outline</i>
            </div>
            <span className="add-text">Add to Collection</span>
          </span>
          <Link to={contentDetails}>
            <img src={this.props.image} alt={this.props.name} />
          </Link>
        </div>
      </>
    );
  }
}

export default CardTileComponent;
