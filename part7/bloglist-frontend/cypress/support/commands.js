// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })




// Commande de connexion d'un utilisateur
Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('user', JSON.stringify(body))
        cy.visit('')
    })
})

// Reet the database
Cypress.Commands.add('resetDatabase', () => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
})

// Add a new user
Cypress.Commands.add('addUser', (user) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
})


// Add a new blog
Cypress.Commands.add('addBlog', (blog) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/blogs`,
        method: 'POST',
        body: blog,
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        }
    })
})

Cypress.Commands.add("addBlogWithForm", (blog) => {
    cy.contains("New blog").click()
    cy.get('.title').type(blog.title)
    cy.get('.author').type(blog.author)
    cy.get('.url').type(blog.url)
    cy.get('.btn-create').click()
    cy.contains('cancel').click()
})
