import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/client";
import {useForm} from "../hooks/hooks";

function PostForm() {
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
            values.body = '';
        },
        onError(err) {
            console.log(err)
        },
    })

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
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


