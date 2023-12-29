describe( function () {

  beforeEach(function () {
    // Reset the database
    cy.resetDatabase()

    // User object
    const user = { name: 'root', username: 'root', password: 'pass123' }
    // Create a nexw user
    cy.addUser(user)

    // cy.contains('login').click()
    // cy.get('#username').type('root')
    // cy.get('#password').type('pass123')
    // cy.get('#login').click()

    // Login the user
    cy.login({ username: user.username, password: user.password })


  })

  describe("Blog app", function () {

    it('user can log in', function () {
      cy.contains('root logged in')
    })

    it('A new blog can be created', function () {
      // const blog = {
      //   title: 'A blog created by cypress',
      //   author: 'Issac Newton',
      //   url: 'http://localhost:5173',
      //   likes: 0
      // }
      // Create a new blog (03)
      cy.addBlog({
        title: 'A blog created by cypress 1',
        author: 'Issac Newton',
        url: 'http://localhost:5173',
        likes: 0
      })

      cy.addBlog({
        title: 'A blog created by cypress 2',
        author: 'Issac Newton',
        url: 'http://localhost:5173',
        likes: 0
      })

      cy.addBlog({
        title: 'A blog created by cypress 3',
        author: 'Issac Newton',
        url: 'http://localhost:5173',
        likes: 0
      })

      // cy.contains("New blog").click()
      // cy.get('.title').type('A blog created by cypress')
      // cy.get('.author').type('Issac Newton')
      // cy.get('.url').type('http://localhost:5173')
      // cy.get('.btn-create').click()
      // cy.contains('cancel').click()
      cy.contains('A blog created by cypress 1')
      cy.contains('View').click()
      cy.get('.like').click()
    })
  })
})