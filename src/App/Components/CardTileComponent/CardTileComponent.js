import React, { Component } from "react";
import "./CardTileComponent.scss";
import { Link } from "react-router-dom";
import contentShape from "../../Helpers/PropShapes/contentShape";
import authRequests from "../../Helpers/Data/Requests/authRequests";
import collectionRequest from "../../Helpers/Data/Requests/collectionRequest";

export class CardTileComponent extends Component {
  static propTypes = {
    contentItem: contentShape,
  };

  addToCollection = (e) => {
    e.preventDefault();
    const { addToCollection, contentItem } = this.props;

    addToCollection(contentItem);
  };

  changeView = (e) => {
    e.preventDefault();
    const { changeView, contentItem } = this.props;

    changeView(contentItem);
  };

  removeFromCollection = (e) => {
    e.preventDefault();
    const { removeFromCollection, contentItem } = this.props;

    removeFromCollection(contentItem);
  };

  render() {
    const { contentItem, inCollection, image, name } = this.props;
    const contentDetails = `/details/${contentItem.id}`;
    if (!inCollection) {
      return (
        <>
          <div className="card-tile">
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
            <Link to={contentDetails} onClick={this.refreshState}>
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
              <div onClick={this.removeFromCollection} className="add-icon-div">
                <i className="material-icons add-icon">delete</i>
              </div>
              <span className="add-text">Remove from Collection</span>
            </span>
            <Link to={contentDetails} onClick={this.refreshState}>
              <img src={image} alt={name} />
            </Link>
          </div>
        </>
      );
    }
  }
}

export default CardTileComponent;
