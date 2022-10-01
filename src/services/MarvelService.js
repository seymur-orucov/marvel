import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, error, clearError } = useHttp();
  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "bf8007f1c21cd3cb8ed3b737ca716094";
  const _baseOffset = 210;
  const _comicsOffset = 0;

  // * Get all characters * //
  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  // * Get one character by ID * //
  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`);

    return _transformCharacter(res.data.results[0]);
  };

  // * Get all comics * //
  const getAllComics = async (offset = _comicsOffset) => {
    const res = await request(
      `${_apiBase}/comics?limit=8&offset=${offset}&apikey=${_apiKey}`
    );

    return res.data.results.map(_transformComics);
  };

  // * Get single comic * //
  const getComic = async (id) => {
    const res = await request(`${_apiBase}/comics/${id}?apikey=${_apiKey}`);

    return _transformComics(res.data.results[0]);
  };

  // * Function for create character object * //
  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description
        ? character.description.slice(0, 200) + "..."
        : "Not description.",
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };

  // * Function for create comics object * //
  const _transformComics = (comics) => {
    return {
      id: comics.id,
      name: comics.title,
      description: comics.description,
      price: comics.prices[0].price,
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    error,
    clearError,
  };
};

export default useMarvelService;
