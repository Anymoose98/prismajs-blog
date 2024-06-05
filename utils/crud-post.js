const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

// Creare un post
const createPost = (data, cf) => {
    prisma.post.create({ data })
        .then(p => cf(p))
        .catch(err => console.error("errore"));
}

// index
const indexPosts = (cf) => {
    prisma.post.findMany({
        include: {
            category:{
                select: {
                    name:true
                }
            },
            tags:{
                select: {
                    name:true
                }
            }
        }
    })
    .then( ps => cf(ps))
    .catch(err => console.error("errore"));
}