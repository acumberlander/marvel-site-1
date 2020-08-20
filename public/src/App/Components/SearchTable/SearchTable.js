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

    const searchContentItemComponents = collection.map((contentItem) => (
      <SearchContentItem
        propData={propData}
        contentItem={contentItem}
        key={contentItem.id}
      />
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
