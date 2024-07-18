import { render, screen, within } from '@testing-library/react';
import { Actions } from './Actions';

describe('components', () => {
  describe('Actions', () => {
    const data = {
      actions: [
        'Action to perform!'
      ]
    };

    it('should render a list of the actions to perform, with checkboxes', () => {
      render(<Actions data={data} onUpdate={jest.fn} />);

      const actions = screen.getByTestId('actions') as HTMLElement;
      const listItems = actions.querySelectorAll('li');
      const checkbox = listItems[0].querySelector('button[role="checkbox"]');

      expect(listItems.length).toEqual(data.actions.length);
      expect(within(actions).getByText('Action to perform!')).toBeInTheDocument();
      expect(checkbox).toBeVisible();
    });
  });
});
