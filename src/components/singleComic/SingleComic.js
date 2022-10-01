import useMarvelService from "../../services/MarvelService";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./singleComic.scss";

const SingleComic = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState("");
  const navigate = useNavigate();
  const { error, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  // * Set comic info * //
  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  // * Function for getting comic info * //
  const updateComic = () => {
    getComic(comicId).then(onComicLoaded);
  };
  console.log(useParams());

  const { name, description, thumbnail, price } = comic;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">144 pages</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <a href="#" onClick={() => navigate(-1)} className="single-comic__back">
        Back to all
      </a>
    </div>
  );
};

export default SingleComic;
