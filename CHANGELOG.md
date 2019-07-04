## v7.0.0 (July 3, 2019)

-   Making express-validator happy

## v6.1.20 (July 3, 2019)

-   NPM updated

## v6.1.19 (June 12, 2019)

-   NPM updated

## v6.1.18 (June 5, 2019)

-   NPM updated

## v6.1.17 (June 4, 2019)

-   NPM updated
-   Typos

## v6.1.16 (May 27, 2019)

-   NPM updated

## v6.1.15 (May 23, 2019)

-   NPM updated

## v6.1.14 (May 22, 2019)

-   NPM updated

## v6.1.13 (May 18, 2019)

-   Add role validation to User creator, Fixes [#35](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/35)

## v6.1.12 (May 17, 2019)

-   NPM updated

## v6.1.11 (May 14, 2019)

-   NPM updated

## v6.1.10 (May 5, 2019)

-   NPM updated

## v6.1.9 (Apr 24, 2019)

-   NPM updated

## v6.1.8 (Apr 14, 2019)

-   NPM updated

## v6.1.7 (Apr 11, 2019)

-   NPM updated

## v6.1.6 (Apr 9, 2019)

-   README.md updated

## v6.1.5 (Apr 9, 2019)

-   README.md updated

## v6.1.4 (Apr 8, 2019)

-   NPM updated

## v6.1.3 (Apr 7, 2019)

-   NPM updated

## v6.1.2 (Apr 2, 2019)

-   NPM updated

## v6.1.1 (Mar 30, 2019)

-   NPM updated

## v6.1.0 (Mar 29, 2019)

-   ENHANCEMENT: Refresh token endpoint now works as GET instead of POST

## v6.0.0 (Mar 28, 2019)

-   BREAKING CHANGE: Token payload and expiration have changed
-   BREAKING CHANGE: Constant in .env changed from `JWT_EXPIRATION` to `JWT_EXPIRATION_IN_MINUTES`
-   FEATURE: Refresh token

## v5.0.1 (Mar 25, 2019)

-   NPM update

## v5.0.0 (Mar 25, 2019)

-   Big refactor
-   FIX: send emails with mailgun

## v4.0.14 (Mar 25, 2019)

-   Removed unused code

## v4.0.13 (Mar 25, 2019)

-   FIX: remark

## v4.0.12 (Mar 25, 2019)

-   FIX: Convert an email in request to lowercase

## v4.0.11 (Mar 25, 2019)

-   README.md updated

## v4.0.10 (Mar 25, 2019)

-   README.md updated

## v4.0.9 (Mar 25, 2019)

-   README.md updated

## v4.0.8 (Mar 24, 2019)

-   Removed normalizeEmail() function from validator.js. It was removing dots from email addresses. New function in utils to convert an email in request to lowercase. Fixes [#11](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/11)

## v4.0.7 (Mar 18, 2019)

-   Travis CI changes

## v4.0.6 (Mar 18, 2019)

-   CHANGELOG updated

## v4.0.5 (Mar 18, 2019)

-   Fix itemAlreadyExists refactor

## v4.0.4 (Mar 18, 2019)

-   itemAlreadyExists refactor

## v4.0.3 (Mar 18, 2019)

-   itemAlreadyExists refactor

## v4.0.2 (Mar 18, 2019)

-   itemNotFound refactor

## v4.0.1 (Mar 18, 2019)

-   Refactor emailer

## v4.0.0 (Mar 18, 2019)

-   Big refactor
-   NPM update

## v3.0.4 (Mar 17, 2019)

-   Bumped to v3.0.4

## v3.0.3 (Mar 17, 2019)

-   Use of remark to format markdown files

## v3.0.2 (Mar 17, 2019)

-   Use of remark to format markdown files
-   Fix: use of parseInt now provides a base

## v3.0.1 (Mar 15, 2019)

-   NPM updated
-   README.md updated

## v3.0.0 (Mar 15, 2019)

-   Demo added

## v2.3.3 (Mar 15, 2019)

-   Enable Redis based on env variable
-   API '/' route now renders an html view

## v2.3.2 (Mar 14, 2019)

-   Test for npm publish

## v2.3.1 (Mar 14, 2019)

-   Migrated to travis.com

## v2.3.0 (Mar 13, 2019)

-   Added verification in response in test and development env
-   Added verification for default admin user in seeding
-   Added tests for cities and users with filters
-   All functions documentated with JSDoc
-   base.js renamed to utils.js

## v2.2.8 (Mar 12, 2019)

-   Only builds in travis when tag is present

## v2.2.7 (Mar 12, 2019)

-   Verification code is showed on development and testing environments
-   NPM updated

## v2.2.6 (Mar 11, 2019)

-   Use of travis ci to automate deploy to npm
-   Added badge for tags in README.md

## v2.2.2 (Mar 11, 2019)

-   Use of travis ci to automate build and deploy
-   Added badge for travis build in README.md

## v2.2.1 (Mar 10, 2019)

-   Added badge for npm downloads in README.md

## v2.2.0 (Mar 10, 2019)

-   Filtering from multiple fields redesigned

## v2.1.10 (Mar 10, 2019)

-   NPM updated
-   FIX: creation of users were not saving data that validator was asking

## v2.1.9 (Mar 9, 2019)

-   NPM run lint added

## v2.1.8 (Mar 9, 2019)

-   New implementation for query on cities and users
-   More data on seeding
-   NPM updated

## v2.1.7 (Mar 4, 2019)

-   More tests added

## v2.1.6 (Mar 4, 2019)

-   Better testing

## v2.1.5 (Mar 4, 2019)

-   Istambul nyc code coverage added

## v2.1.4 (Mar 4, 2019)

-   Verification added only in tests responses at registration and forgot password
-   NPM updated
-   FIXED: User creation locale param was missing

## v2.1.3 (Mar 2, 2019)

-   Verification removed from responses at registration and forgot password (They were being used for testing and somehow made it here)

## v2.1.2 (Mar 2, 2019)

-   FEATURE: Install nodemon in devDependencies [#9](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/9)
-   Typos
-   README.md updated

## v2.1.1 (Feb 27, 2019)

-   README.md updated

## v2.1.0 (Feb 27, 2019)

-   i18n added for registration email and forgot password email
-   Typos

## v2.0.1 (Feb 27, 2019)

-   Error response regression
-   NPM updated

## v2.0.0 (Feb 24, 2019)

-   Breaking changes for success and error responses
-   Added new endpoint in /profile/changePassword
-   Fixes in tests
-   Fixes in validations
-   NPM updated

## v1.2.12 (Feb 18, 2019)

-   NPM updated
-   CHANGELOG fixes
-   Typos

## v1.2.11 (Feb 11, 2019)

-   NPM updated
-   Removed pm2 from start script in package.json
-   server.js now inits redis stuff only in production

## v1.2.10 (Feb 9, 2019)

-   package.json updated

## v1.2.9 (Feb 9, 2019)

-   CHANGELOG updated

## v1.2.8 (Feb 9, 2019)

-   NPM updated

## v1.2.7 (Dec 4, 2018)

-   FIXED: Error message standarization [#6](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/6)
-   Role property is returned in profile

## v1.2.6 (Dec 1, 2018)

-   FIXED: Password length validation in profile [#5](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/5)
-   Role property is returned in profile

## v1.2.5 (Dec 1, 2018)

-   Comments

## v1.2.4 (Dec 1, 2018)

-   FIXED: Not standardized response on error [#4](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/4)
-   NPM updated

## v1.2.3 (Nov 28, 2018)

-   FIXED: Password not encrypted when updating in profile [#3](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/3)
-   NPM updated

## v1.2.2 (Nov 8, 2018)

-   NPM updated

## v1.2.1 (Nov 5, 2018)

-   Cache API responses only in production mode

## v1.2.0 (Nov 5, 2018)

-   Use of REDIS to cache API responses
-   NPM updated

## v1.1.3 (Oct 24, 2018)

-   Seeding Fix due to changes on new mongo-seeding package

## v1.1.2 (Oct 23, 2018)

-   NPM updated

## v1.1.1 (Sep 28, 2018)

-   Clean and Seed with async/await
-   Fixes

## v1.0.1 (Sep 21, 2018)

-   Added keywords to package.json

## v1.0.0 (Sep 20, 2018)

-   First stable release
