import React, { Component } from "react";
import "./ProfilePage.scss";
// import CardTileComponent from "../../Components/CardTileComponent/CardTileComponent";
// import authRequests from "../../Helpers/Data/Requests/authRequests";
// import userRequests from "../../Helpers/Data/Requests/userRequests";

export class ProfilePage extends Component {
  state = {
    user: {},
  };

  componentDidMount() {}

  render() {
    // const { user } = this.state;
    // const userItems = user.collection;
    // const myCollection = userItems.map((item) => {
    //   return (
    //     <CardTileComponent
    //       contentItem={item}
    //       key={item.id}
    //       image={item.image_src}
    //       name={item.name}
    //     />
    //   );
    // });
    return (
      <div>
        <div className="profile-page-container">
          <div className="profile-image-and-name">
            <div className="image-div">
              <img
                src="https://s3-us-east-2.amazonaws.com/redefined/wp-content/uploads/2019/11/12161154/sonic_paramount.jpg"
                alt="Sonic Profile Pic"
                className="profile-pic"
              ></img>
            </div>
            <h2>Testing</h2>
            {/* {myCollection} */}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
