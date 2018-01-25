// 使用json_server

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const axios = require('axios');




const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});

/**
 * root直接查询
 * {
 * 
 * }
 */

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString},
            },
            resolve(parentValue,args){
                return axios.get('http://127.0.0.1:3000/customers/'+args.id).then(res=>res.data);
            }
        },
        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return axios.get('http://localhost:3000/customers/').then(res=>res.data);

            }
        }
    }
});
/**
 * mutatin{
 *  
 * }
 */
const mutation = new GraphQLObjectType({
    name:'mutation',
    fields:{
        addCustomer:{
            type:CustomerType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.post('http://localhost:3000/customers',{
                    name:args.name,
                    email:args.email,
                    age:args.age
                }).then(res=>res.data)
            }
        },
        deleteCustomer:{
            type:CustomerType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete('http://localhost:3000/customers/'+args.id).then(res=>res.data)
            }
        },
        /**
         * mutation{
         *  updateCustoner(id:"2",age:30){
         *      name,
         *      age 
         *  }
         * }
         */
        updateCustomer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString},
                email:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parentValue, args){
                return axios.patch('http://localhost:3000/customers/'+args.id,{
                    name:args.name,
                    email:args.email,
                    age:args.age
                }).then(res=>res.data)
            }
        }
    }
})


// 需要先创建根查询 root query
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})