import React, {useContext} from 'react';
import { useQuery} from "@apollo/client";
import gql from 'graphql-tag';
import {Grid} from "semantic-ui-react";
import PostCard from "../components/PostCard";
import {AuthContext} from "../context/auth-context";
import PostForm from "../components/PostForm";

function Home() {
    const {loading, data } = useQuery(FETCH_POST);
    const {user} = useContext(AuthContext);

    const posts = data?.getPosts;
    // if(posts) {
    //     console.log(posts);
    // }



    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <Grid.Column>
                    <h1>Recent Posts</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm query={FETCH_POST} />
                    </Grid.Column>
                )}
                {loading ? <h1>Loading...</h1> : (posts && posts.map((post) => (
                    <Grid.Column key={post.id} style={{marginBottom: "20px"}}>
                        <PostCard post={post} />
                    </Grid.Column>
                )))}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POST = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            comments {
                id
                username
                createdAt
                body
            }
            likes {
                id
                username
                createdAt
            }
            likeCount
            commentCount
        }
    }
`;

export default Home;
