import { gql } from "@apollo/client";

export const PUBLISH = gql`
    mutation publish($url: String) {
        publish(url: $url) {
            status
            file
        }
    }
`;

export const GET_PUBLICATIONS = gql`
    query getPublications($username: String!) {
        getPublications(username: $username) {
            id
            idUser
            file
            createdAt
        }
    }
`;


export const GET_PUBLICATIONS_FOLLOWED = gql`
    query getPublicationsFollowed {
        getPublicationsFollowed {
            id
            file
            createdAt
            user {
                name
                username
                avatar
                email
            }
        }
    }
`;