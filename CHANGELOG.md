## v.3.0.3 (Mar 17, 2019)

-   Use of remark to format markdown files

## v.3.0.2 (Mar 17, 2019)

-   Use of remark to format markdown files
-   Fix: use of parseInt now provides a base

## v.3.0.1 (Mar 15, 2019)

-   NPM updated
-   README.md updated

## v.3.0.0 (Mar 15, 2019)

-   Demo added

## v.2.3.3 (Mar 15, 2019)

-   Enable Redis based on env variable
-   API '/' route now renders an html view

## v.2.3.2 (Mar 14, 2019)

-   Test for npm publish

## v.2.3.1 (Mar 14, 2019)

-   Migrated to travis.com

## v.2.3.0 (Mar 13, 2019)

-   Added verification in response in test and development env
-   Added verification for default admin user in seeding
-   Added tests for cities and users with filters
-   All functions documentated with JSDoc
-   base.js renamed to utils.js

## v.2.2.8 (Mar 12, 2019)

-   Only builds in travis when tag is present

## v.2.2.7 (Mar 12, 2019)

-   Verification code is showed on development and testing environments
-   NPM updated

## v.2.2.6 (Mar 11, 2019)

-   Use of travis ci to automate deploy to npm
-   Added badge for tags in README.md

## v.2.2.2 (Mar 11, 2019)

-   Use of travis ci to automate build and deploy
-   Added badge for travis build in README.md

## v.2.2.1 (Mar 10, 2019)

-   Added badge for npm downloads in README.md

## v.2.2.0 (Mar 10, 2019)

-   Filtering from multiple fields redesigned

## v.2.1.10 (Mar 10, 2019)

-   NPM updated
-   FIX: creation of users were not saving data that validator was asking

## v.2.1.9 (Mar 9, 2019)

-   NPM run lint added

## v.2.1.8 (Mar 9, 2019)

-   New implementation for query on cities and users
-   More data on seeding
-   NPM updated

## v.2.1.7 (Mar 4, 2019)

-   More tests added

## v.2.1.6 (Mar 4, 2019)

-   Better testing

## v.2.1.5 (Mar 4, 2019)

-   Istambul nyc code coverage added

## v.2.1.4 (Mar 4, 2019)

-   Verification added only in tests responses at registration and forgot password
-   NPM updated
-   FIXED: User creation locale param was missing

## v.2.1.3 (Mar 2, 2019)

-   Verification removed from responses at registration and forgot password (They were being used for testing and somehow made it here)

## v.2.1.2 (Mar 2, 2019)

-   FEATURE: Install nodemon in devDependencies [#9](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/9)
-   Typos
-   README.md updated

## v.2.1.1 (Feb 27, 2019)

-   README.md updated

## v.2.1.0 (Feb 27, 2019)

-   i18n added for registration email and forgot password email
-   Typos

## v.2.0.1 (Feb 27, 2019)

-   Error response regression
-   NPM updated

## v.2.0.0 (Feb 24, 2019)

-   Breaking changes for success and error responses
-   Added new endpoint in /profile/changePassword
-   Fixes in tests
-   Fixes in validations
-   NPM updated

## v.1.2.12 (Feb 18, 2019)

-   NPM updated
-   CHANGELOG fixes
-   Typos

## v.1.2.11 (Feb 11, 2019)

-   NPM updated
-   Removed pm2 from start script in package.json
-   server.js now inits redis stuff only in production

## v.1.2.10 (Feb 9, 2019)

-   package.json updated

## v.1.2.9 (Feb 9, 2019)

-   CHANGELOG updated

## v.1.2.8 (Feb 9, 2019)

-   NPM updated

## v.1.2.7 (Dec 4, 2018)

-   FIXED: Error message standarization [#6](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/6)
-   Role property is returned in profile

## v.1.2.6 (Dec 1, 2018)

-   FIXED: Password length validation in profile [#5](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/5)
-   Role property is returned in profile

## v.1.2.5 (Dec 1, 2018)

-   Comments

## v.1.2.4 (Dec 1, 2018)

-   FIXED: Not standardized response on error [#4](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/4)
-   NPM updated

## v.1.2.3 (Nov 28, 2018)

-   FIXED: Password not encrypted when updating in profile [#3](https://github.com/davellanedam/node-express-mongodb-jwt-rest-api-skeleton/issues/3)
-   NPM updated

## v.1.2.2 (Nov 8, 2018)

-   NPM updated

## v.1.2.1 (Nov 5, 2018)

-   Cache API responses only in production mode

## v.1.2.0 (Nov 5, 2018)

-   Use of REDIS to cache API responses
-   NPM updated

## v.1.1.3 (Oct 24, 2018)

-   Seeding Fix due to changes on new mongo-seeding package

## v.1.1.2 (Oct 23, 2018)

-   NPM updated

## v.1.1.1 (Sep 28, 2018)

-   Clean and Seed with async/await
-   Fixes

## v.1.0.1 (Sep 21, 2018)

-   Added keywords to package.json

## v.1.0.0 (Sep 20, 2018)

-   First stable release
