import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'

const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDRmYzRmZjZkZGZlYjE0YTAwY2NjNzUwNTYyMDg3OSIsIm5iZiI6MTc3MzMzOTI0NS4yOTcsInN1YiI6IjY5YjMwMjZkYWIzMjMzYjc3YTY4NWQ2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9VvzqYFlcHN7jEZ6cx9oW74KqJVtyYmPf3W7BBAKHDw'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    const ref = cardsRef.current;

    if (ref) {
      ref.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (ref) {
        ref.removeEventListener("wheel", handleWheel);
      }
    };

  }, [category]);

  return (
    <div className='title-cards'>

      <h2>{title ? title : "Popular On Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>

        {apiData.map((card, index) => {
          return (
            <div className="card" key={index}>

              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.original_title}
              />

              <p>{card.original_title}</p>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default TitleCards