import React, {useRef, useState} from 'react';
import gql from "graphql-tag";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Card, Form, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./LikeButton";
import {useContext} from "react";
import {AuthContext} from "../context/auth-context";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
    const [comment, setComment] = useState('');
    const commentRef = useRef(null);

    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    useState()
    console.log(postId)
    let postMarkup;

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });
    console.log(data)

    const [submitComment] = useMutation(CREATE_COMMENT, {
        update() {
            setComment('');
            commentRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallback() {
        props.history.push('/')
    }

    if(!data) {
        postMarkup = <p>Loading</p>
    } else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount
        } = data.getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            float='right'
                            size='small'
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button labelPosition='right' as='div' >
                                    <Button color='blue' basic>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label as='a' basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                { user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback}/>
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a Comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment..."
                                                name='comment'
                                                onChange={(e) => setComment(e.target.value)}
                                                value={comment}
                                                ref={commentRef}
                                            />
                                            <button
                                                type='submit'
                                                className='ui button teal'
                                                disabled={comment.trim() === ''}
                                                onClick={submitComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid  key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

export default SinglePost;

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                createdAt
                username
                body
            }
            commentCount
        }
    }
`;
