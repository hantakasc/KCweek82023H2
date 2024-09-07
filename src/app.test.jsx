import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App Component', () => {
    // This will run before each test to make sure the App component is freshly rendered
  beforeEach(() => {
    render(<App />);
  });

  it('should render the Header component', () => {
     // Check if the header text "Hello Techtonica!" is rendered inside an <h1> element
    expect(screen.getByText((content, element) => 
      element.tagName.toLowerCase() === 'h1' && content.startsWith('Hello Techtonica!')
    )).toBeTruthy(); 

    // Check if the header text "This is a Gratitude List" is rendered inside an <h4> element
    expect(screen.getByText((content, element) => 
      element.tagName.toLowerCase() === 'h4' && content.startsWith('This is a Gratitude List')
    )).toBeTruthy(); 
  });

  it('should render items in the list', () => {
    // Define a new item text to be added
    const newItemText = 'Sample Item';
    fireEvent.change(screen.getByPlaceholderText(/Enter an item/i), { target: { value: newItemText } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText(newItemText)).toBeTruthy();
  });

  it('should add a new item when the form is submitted', () => {
    const newItemText = 'New Task';
    fireEvent.change(screen.getByPlaceholderText(/Enter an item/i), { target: { value: newItemText } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
    // Verify that the new item is rendered in the list
    expect(screen.getByText(newItemText)).toBeTruthy();
  });

  it('should not add an item if the input is empty', () => {
    // Simulate typing an empty string into the input field
    fireEvent.change(screen.getByPlaceholderText(/Enter an item/i), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Verify that no item with the text 'New Task' is added to the list
    expect(screen.queryByText(/New Task/i)).toBeNull();
  });

  it('should initialize with no non-empty items', () => {
     // Verify that no item with the text 'Empty Item' is present on initial render
    expect(screen.queryByText(/Empty Item/i)).toBeNull();
  });
});
