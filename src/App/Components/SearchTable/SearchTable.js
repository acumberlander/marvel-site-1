import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import contentShape from "../../Helpers/PropShapes/contentShape";
import SearchContentItem from "../SearchContentItem/SearchContentItem";
import "./SearchTable.scss";

export default class SearchTable extends PureComponent {
  static propTypes = {
    collection: PropTypes.arrayOf(contentShape),
  };

  render() {
    const { collection, propData } = this.props;
    const goToItem = (contentItem) => {
      const contentDetails = `/details/${contentItem.id}`;
      window.location.assign(contentDetails);
    };

    const searchContentItemComponents = collection.map((contentItem) => (
      <div onClick={() => goToItem(contentItem)}>
        <SearchContentItem
          propData={propData}
          contentItem={contentItem}
          key={contentItem.id}
        />
      </div>
    ));

    return (
      <Table hover className="searchTable">
        <thead className="tableHeader">
          <tr>
            <th>Content Cover</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody className="searchText">{searchContentItemComponents}</tbody>
      </Table>
    );
  }
}
