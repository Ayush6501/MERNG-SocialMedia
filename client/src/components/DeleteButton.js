import React, {useState} from 'react';
import {Button, Confirm, Icon, Popup} from "semantic-ui-react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

function DeleteButton({postId, commentId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT: DELETE_POST;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POST
                });
                data.getPosts = data.getPosts.filter((p) => p.id !== postId);
                proxy.writeQuery({ query: FETCH_POST, data });
            }
            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    });

    return (
        <>
            <Popup
                content={commentId ? "Delete Comment" : "Delete Post"}
                inverted
                trigger = {
                    <Button
                        as='div'
                        floated='right'
                        color='red'
                        onClick={() => setConfirmOpen(true)}
                    >
                        <Icon name='trash' style={{margin: 0}}/>
                    </Button>
                }
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    );
}

export default DeleteButton;

const DELETE_POST = gql`
    mutation DeletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

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

const DELETE_COMMENT = gql`
    mutation deleteComment($commentId: ID!, $postId: ID!) {
        deleteComment(commentId: $commentId, postId: $postId) {
            id
            username
            comments {
                createdAt
                username
                body
                id
            }
            commentCount
        }
    }
        
`;
