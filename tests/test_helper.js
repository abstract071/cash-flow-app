import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import createMemoryHistory from 'history/createMemoryHistory';
import TestUtils from 'react-dom/test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/app/reducers';

global.window = new jsdom.JSDOM('<!doctype html><html><body></body></html>').window;
global.document = global.window.document;

const $ = _$(window);

chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
        <MemoryRouter history={createMemoryHistory()}>
            <Provider store={createStore(reducers, state)}>
                <ComponentClass {...props} />
            </Provider>
        </MemoryRouter>
  );

  return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect };
