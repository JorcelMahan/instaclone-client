import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
    query getComments($idPublication: ID!) {
        getComments(idPublication: $idPublication) {
            comment
            user {
                name
                username
                avatar
            }
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($input: CommentInput) {
        addComment(input: $input) {
            comment
            publication
        }
    }
`;