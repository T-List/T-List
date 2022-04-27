/**
 * @jest-environment jsdom
 */

//failed tests swallow console log but can see in successes

import React from 'React';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

// import App from '../../components/App';
import CreateReview from '../components/CreateReview';
import MapComponent from '../components/MapComponent';
import Marker from '../components/Marker';

describe('Unit testing react components', () => {
  describe('CreateReview', () => {
    test('Input boxes - 4 inputs and 1 text area', async () => {
      render(<CreateReview />);
      const inputs = await screen.findAllByRole('textbox');
      expect(inputs.length).toBe(5);
      // console.debug('ricky');
      // console.log(inputs.length);
      // screen.debug();
    });
  });
});
