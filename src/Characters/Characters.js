import React from 'react';
import marvelRequests from '../Data/Requests/marvelRequests';
import SingleCharacter from '../SingleCharacter/SingleCharacter';
import './Characters.scss';
// import { reject } from 'q';

class Characters extends React.Component {
  state = {
    characters: [],
    comics: []
  }
  
  componentDidMount() {
    marvelRequests.getCharacters()
    .then((characters) => {
      let charArray = [];
      for(let i=0; i<30; i++) {
        if(characters[i] !== undefined) {
          charArray.push(characters[i])
        }
      }
      this.setState({ characters: [...charArray] });
      console.log(charArray);
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