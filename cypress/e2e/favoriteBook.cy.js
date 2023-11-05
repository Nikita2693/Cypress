const bookFirst = {
  title: "Золотой ключик, или Приключения Буратино",
  description:
    "Сказка",
  author: "Алексей Николаевич Толстой",
};

const bookSecond = {
  title: "Приключения Шерлока Холмса (сборник)",
  description:
    "Детектив",
  author: "Артур Конан Дойл",
};

const bookThird = {
  title: "Приключения Алисы",
  description:
    "Космическая опера",
  author: "Кир Булычёв",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
  });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});
