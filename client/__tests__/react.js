/**
 * @jest-environment jsdom
 */

// Personal Notes: getByText takes in regular express for partial matches
// getByRole is used to select elemnts by aria role attributes: https://developer.mozilla.org/en-US/docs/web/accessibility/aria/attributes/aria-label
// getByLabelText: <label for="search" />
// getByPlaceholderText: <input placeholder="Search" />
// getByAltText: <img alt="profile" />
// getByDisplayValue: <input value="JavaScript" />

//Other search variants are queryBy and findBy
//All veriants can be extended by AllBy (e.g, getAllBy, queryAllBy, findAllBy) - this will return array of elements meeting search criteria
//getBy returns an element or an error....so if trying to assert absence of an element use queryBy
//    e.g., expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
//findBy is used to search for an element that isn't there yet but will be there after some async action completes (perhaps, a fetch request)
// see below
// describe('App', () => {
//   test('renders App component', async () => {
//     render(<App />);

//     expect(screen.queryByText(/Signed in as/)).toBeNull();

//     expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
//   });
// });
//Checking whether or not elements exist (assertive options: toBeNull, toBeInTheDocument
//many other assert options listed here about 65% down https://www.robinwieruch.de/react-testing-library/
//fireEvent (imported from testing-lib) function takes element and an event which has a value to simulate an event
//userEvent library should be used more often - user-event is a companion library for Testing Library that simulates
//user interactions by dispatching the events that would happen if the interaction took place in a browser.
import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import { expect, jest } from '@jest/globals';
// import App from '../../components/App';
import CreateReview from '../components/CreateReview';
import Login from '../components/login';
import MapComponent from '../components/MapComponent';
import Marker from '../components/Marker';

describe('Unit testing react components', () => {
  describe('CreateReview', () => {
    let review;
    beforeEach(() => {
      review = render(<CreateReview />);
    });

    test('Structure: Form should have five input boxes (including text area)', async () => {
      // render(<CreateReview />);
      const inputs = await screen.findAllByRole('textbox');
      expect(inputs.length).toBe(5);
      expect(review.getByText('Clinic:')).toBeTruthy();
      expect(review.getByText('Type of Service:')).toBeTruthy();
      expect(review.getByText('Cost:')).toBeTruthy();
      expect(review.getByText('Rating:')).toBeTruthy();
      expect(review.getByText('Review:')).toBeTruthy();
      // screen.debug();
    });

    test('Mock Form submit button fire event handles error', async () => {
      render(<CreateReview />);
      //The callback is internal to the component and you don't have access to it from the test.
      //Would want to use test database to test this.....
      //   const reqBody = {
      //     clinic: clinic,
      //     service_type: service_type,
      //     cost: cost,
      //     rating: Number(rating),
      //     review: review,
      //     latitude: String(coords[0][0]),
      //     longitude: String(coords[0][1]),
      //     location_id: coords[1],
      // }

      // const user = userEvent.setup();
      // const submitButton = review.getByText('Submit Review');
      // submitButton.onClick;
      // // console.log(submitButton);
      // screen.debug();

      // await user.pointer({
      //   keys: '[MouseLeft][/MouseLeft]', //press and release left click
      //   target: submitButton,
      // });
      // await userEvent.click(submitButton, { MouseLeft: true });

      //Would need to test that Google API changed...

      // await user.keyboard('[ShiftLeft>]') // Press Shift (without releasing it)
    });
    //Mock Form submit button fire event and received error request
    //Explore mocking and use cases
  });

  describe('Login', () => {
    let login;
    beforeEach(() => {
      login = render(<Login />);
    });

    test('Structure: 1 text input box, 1 pw input box, and 3 buttons', async () => {
      screen.debug();
      //input type password has no corresponding Aria role
      const buttons = await screen.findAllByRole('button');
      expect(login.getByText('Login')).toBeTruthy();
      expect(login.getByText('Return to Main Page')).toBeTruthy();
      expect(login.getByText('Log Out')).toBeTruthy();
      expect(login.getByPlaceholderText('username')).toBeTruthy();
      expect(login.getByPlaceholderText('password')).toBeTruthy();
      expect(buttons.length).toBe(3);

      // const reviewLabelTest = await screen.getByText('Review:');
      // screen.debug();
    });

    // test.only('Clicking "Return to Main Page" should redirect to Maps page', async () => {
    //   const user = userEvent.setup();
    //   const propsz = {
    //     turnOffSeekingAdmin: jest.fn(),
    //     turnAdminOn: jest.fn(),
    //     turnAdminOff: jest.fn(),
    //   };
    //   const returnButton = login.getByText(/Return/);
    //   console.log(returnButton);
    //   screen.debug();
    //   await user.pointer({
    //     keys: '[MouseLeft][/MouseLeft]', //press and release left click
    //     target: returnButton,
    //   });
    //   expect(propsz.turnOffSeekingAdmin).toHaveBeenCalledTimes(1);

    //   screen.debug();
    // });

    test('Calling state changes when user inputting values to text boxes', async () => {
      // const user = userEvent.setup();
      // const returnButton = login.getByText(/Return/);
      // console.log(returnButton);
      // screen.debug();
      // await user.pointer({
      //   keys: '[MouseLeft][/MouseLeft]', //press and release left click
      //   target: returnButton,
      // });
      // screen.debug();
      // const usernameInput =
      // const passwordInput =
    });
  });
});
