import React, { PureComponent } from "react";
import "./ProfilePage.scss";
import data from "../../Helpers/Data/Requests/collectionRequest";
import CardTileComponent from "../CardTileComponent/CardTileComponent";

export class ProfilePage extends PureComponent {
  state = {
    user: this.props.user,
    myCollection: this.props.user.collection,
    inCollection: this.props.inCollection,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const user = this.props.user;
      this.setState({ user });
    }
  }

  removeFromCollection = (contentItem) => {
    const uid = this.props.user.uid;
    data.deleteFromCollection(uid, contentItem).then(() => {
      data.getUserCollectionItemsByUid(uid).then((res) => {
        this.setState({ myCollection: res });
      });
    });
  };

  render() {
    const { user } = this.state;
    const { inCollection } = this.props;
    const collection = user.collection;

    const myCollection = collection ? (
      collection.map((item) => (
        <CardTileComponent
          contentItem={item}
          key={item.id}
          image={item.image_src}
          name={item.name}
          inCollection={inCollection}
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
                src="https://static3.srcdn.com/wordpress/wp-content/uploads/2020/06/Miles-Morales-Spider-Man.jpg"
                alt="Miles Profile Pic"
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
