var React = require('react');
import EntryBox from './entry-box';

export default function launch(containerId) {
  React.renderComponent(EntryBox(null), document.getElementById(containerId));
}
