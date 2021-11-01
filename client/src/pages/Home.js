import React from 'react';
import { useQuery} from "@apollo/client";
import gql from 'graphql-tag';

function Home(props) {
    const {loading, data: {getPosts: posts}, error } = useQuery(FETCH_POST)
    if(data) {
        console.log(data);
    }

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

const FETCH_POST = gql`
    {
        getPosts{
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
        }
    }
`;

export default Home;
