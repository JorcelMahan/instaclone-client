import { gql } from "@apollo/client";

export const PUBLISH = gql`
    mutation publish($url: String) {
        publish(url: $url) {
            url
        }
    }
`;

export const GET_PUBLICATIONS = gql`
    query getPublications($username: String!) {
        getPublications(username: $username) {
            id
            user
            url
            createdAt
        }
    }
`;


export const GET_PUBLICATIONS_FOLLOWED = gql`
    query getPublicationsFollowed {
        getPublicationsFollowed {
            id
            url
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