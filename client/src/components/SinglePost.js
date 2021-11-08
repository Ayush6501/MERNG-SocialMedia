import React from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/client";
import {Button, Card, Grid, Icon, Image, Label} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "./LikeButton";
import {useContext} from "react";
import {AuthContext} from "../context/auth-context";
import DeleteButton from "./DeleteButton";

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    console.log(postId)
    let postMarkup;

    const { data } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });
    console.log(data)

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
