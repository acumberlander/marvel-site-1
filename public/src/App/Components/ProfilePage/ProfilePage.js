import React, { PureComponent } from "react";
import "./ProfilePage.scss";
import data from "../../Helpers/Data/Requests/collectionRequest";
import CardTileComponent from "../CardTileComponent/CardTileComponent";
import userRequests from "../../Helpers/Data/Requests/userRequests";

export class ProfilePage extends PureComponent {
  state = {
    user: this.props.user,
    myCollection: this.props.user.collection,
    inCollection: true,
  };

  componentDidMount() {
    const uid = this.props.user.uid;
    data.getUserCollectionItemsByUid(uid).then((res) => {
      this.setState({ myCollection: res });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const uid = this.props.user.uid;
      userRequests.getUserByUid(uid).then((user) => {
        data.getUserCollectionItemsByUid(uid).then((myCollection) => {
          this.setState({ user, myCollection });
        });
      });
    }
  }

  render() {
    const { user, inCollection, myCollection } = this.state;
    const removeFromCollection = (contentItem) => {
      const uid = this.props.user.uid;
      const newArray = myCollection.filter((item) => item !== contentItem);
      data.deleteFromCollection(uid, contentItem).then(() => {
        userRequests.getUserByUid(uid).then((user) => {
          this.setState({ user: user, myCollection: newArray });
        });
      });
    };

    const displayedCollection = myCollection ? (
      myCollection.map((item) => (
        <CardTileComponent
          contentItem={item}
          key={item.id}
          image={item.image_src}
          name={item.name}
          inCollection={inCollection}
          removeFromCollection={removeFromCollection}
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
            <div className="item-container">{displayedCollection}</div>
          </div>
        </div>
      </>
    );
  }
}

export default ProfilePage;
