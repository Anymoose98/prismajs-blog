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
            category: {
                select: {
                    name: true
                }
            },
            tags: {
                select: {
                    name: true
                }
            }
        }
    })
        .then(ps => cf(ps))
        .catch(err => console.error("errore"));
}

// Show per slug
const showPost = (slug, cf) => {
    prisma.post.findUnique({
        where: { slug },
        include: {
            category: {
                select: {
                    name: true
                }
            },
            tags: {
                select: {
                    name: true
                }
            }
        }
    })
        .then(p => cf(p))
        .catch(err => console.error("errore"))
}

// Update
const updatePost = (slug, data, cf) => {
    prisma.post.update({ where: { slug }, data })
        .then(p => cf(p))
        .catch(err => console.error("Errore"))
}

// Delete
const deletePost = (slug, cf) => {
    prisma.post.delete({ where: { slug } })
        .then(p => cf(p))
        .catch(err => console.error("Errore"))
}

// Mostra solo quelli disponibili
// index
const indexPostsPublic = (cf) => {
    prisma.post.findMany({
        where: {
            published: true
        },
        include: {
            category: {
                select: {
                    name: true
                }
            },
            tags: {
                select: {
                    name: true
                }
            }
        }
    })
        .then(ps => cf(ps))
        .catch(err => console.error("errore"));
}

module.exports = {
    createPost,
    indexPosts,
    showPost,
    updatePost,
    deletePost,
    indexPostsPublic,
}
