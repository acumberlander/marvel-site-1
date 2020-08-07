import React, { Component } from "react";
import "./CardTileComponent.scss";

export class CardTileComponent extends Component {
  render() {
    return (
      <>
        <div className="card-tile">
          <span className="card-caption-div">
            <div className="add-icon-div">
              <i className="material-icons add-icon">add_circle_outline</i>
            </div>
            <span className="add-text">Add to Collection</span>
          </span>
          <img src={this.props.image} alt={this.props.name} />
        </div>
      </>
    );
  }
}

export default CardTileComponent;
