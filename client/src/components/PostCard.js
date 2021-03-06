import React, {useContext} from 'react';
import {Button, Card, Icon, Image, Label, Popup} from "semantic-ui-react";
import moment from "moment"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/auth-context";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
function PostCard({post: {body, createdAt, id, username, likeCount, commentCount, likes}}) {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid >
            <Card.Content  as={Link} to={`/posts/${id}`}>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Popup
                    content='Comment on Post'
                    inverted
                    trigger={
                        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                            <Button color='blue' basic>
                                <Icon name='comments' />
                            </Button>
                            <Label as='a' basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                    }
                />
                { user && user.username === username && <DeleteButton postId={id}/>}
            </Card.Content>
        </Card>
    );
}

export default PostCard;
