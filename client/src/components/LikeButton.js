import React, {useEffect, useState} from 'react';
import {Button, Icon, Label} from "semantic-ui-react";
import {Link} from "react-router-dom";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

function LikeButton({user, post: {id, likeCount, likes}}) {
    const [liked, setLiked] = useState()

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST, {
        variables: {postId: id},
    })

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal' basic >
                <Icon name='heart' />
            </Button>
        )
    ) : (
        <Button color='teal' as={Link} to='/login' basic >
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label as='a' basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    );
}

export default LikeButton;

const LIKE_POST = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId){
            id
            likes {
                username
                createdAt
                id
            }
            likeCount
        }
    }
`;
