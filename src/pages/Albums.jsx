import {useParams} from "react-router-dom";

const Albums = ({albums}) => {
  const params = useParams()
  const usersAlbums = albums.filter(album => album.userId === parseInt(params.id))

  return (
    <div className="container">
      <h1>Albums</h1>
      <ul>
        {usersAlbums?.map((album) => (
          <li key={album.id}>
            <h2>{album.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Albums;