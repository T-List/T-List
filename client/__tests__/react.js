/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime'; //allows async usage
import { expect, jest } from '@jest/globals';
import CreateReview from '../components/CreateReview';
import Login from '../components/login';
import Sidebar from '../components/Sidebar';
import ReviewCard from '../components/ReviewCard';
import Marker from '../components/Marker';
import MapComponent from '../components/MapComponent';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// //mock server via msw - unable to test fetch requests because node-fetch import issues (would have to convert main code to axios)
// const server = setupServer(

//   rest.get('/api/1', (req, res, ctx) => {
//     //mocking market location fetch
//     // respond using a mocked JSON body // 3 reviews
//     return res(
//       ctx.json([
//         {
//           cost: '$$',
//           location_id: '1',
//           rating: 2,
//           review: 'test',
//           service_type: 'test',
//           _id: 1,
//         },
//         {
//           cost: '$',
//           location_id: '1',
//           rating: 1,
//           review:
//             'this is the second review of a location with the same name and coordinates',
//           service_type: 'second review',
//           _id: 2,
//         },
//         {
//           cost: '$',
//           location_id: '1',
//           rating: 1,
//           review: 'this is the third review of a location',
//           service_type: 'test',
//           _id: 4,
//         },
//       ])
//     );
//   }),
//   // mocking review post
//   // respond using a mocked JSON body // 3 reviews
//   rest.get(
//     '/api/postReview',
//     (req, res, ctx) => {
//       return res(ctx.status(500)); //server error...does it get handled
//     }

//     rest.get('/api', (req, res, ctx) => {
//       return res(ctx.json([
//         {
//           address: null,
//           clinic: "test",
//           contact: null,
//           latitude: "40.74079131604672",
//           longitude: "-73.98551144643555",
//           _id: 1
//       }
//       ]));
//     })
//   )
// );

// // establish API mocking before all tests
// beforeAll(() => server.listen());
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers());
// // clean up once the tests are done
// afterAll(() => server.close());

describe('Unit testing react components', () => {
  describe('CreateReview', () => {
    let review;

    test('Structure: five input boxes (including text area)', async () => {
      review = render(<CreateReview />);
      const inputs = await screen.findAllByRole('textbox');
      expect(inputs.length).toBe(5);
      expect(review.getByText('Clinic:')).toBeTruthy();
      expect(review.getByText('Type of Service:')).toBeTruthy();
      expect(review.getByText('Cost:')).toBeTruthy();
      expect(review.getByText('Rating:')).toBeTruthy();
      expect(review.getByText('Review:')).toBeTruthy();
      // screen.debug();
    });

    // test('Handles server error on submit', async () => { //unable to test due to node-fetch issue
    //   const coords = [
    //     [
    //       '40.733637485309764', //long
    //       '-73.98585476918946',
    //     ], //lat
    //     7, //id
    //   ];
    //   review = render(<CreateReview coords={coords} />);

    // const user = userEvent.setup();
    // const submitButton = review.getByText('Submit Review');
    // await user.pointer({
    //   keys: '[MouseLeft][/MouseLeft]', //press and release left click
    //   target: submitButton,
    // });
    //would want to stest that error is handled sent back from msw

    // });
  });

  describe('Login', () => {
    let login;
    beforeEach(() => {
      login = render(<Login />);
    });

    test('Structure: 1 text input box, 1 pw input box, and 3 buttons', async () => {
      // screen.debug();
      const buttons = await screen.findAllByRole('button');
      expect(login.getByText('Login')).toBeTruthy();
      expect(login.getByText('Return to Main Page')).toBeTruthy();
      expect(login.getByText('Log Out')).toBeTruthy();
      expect(login.getByPlaceholderText('username')).toBeTruthy();
      expect(login.getByPlaceholderText('password')).toBeTruthy(); //input type password has no corresponding Aria role
      expect(buttons.length).toBe(3);
    });

    // test.only('Calling state changes when user inputting values to text boxes', async () => {
    //   // const user = userEvent.setup();
    //   const targetFunc = jest.fn();
    //   const userInput = await screen.getByPlaceholderText('username');
    //   const passwordInput = await screen.getByPlaceholderText('password');
    //   userInput.setAttribute('onChange', targetFunc);
    //   passwordInput.setAttribute('onChange', targetFunc);
    //   await userEvent.type(userInput, 'javascript');
    //   await userEvent.type(passwordInput, 'javascript');
    //   expect(targetFunc).toHaveBeenCalledTimes(10); //is state updating on each stroke?
    // });
  });

  describe('Sidebar', () => {
    let sidebar;
    const props = [
      {
        cost: '$',
        location_id: '1',
        rating: '✩',
        review: 'terrible',
        service_type: 'test2',
        _id: 1,
      },
      {
        cost: '$$$',
        location_id: '2',
        rating: '✩✩✩',
        review: 'awesome',
        service_type: 'test4',
        _id: 2,
      },
    ];

    beforeEach(() => {
      sidebar = render(<Sidebar reviews={props} />);
    });

    test('Structure: review cards appropriately returned ', async () => {
      expect(sidebar.getAllByText('Rating:').length).toBe(2);
      expect(sidebar.getAllByText('Service Type:').length).toBe(2);
      expect(sidebar.getAllByText('Cost:').length).toBe(2);
      expect(sidebar.getAllByText('Review:').length).toBe(2);
      expect(sidebar.getAllByText('Rating:').length).toBe(2);
      expect(sidebar.getAllByText('$').length).toBe(1);
      expect(sidebar.getAllByText('$$$').length).toBe(1);
      expect(sidebar.getAllByText('terrible').length).toBe(1);
      expect(sidebar.getAllByText('awesome').length).toBe(1);
      expect(sidebar.getAllByText('test2').length).toBe(1);
      expect(sidebar.getAllByText('test4').length).toBe(1);
      // screen.debug();
    });
  });
});
