//  硬编码情况
//  使用我们的模拟数据
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// HardCodeed data
const customers = [
    {id:'1',name:'Json man ',email:'jdsfs@gmail.com',age:23},
    {id:'2',name:'amelia kk',email:'amelia@gmail.com',age:32},
    {id:'3',name:'stepas asd',email:'stepas@gmail.com',age:16}
];



const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});


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
                for(let i = 0;i<customers.length;i++){
                    if(customers[i].id === args.id){
                        return customers[i];
                    }
                }
            }
        },
        customers:{
            type:new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers
            }
        }
    }
});


// 需要先创建根查询 root query
module.exports = new GraphQLSchema({
    query:RootQuery
})