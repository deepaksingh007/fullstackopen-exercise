/* eslint-disable no-undef */

describe('Bloglist app ', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/test/reset', { userId: '5de534c75aa6981e9ff1558b' })
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('login')
  })
  it('login form can be toggled and used for login', function () {
    cy.contains('login').click()
    cy.get('#username').type('cy-test')
    cy.get('#password').type('test')
    cy.contains('submit').click()
    cy.contains('cy-test logged in')
  })
  describe('after login', () => {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/test/reset', { userId: '5de534c75aa6981e9ff1558b' })
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('cy-test')
      cy.get('#password').type('test')
      cy.contains('submit').click()
    })
    it('create new blog', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('e2e test blog')
      cy.get('#author').type('woj')
      cy.get('#url').type('www.woj.com')
      cy.contains('create').click()
      cy.contains('e2e test blog')
    })
    it('nav to users', function () {
      cy.contains('User').click()
      cy.get('table#usersTable').should('exist')
    })
    it('nav to specific user', function () {
      cy.contains('User').click()
      cy.contains('a', 'cy-test').click()
      cy.contains('added blogs')
    })
  })
})