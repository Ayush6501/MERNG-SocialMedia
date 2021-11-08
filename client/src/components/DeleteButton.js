import React, {useState} from 'react';
import {Button, Confirm, Icon} from "semantic-ui-react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

function DeleteButton({postId, callback}) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POST
            });
            proxy.writeQuery({
                query: FETCH_POST,
                data: {
                    getPosts: data.getPosts.filter(p => p.id !== postId)
                }
            })
            if(callback) callback()
        },
        variables: {
            postId
        }
    })

    return (
        <>
            <Button
                as='div'
                floated='right'
                color='red'
                onClick={() => setConfirmOpen(true)}
            >
                <Icon name='trash' style={{margin: 0}}/>
            </Button>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
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
