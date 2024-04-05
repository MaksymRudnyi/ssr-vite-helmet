import {useParams} from "react-router-dom";

const Posts = ({posts}) => {
  const params = useParams()
  const usersPosts = posts.filter(post => post.userId === parseInt(params.id))

  return (
    <div className="container">
      <h1>Posts</h1>
      <ul>
        {usersPosts?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Posts;