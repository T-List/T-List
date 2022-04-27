/**
 * @jest-environment jsdom
 */

import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

// import App from '../../components/App';
import CreateReview from '../components/CreateReview';
import MapComponent from '../components/MapComponent';
import Marker from '../components/Marker';

describe('Unit testing react components', () => {
  describe('CreateReview', () => {
    let review;
    beforeEach(() => {
      //Have to render beforeEach test
      review = render(<CreateReview />);
    });

    test('Form should have five input boxes (including text area)', async () => {
      // render(<CreateReview />);
      const inputs = await screen.findAllByRole('textbox');
      expect(inputs.length).toBe(5);
      // const reviewLabelTest = await screen.getByText('Review:');
      // screen.debug();
    });

    test('Form should display labels of Clinic, Type of Service, Cost, Rating, Review:', () => {
      expect(review.getByText('Clinic:')).toBeTruthy();
      expect(review.getByText('Type of Service:')).toBeTruthy();
      expect(review.getByText('Cost:')).toBeTruthy();
      expect(review.getByText('Rating:')).toBeTruthy();
      expect(review.getByText('Review:')).toBeTruthy();
    });
    test('Mock Form submit button fire event handles error', () => {});
    //Mock Form submit button fire event and received error request
    //Explore mocking and use cases
  });
});
