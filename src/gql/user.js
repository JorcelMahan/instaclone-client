import { gql } from '@apollo/client';


export const REGISTER = gql`
    mutation register($input: UserInput) {
        register(input: $input) {
            id
            name
            username
            email
            createdAt
        }
    }
`;

export const LOGIN = gql`
    mutation login($input: LoginInput) {
        login(input: $input) {
            token
        }
    }
`;

export const GET_USER = gql`
    query getUser($id: ID, $username: String) {
        getUser(id: $id, username: $username) {
            id
            name
            username
            email
            website
            description
            avatar
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($input: UpdateUserInput) {
        updateUser(input: $input) 
    }
`;

export const SEARCH = gql`
    query search($search: String) {
        search(search: $search) {
            name
            username
            avatar
        }
    }
`;

export const UPDATE_AVATAR = gql`
    mutation updateAvatar($url: String) {
        updateAvatar(url: $url) {
            status
            url
        }
    }
`;

export const DELETE_AVATAR = gql`
    mutation deleteAvatar {
        deleteAvatar
    }
`;