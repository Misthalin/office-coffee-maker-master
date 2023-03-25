import { createConfirmation } from 'react-confirm';
import ConfirmDialog from './ConfirmDialog';

// create confirm function
export const confirm = createConfirmation(ConfirmDialog);

// This is optional. But wrapping function makes it easy to use.
export function confirmWrapper(confirmation, options = {}) {
  return confirm({ confirmation, options });
}