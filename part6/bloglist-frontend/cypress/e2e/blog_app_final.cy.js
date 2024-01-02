describe('Blog app', function () {

  const blog = {
    title: 'A blog created by cypress',
    author: 'Issac Newton',
    url: 'http://localhost:5173',
    likes: 0
  }
  beforeEach(function () {
    // Reset the database
    cy.resetDatabase()

    // User object
    const user = { name: 'root', username: 'root', password: 'pass123' }
    // Create a nexw user
    cy.addUser(user)
    cy.visit('')

  })

  it('Login form is shown', function () {
    cy.contains('login').should('exist')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // Login the user
      cy.login({ username: 'root', password: 'pass123' })
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('pass1234')
      cy.get('#login').click()
      // cy.login({ username: 'root', password: 'pass1234' })
      cy.contains('login').should('exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // log in user here
      cy.login({ username: 'root', password: 'pass123' })
    })

    it('A blog can be created', function () {
      cy.addBlogWithForm({ ...blog, title: 'A blog created by cypress 1' })
      cy.addBlogWithForm({ ...blog, title: 'A blog created by cypress 2' })
      cy.addBlogWithForm({ ...blog, title: 'A blog created by cypress 3' })
    })

    it('A blog can be like', function () {
      cy.addBlogWithForm({ ...blog, title: 'A blog created by cypress 1' })
      cy.addBlogWithForm({ ...blog, title: 'A blog created by cypress 2' })
      cy.contains('A blog created by cypress 2')
      .contains('View').click()
      .get('.like').click()
    })

    it("A user can delete a blog", function(){
      cy.addBlogWithForm({ ...blog, title: 'A new blog created'})
      cy.contains('View').click()
      cy.contains('Remove')
    })

    it("Blogs is sorted by likes descending", function(){
      cy.addBlog({ ...blog, title: 'A blog created by cypress 1', likes: 3 })
      cy.addBlog({ ...blog, title: 'A blog created by cypress 2', likes: 8})
      cy.addBlog({ ...blog, title: 'A blog created by cypress 3', likes: 5 })
      cy.visit('')
      // cy.get('.blog').then( (blogs) => {
      //   cy.wrap(blogs[0]).contains("A blog created by cypress 2")
      //   cy.wrap(blogs[1]).contains("A blog created by cypress 3")
      //   cy.wrap(blogs[2]).contains("A blog created by cypress 1")
      // })

      cy.get('.blog').eq(0).should('contain', 'A blog created by cypress 2')
      cy.get('.blog').eq(1).should('contain', 'A blog created by cypress 3')
      cy.get('.blog').eq(2).should('contain', 'A blog created by cypress 1')
    })
  })
})