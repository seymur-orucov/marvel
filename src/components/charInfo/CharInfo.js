import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  // * Set character info * //
  const onCharLoaded = (char) => {
    setChar(char);
  };

  // * Function for getting character info * //
  const updateChar = () => {
    clearError();
    const { charId } = props;
    if (!charId) {
      return;
    }

    getCharacter(charId).then(onCharLoaded);
  };

  const skeleton = !char ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {!comics.length ? "This character has no comics." : false}
        {comics.map((item, index) => {
          // if (index > 9) return;
          return (
            <li key={index} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
