import React, { Component, PureComponent } from "react";
import "./ProfilePage.scss";
import authRequests from "../../Helpers/Data/Requests/authRequests";
import userRequests from "../../Helpers/Data/Requests/userRequests";
import collectionRequest from "../../Helpers/Data/Requests/collectionRequest";
import CardTileComponent from "../CardTileComponent/CardTileComponent";

export class ProfilePage extends PureComponent {
  state = {
    user: {},
  };

  componentDidMount() {
    // const collection = this.props.user.collection;
    // this.setState({ collection });
    // userRequests.getUserByUid(uid).then((user) => {
    //   let collection = user.collection;
    //   this.setState({ user: user, collection: collection });
    // });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const user = this.props.user;
      this.setState({ user });
    }
  }

  refreshState = (item) => {
    const contentItem = item;
    this.setState({ contentItem: contentItem });
  };

  removeFromCollection = (itemObject) => {
    const uid = this.props.user.uid;
    collectionRequest.deleteFromCollection(uid, itemObject).then(() => {
      userRequests.getUserByUid(uid).then((user) => {
        this.setState({ user: user });
      });
    });
  };

  render() {
    const { user } = this.state;
    const collection = user.collection;

    const myCollection = collection ? (
      collection.map((item) => (
        <CardTileComponent
          contentItem={item}
          key={item.id}
          image={item.image_src}
          name={item.name}
          inCollection={true}
          refreshState={this.refreshState}
          removeFromCollection={this.removeFromCollection}
        />
      ))
    ) : (
      <p>You have no items in your collection</p>
    );
    return (
      <>
        <div className="profile-page-container">
          <div className="profile-image-and-name">
            <div className="image-div">
              <img
                src="https://s3-us-east-2.amazonaws.com/redefined/wp-content/uploads/2019/11/12161154/sonic_paramount.jpg"
                alt="Sonic Profile Pic"
                className="profile-pic"
              ></img>
            </div>
            <h2>{user.fullName}</h2>
          </div>
          <hr></hr>
          <div className="collection-div">
            <h2>My Collection</h2>
            <div className="item-container">{myCollection}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ProfilePage;
