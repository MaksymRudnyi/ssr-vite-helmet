import {useNavigate, useParams} from "react-router-dom"
import { Helmet} from "react-helmet-async";

const Character = ({ characters}) => {
  const params = useParams()
  const character = characters.find(character => character.id === parseInt(params.id))
  const navigate = useNavigate()

  if (!character) return (<div>Loading...</div>)

  return (
    <>
      <Helmet>
        <title>{character.name}</title>
        <meta name="description" content={`Description for ${character.name}`} />
      </Helmet>
    <div className="character-page">
      <h1>{character.name}</h1>

      <p className="status">{character.username}</p>
      <p className="species">{character.email}</p>
      {character.address && <p>Address: {character.address.street}, {character.address.city}</p>}
      {character.company && <p>Company: {character.company.name}</p>}
      <button onClick={() => navigate("/")}>Back to Characters</button>
    </div>
      </>
  )
}

export default Character