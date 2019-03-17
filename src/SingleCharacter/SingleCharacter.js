import React from 'react';
import characterShape from '../characterShape';
import './SingleCharacter.scss';
import Modal from 'react-responsive-modal';
import marvelRequests from '../Data/Requests/marvelRequests';

class SingleCharacter extends React.Component {
static propTypes = {
  character: characterShape.characterShape,
}

state = {
  open: false
}

onOpenModal = () => {
  this.setState({ open: true });
};

onCloseModal = () => {
  this.setState({ open: false });
};

getComics = () => {
  marvelRequests.getComics()
    .then((comics) => {
      this.setState({ comics });
      // console.log(comics);
    })
    .catch((err) => console.error("getComics failed in Character component", err));
};

  render() {
    const { open } = this.state;
    const { character } = this.props;
    const imgBase = character.thumbnail.path;
    const imgSize = "/portrait_uncanny";
    const imgType = "." + character.thumbnail.extension;
    const characterImage = imgBase + imgSize + imgType;

    return(
      <div className="" onClick={this.onOpenModal}>
        <div className="card characterCard">
          <img className="characterPic" alt={character.name} src={characterImage}></img>
        <div className="card characterName">
          <h2>{character.name}</h2>
        </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <div>
            {this.getComics()}
          </div>
        </Modal>
      </div>
  );
  }
}

export default SingleCharacter;