import React from 'react';
import ReactDOM from 'react-dom';

const App = ({ channels }) => (
  <div className="container">
    <div className="col-sm-4">
      <ul className="list-group">
        {channels.map(channel => <li key={channel.id} className="list-group-item">{channel.name}</li>)}
      </ul>
    </div>
  </div>
);

export default ({ channels }) => {
  ReactDOM.render(<App channels={channels} />, document.getElementById('chat'));
};
