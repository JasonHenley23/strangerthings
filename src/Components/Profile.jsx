import { useEffect, useState } from "react"
import React from "react";





function Profile ({ myToken, data }) {
    
console.log(data);



   

    if(!myToken || !data){

        return(
            <h1>
                You are not signed in!
            </h1>
        )
    }

    return(
        <>
        <form class="posts">
            <h1>Your Profile </h1>
            <h3> Posts </h3>
            <div>{data.posts.map((post, index) => (
                <>
                <h1>Title: {post.title}</h1>
                <p> {post.active}</p>
                <p> {post._id}</p>
                <p>Created by: {post.author}</p>
                <p> {post.description}</p>
                <p> Price: {post.price}</p>
                <p>Created at: {post.createdAt}</p>
                <p> {post.updatedAt}</p>
                <p> {post.__v}</p>
                <p> {post.location}</p>
                <p> {post.willDeliver}</p>
                </>
            ))}</div> 
           
           

            <h3 class="home">Messages </h3>
            <div>{data.messages.map((message, index) => (
                <>
                <p>{message._id}</p>
                <p>Title:{message.post.title}</p>
                <p>From: {message.fromUser.username}</p>
                <p>Message:{message.content}</p>

           
                </>
            ))}</div>
            
            <h2 class="home"> Username </h2>
            <div> 
                <p> {data.username} </p> 
            </div>
        </form>
       

        
        </> 
        )

    }

    export default Profile;