const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

// Creare un post
const createPost = (data, cf) => {
    prisma.post.create({ data })
        .then(p => cf(p))
        .catch(err => console.error("errore"));
}
