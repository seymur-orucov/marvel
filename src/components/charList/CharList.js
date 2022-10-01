import { useState, useRef, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import { ErrorMessage } from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoad, setNewItemLoad] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnd, setCharEnd] = useState(false);

  const { error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onCharsLoading = () => {
    setNewItemLoad(true);
  };

  const onCharsLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setOffset((offset) => offset + 9);
    setNewItemLoad((newItemLoad) => false);
    setCharEnd((charEnd) => ended);
  };

  const onRequest = (offset) => {
    getAllCharacters(offset).then(onCharsLoaded);
  };

  const items = charList.map((item) => {
    const { id, name, thumbnail } = item;
    return (
      <li
        className="char__item"
        key={id}
        onClick={() => props.onCharSelected(id)}
      >
        <img src={thumbnail} alt="abyss" />
        <div className="char__name">{name}</div>
      </li>
    );
  });
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !error ? items : null;

  return (
    <div className="char__list">
      <ul className="char__grid">{content}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoad}
        onClick={() => onRequest(offset)}
        style={{ display: charEnd ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
