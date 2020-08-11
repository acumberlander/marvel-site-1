import React, { Component } from "react";
import "./CardTileComponent.scss";
import { Link } from "react-router-dom";
import contentShape from "../../Helpers/PropShapes/contentShape";
// import authRequests from "../../Helpers/Data/Requests/authRequests";
// import collectionRequest from "../../Helpers/Data/Requests/collectionRequest";

export class CardTileComponent extends Component {
  static propTypes = {
    contentItem: contentShape,
    inCollection: false,
  };

  render() {
    const { contentItem, inCollection, image, name } = this.props;
    const contentDetails = `/details/${contentItem.id}`;
    if (!inCollection) {
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
              <img src={image} alt={name} />
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="card-tile">
            <span className="card-caption-div">
              <div className="add-icon-div">
                <i
                  onClick={this.props.removeFromCollection}
                  className="material-icons add-icon"
                >
                  delete
                </i>
              </div>
              <span className="add-text">Remove from Collection</span>
            </span>
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
