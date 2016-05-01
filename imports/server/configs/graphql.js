import { WebApp } from 'meteor/webapp';
import { apolloServer } from 'graphql-tools';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';
import schema from '../data/schema';
import resolvers from '../data/resolvers';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

fetch = require('node-fetch');

export default function () {
  const graphQLServer = express();
  const GRAPHQL_PORT = 4000;

  graphQLServer.use('/graphql', apolloServer({
    graphiql: true,
    pretty: true,
    schema,
    resolvers,
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
  ));

  WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
}