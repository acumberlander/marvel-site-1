import React, { PureComponent } from "react";
import "./SearchContentItem.scss";
import contentShape from "./../../Helpers/PropShapes/contentShape";

export default class SearchContentItem extends PureComponent {
  static propTypes = {
    contentItem: contentShape,
  };

  render() {
    const { contentItem } = this.props;
    const goToDetailsPage = () => {
      const productDetails = `details/${contentItem.id}`;
      window.location.assign(productDetails);
    };

    return (
      <tr className="searchTableItem" onClick={goToDetailsPage}>
        <tb>
          <img
            className="searchImage"
            src={contentItem.image_src}
            alt={contentItem.name}
          />
        </tb>
        <th>
          <div className="">{contentItem.name}</div>
        </th>
      </tr>
    );
  }
}
