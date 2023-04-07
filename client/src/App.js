import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const authLink = setContext ((_, { headers }) => {
    // get the authentication token from local storage if it exists
   const token = localStorage.getItem("id_token");
   // return the headers to the context so httpLink can read them
   return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
   };
});

const httpLink = createHttpLink({
  uri:"/graphql",
});
// setting client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
   link: authLink.concat (httpLink),
   cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
