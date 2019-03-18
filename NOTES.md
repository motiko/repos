# General

The focus of the code is for readability, maintanability and portability.
 * Readability is important in every codebase and achieved with clear naming,
sticking to style guide, and using automation tools (like prettier and eslint)
 * Maintainability - There is a clear separation between components and concerns.
  For example the filter controllers is moved to a separate component and all
  external api calls are made in one place.
 * Portability - Using approaches that would work in different environment.
 React router can work on the server for server side rendering. 
 Axios can also run on server side aditionally allows for easy mocking in tests. 
 Using HashRouter allows to same run code in chrome extension.

# Left out/ Can be improved
 * Error handling is not extensive enough and doesn't diferentiate between different type of errors.
 * No error message is displayed in repositories page
 * Unit and integration tests are not complete
 * E2E tests rely on external data
 * State of filters is not saved between navigation
 * Scrolling position is not saved between navigation
 * Theming and design refinement
