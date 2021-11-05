import React, {useContext, useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/client";
import {useForm} from "../hooks/hooks";
import {AuthContext} from "../context/auth-context";

function Login(props) {
    const [errors, setErrors] = useState({});

    const { onChange, handleSubmit, values} = useForm(loginUserCallback, {
        username: '',
        password: '',
    })

    const context = useContext(AuthContext);

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}){
            console.log(userData)
            context.login(userData)
            props.history.push('/')
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values,
        // onCompleted: data => {
        //     console.log(data);
        // }
    })

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                    type='text'
                    error={!!errors.username}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                    type='password'
                    error={!!errors.password}
                />
                <Button type='submit' primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(val => (
                            <li key={val}>
                                {val}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation register(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username,
            password: $password,
        ){
            id
            email
            username
            token
            createdAt
        }
    }
`

export default Login;
