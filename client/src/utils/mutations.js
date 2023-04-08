//import gql from apolloclient
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
     mutation login($email: String!, $password: String!) {
         login(email: $email, password: $password) {
            token
            user {
                 _id
                 username
            }
         }
     }
`;
//mutation to add user
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
         addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
         }   
    }
`;
//save book
export const SAVE_BOOK =gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    } 
`;

//function to remove book
export const REMOVE_BOOK =gql`
     mutation removeBook($bookId: ID!) {
        _id
        username
        email
        bookCount
        saveBooks {
            bookId
            authors
            title
            description
            image
            link
        }
     }
`;