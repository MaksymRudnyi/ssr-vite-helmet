import {useNavigate, useSearchParams, Link} from "react-router-dom"
import {useEffect, useMemo, useState} from "react";

const Home = ({characters}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "ASC")

  useEffect(() => {
    setSearchParams({ filter, sort });
  }, [filter, sort, setSearchParams]);

  const filteredCharacters = useMemo(() => {
    return characters?.filter(character => character.username.toLowerCase().includes(filter.toLowerCase()))
  }, [filter, characters]);

  const sortedCharacters = useMemo(() => {
    return filteredCharacters?.sort((a, b) => {
      if (sort === "ASC") {
        return a.username.localeCompare(b.username)
      } else {
        return b.username.localeCompare(a.username)
      }
    });
  }, [sort, filteredCharacters]);

  return (
    <div className="container">
      <h1>Rick and Morty Characters</h1>
      <div>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search characters" />
        <button onClick={() => setSort('ASC')}>ASC</button>
        <button onClick={() => setSort('DESC')}>DESC</button>
      </div>
      <br/>
      <ul>
        {sortedCharacters?.map((character) => (
          <li key={character.id}>
            <div>
              <h2><Link to={`/character/${character.id}`}>{character.name}</Link></h2>
              <p>Username: {character.username}</p>
              <p>Email: {character.email}</p>
            </div>
            <div>
              <Link to={`/posts/${character.id}`}>Posts</Link>
              {' '}
              <Link to={`/albums/${character.id}`}>Albums</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home