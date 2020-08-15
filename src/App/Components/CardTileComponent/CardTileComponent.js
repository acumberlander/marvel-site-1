import React, { PureComponent } from "react";
import "./CardTileComponent.scss";
import { Link } from "react-router-dom";
import contentShape from "../../Helpers/PropShapes/contentShape";

export class CardTileComponent extends PureComponent {
  static propTypes = {
    contentItem: contentShape,
  };

  state = {
    inCollection: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({ inCollection: this.props.inCollection });
    }
  }

  inCollection = (e) => {
    e.preventDefault();
    const { inCollection, item } = this.props;

    inCollection(item);
  };

  changeView = () => {
    const { changeView, contentItem } = this.props;

    changeView(contentItem);
  };

  addToCollection = (e) => {
    e.preventDefault();
    this.setState({ inCollection: true });
    const { addToCollection, contentItem } = this.props;

    addToCollection(contentItem);
  };

  removeFromCollection = () => {
    this.setState({ inCollection: false });
    const { removeFromCollection, contentItem } = this.props;

    removeFromCollection(contentItem);
  };

  render() {
    const { contentItem, image, name } = this.props;
    const { inCollection } = this.state;
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
            <Link to={contentDetails}>
              <img src={image} alt={name} />
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div id={contentItem.id} className="card-tile">
            <span className="card-caption-div">
              <div onClick={this.removeFromCollection} className="add-icon-div">
                <i className="material-icons add-icon">delete</i>
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
