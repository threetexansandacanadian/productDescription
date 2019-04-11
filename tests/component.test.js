import Enzyme, {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ProdDesc from '../client/src/prodDesc.js';
import { doesNotReject } from 'assert';

Enzyme.configure({ adapter: new Adapter() });

const regeneratorRuntime = require("regenerator-runtime");

const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);

describe('Product description rendering', () => {
  let wrapper;

  beforeEach(() => {
    // async () => {
      wrapper = mount(<ProdDesc />);
    // //  ? await wrapper.instance().componentDidMount();
    // }

  })

  it('Should mount correctly', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('Should call componentDidMount', () => {
    const eyeSpy = jest.spyOn(ProdDesc.prototype, 'componentDidMount');
    wrapper = mount(<ProdDesc />);
    expect(eyeSpy).toHaveBeenCalled();
    eyeSpy.mockClear();
  })

  it('Should rerender when state is changed', () => {
    wrapper = mount(<ProdDesc />);
    wrapper.setState({currentProduct: {
      "_id": "5c9fa1b880b8c118ff22fb9f",
      "name": "Maple Syrup",
      "price": 10.25,
      "bulletOne": "Delicious Canadian Nectar",
      "bulletTwo": "Great with cereal",
      "bulletThree": "Getnly milked from the sturdiest of trees",
      "sellerName": "Quebec",
      "description": "This isn't aunt gemimas crap. The greatest thing since forever ago.",
      "productID": 1,
      "__v": 0
  }});
    
    expect(wrapper.contains(<h1>Maple Syrup</h1>)).toBe(true);
    expect(wrapper.contains(<h3>Quebec</h3>)).toBe(true);
    expect(wrapper.contains(<h3>$10.25</h3>)).toBe(true);
    expect(wrapper.contains(<li>Delicious Canadian Nectar</li>)).toBe(true);
    expect(wrapper.contains(<li>Great with cereal</li>)).toBe(true);
    expect(wrapper.contains(<li>Getnly milked from the sturdiest of trees</li>)).toBe(true);
    expect(wrapper.contains(<p>This isn't aunt gemimas crap. The greatest thing since forever ago.</p>));
  })


});
