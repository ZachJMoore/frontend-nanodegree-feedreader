/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //loop through the names and check if there is atleast 5 characters, ensuring it is not empty
        it("has names", function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name.length).toBeGreaterThan(4);
            }
        });

        //loop through the links to determine if the first characters match given array. Could also be used to make sure all links are using https instead of only http
        it("has links", function () {
            let httpArray = ("h t t p").split(" ");
            for (let i = 0; i < allFeeds.length; i++) {
                for (let e = 0; e < httpArray.length; e++) {
                    expect(allFeeds[i].url[e]).toBe(httpArray[e]);
                }
            }
        });
    });

    describe("The menu", function () {

        //checks to make sure the meny-hidden class is present on the body
        let body = document.querySelector("body");
        it("Is hidden by default", function () {
            expect(body.classList.toString()).toBe("menu-hidden");
        });

        //simulate a click to open the meny, then check to see if menu-hidden is gone
        it("Menu is able to show", function () {
            document.querySelector(".menu-icon-link").click();
            expect(body.classlist).toBeUndefined();
        });

        //simulate a click that closes the menu and then makes sure menu-hidden is placed back on the body element
        it("Menu is able to hide", function () {
            document.querySelector(".menu-icon-link").click();
            expect(body.classList.toString()).toBe("menu-hidden");
        });
    });

    describe("Initial Entries", function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
        it("loads items initally", function (done) {
            //check the grandchild of .feed and make sure it has a class of entry on it
            expect(document.querySelector(".feed").firstElementChild.firstElementChild.classList.toString()).toBe("entry");
            done();

        });
    });

    describe("New feed selection", function () {
        //scope placerholder
        let oldFeed;

        beforeEach(function (done) {
            //set oldFeed = to the current loaded feed html. Then load feed 1
            oldfeed = document.querySelector(".feed").innerHTML;
            loadFeed(1, function () {
                done();
            });
        });

        it("loads new items", function (done) {
            //checks whether the old feed html is not equal to the new on.
            expect(document.querySelector(".feed").innerHTML).not.toBe(oldfeed);
            done();

        });
    });

}());
