import React, { PureComponent } from "react";
import "./SearchContentItem.scss";
import contentShape from "./../../Helpers/PropShapes/contentShape";
import { Link } from "react-router-dom";

export default class SearchContentItem extends PureComponent {
  static propTypes = {
    contentItem: contentShape,
  };

  render() {
    const { contentItem } = this.props;
    const contentDetails = `details/${contentItem.id}`;

    return (
      <tr className="search-table-item">
        <td className="image-div">
          <img
            className="search-image"
            src={contentItem.image_src}
            alt={contentItem.name}
          />
        </td>
        <td className="row-name">
          <div className="search-name-header">{contentItem.name}</div>
        </td>
        <td className="row-description">
          <div className="description-div">{contentItem.description}</div>
        </td>
      </tr>
    );
  }
}
