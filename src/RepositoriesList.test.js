import React from 'react';
import ReactDOM from 'react-dom';
import RepositoriesList from './RepositoriesList';

const repositories = [{"name":"MPBSignatureViewController","full_name":"payworks/MPBSignatureViewController","stars":23,"language":"Objective-C","forks":7},{"name":"mpos-ui.ios.paybutton","full_name":"payworks/mpos-ui.ios.paybutton","stars":11,"language":"Objective-C","forks":4},{"name":"mpos-ui.android.paybutton","full_name":"payworks/mpos-ui.android.paybutton","stars":10,"language":"Java","forks":5},{"name":"tcp-mocker","full_name":"payworks/tcp-mocker","stars":9,"language":"Java","forks":2},{"name":"labs.ares.android","full_name":"payworks/labs.ares.android","stars":4,"language":"Java","forks":0},{"name":"labs.ares.webshop","full_name":"payworks/labs.ares.webshop","stars":3,"language":"JavaScript","forks":0},{"name":"kicker-field","full_name":"payworks/kicker-field","stars":3,"language":"JavaScript","forks":0},{"name":"slate","full_name":"payworks/slate","stars":0,"language":"JavaScript","forks":0}];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepositoriesList repositories={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders repositories list', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepositoriesList repositories={repositories}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
