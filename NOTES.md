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
 * Theming and design refinement
 * Variable types

# Libraries
 * Create react app - Rapid prototyping, zero-config, hot-reloading, build secripts, test automation, and deploy scripts to various platforms. 
 * Material-UI - Extensive component library, fits for mobile, accessiblity support, decent look without much theming,support for SSR.
 * Axios - Runs both on client and server, easier mocking, support for older browsers with good api.
 * React Router - Works both client and server. Support for environment where limited routing conig is avaliable (like gh-pages)
 * Cypress - Test suite with automatic waiting, and network traffic control that runs in a real browser used for e2e.
 * react-testing-library - Library that encourages writing maintanable tests for react. (testing components the way they are used)

