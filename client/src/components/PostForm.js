import React from 'react';
import {Button, Form} from "semantic-ui-react";
import {useForm} from "../hooks/hooks";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";

function PostForm(props) {
    const { values, onChange, handleSubmit } = useForm(createPostCallback, {
        body: ''
    });

    const [createPost, {error}] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POST,
            });
            proxy.writeQuery({
                query: FETCH_POST,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                }
            });
            values.body = ''
    }})

    function createPostCallback() {
        createPost();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Create A Post</h2>
            <Form.Field>
                <Form.Input
                    name='body'
                    placeholder="Hi World!"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type='submit' color='teal'>Post</Button>
            </Form.Field>
        </Form>
    );
}

export default PostForm;

const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            username
            likes{
                id
                username
                createdAt
            }
            comments{
                id
                body
                createdAt
                username
            }
            likeCount
            commentCount
        }
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
