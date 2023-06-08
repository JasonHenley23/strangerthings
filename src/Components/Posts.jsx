import React, { useEffect, useState } from "react";



const Posts = ({token, data}) => {
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    console.log("posts:", posts);
  
    useEffect(() => {

     
      fetchPosts();
    }, []);
    const fetchPosts = async () => {
        const resp = await fetch(
          "https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/posts"
        );
        const data = await resp.json();
  
        setPosts(data.data.posts);
      };

    const [title, setTitle] = useState('');
    const [body, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
  
    const handleSubmit = async (ev) => {
      ev.preventDefault();
        console.log(location);

      const response = await fetch("https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          post:{title,
          description:body,
          price,
          location}
        }),
      });
      const data = await response.json();
      console.log("data", data);
    };

    const postMessage = async (event, POST_ID) => {
       event.preventDefault();
       
        try {
          const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/posts/${POST_ID}/messages`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: {
                    content
              }
            })
          });
          const message = await response.json();
          console.log(message);
          return message
        } catch (err) {
          console.error(err);
        }
      }
    


    const deletePost = async (POST_ID) => {
        try {
          const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT/posts/${POST_ID}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const result = await response.json();
          console.log(result);
          return result
        } catch (err) {
          console.error(err);
        }
      }
      const updatePost = async (POST_ID) => {
        try {
         
          const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-CT-WEB-PT//posts/${POST_ID}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title,
                description:body,
                price,
                location,
                
              }
            })
          });
          const result = await response.json();
          console.log(result);
          await fetchPosts();
          return result
        } catch (err) {
          console.error(err);
        }
      }
  
    return (
      <>
        <h1 class="posts">Posts</h1>
        
             <div class="posts">{posts.map((post, index) => (
                <>
                <h1> {post.title}</h1>
                <p><b> Username: </b>{post.author.username}</p>
                <p> </p>
                <p> {post.description}</p>
                <p><b> Price: </b>{post.price}</p>
                <p><b>Created:</b>{post.createdAt}</p>
                <p><b>Updated:</b>{post.updatedAt}</p>
                <p> {post.location}</p>
                <p> {post.willDeliver ? "Delivery Available!" : "Delivery Not Available!"}</p>
                {
                    data&&data._id === post.author._id && 
                    <> 
                      <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={(ev) => setTitle(ev.target.value)}
                    ></input>
                    <input
                        type="text"
                        placeholder="body"
                        value={body}
                        onChange={(ev) => setDescription(ev.target.value)}
                    ></input>
                    <br></br>
                    <input
                        type="text"
                        placeholder="price"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                    ></input>
                        <input
                        type="text"
                        placeholder="location"
                        value={location}
                        onChange={(ev) => setLocation(ev.target.value)}
                    ></input>
                    <br></br>
                    </form>
                    <button onClick={() => updatePost(post._id)}> Edit </button>
                    
                    <button onClick={() => deletePost(post._id)} >Delete</button>
                    </>
                }
                {
                    data&&data._id !== post.author._id&& 
                    <form onSubmit={(event) => postMessage(event, post._id)}>
                    <h3> Send A Message </h3>
                    <br></br>
                   
                    <br></br>
                        <input class="message"
                        type="text"
                        placeholder="content"
                        value={content}
                        onChange={(ev) => setContent(ev.target.value)}
                    ></input>
                    <br></br>
                    <button> Submit </button>
                    </form>
                }
                </>
            ))}</div>  

        {/* <h1>Messages</h1>
        <div>{messages.map((message, index) => (
                <>
                <p>{message._id}</p>
                <p>{message.post.title}</p>
                <p>{message.fromUser.username}</p>
                <p>{message.content}</p>
                </>
            ))}</div> */}
           
  
        <h3 class="posts">Create a Post</h3>
        <form class="posts" onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          ></input>
          <input
            type="text"
            placeholder="body"
            value={body}
            onChange={(ev) => setDescription(ev.target.value)}
          ></input>
          <br></br>
           <input
            type="text"
            placeholder="price"
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          ></input>
            <input
            type="text"
            placeholder="location"
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          ></input>
          <br></br>
          <button>Create</button> 
        

        </form>
      </>
    );
  //};

}
  export default Posts;
  