const express = require('express');

const expressGraphQL = require('express-graphql');

const simplejsonserver = require('./schema.js');

const app = express();

app.use('/graphql',expressGraphQL({
    schema:simplejsonserver,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log(`start listening 4000`);
})