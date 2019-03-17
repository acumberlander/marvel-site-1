import React from 'react';
import marvelRequests from '../Data/Requests/marvelRequests';
import SingleCharacter from '../SingleCharacter/SingleCharacter';
import './Characters.scss';
import { reject } from 'q';

class Characters extends React.Component {
  state = {
    characters: [],
    comics: []
  }

  
  componentDidMount() {
    marvelRequests.getCharacters()
    .then((characters) => {
      this.setState({ characters });
      console.log(characters);
    })
    .catch((error) => {
      console.error('error on getting all characters', error);
    });
  } 
  
 

  
  render() {
      const {
        characters,
      } = this.state;
      const singleCharacterComponents = characters.map(character => (
        <SingleCharacter 
          character={character}
          key={character.id}
        />
        ));
        return (
          <div className="text-center">
            <div className="characterCards">
                {singleCharacterComponents}
            </div>
          </div>
        );
    }
}


export default Characters;