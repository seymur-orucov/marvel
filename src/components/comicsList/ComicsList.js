import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import "./comicsList.scss";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newComicsLoaded, setNewComicsLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnd, setComicsEnd] = useState(false);

  const { getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onComicsLoading = () => {
    setNewComicsLoaded(true);
  };

  const onComicsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length > 8) {
      return (ended = true);
    }

    setComics((comics) => [...comics, ...newComics]);
    setOffset((offset) => offset + 8);
    setNewComicsLoaded((newComicsLoaded) => false);
    setComicsEnd((comicsEnd) => ended);
  };

  const onRequest = (offset) => {
    getAllComics(offset).then(onComicsLoaded);
  };

  const items = comics.map(({ id, name, thumbnail, price }, index) => {
    return (
      <li className="comics__item" key={index}>
        <Link to={`${id}`}>
          <img src={thumbnail} alt={name} className="comics__item-img" />
          <div className="comics__item-name">{name}</div>
          <div className="comics__item-price">{price}$</div>
        </Link>
      </li>
    );
  });

  return (
    <div className="comics__list">
      <ul className="comics__grid">{items}</ul>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
