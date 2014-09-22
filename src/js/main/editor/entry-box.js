/** @jsx React.DOM */
var React = require('react');

var CommentBox = React.createClass({displayName: 'CommentBox',
  render: function() {
    return (
      React.DOM.div({className: "commentBox"}, 
        "Hello, world! I am an EntryBox."
      )
    );
  }
});

export default CommentBox;
