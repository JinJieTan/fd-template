import App from '../src/routers/home';
import { mount } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json'; //做快照
test('login test', async () => {
    console.log('App-mountComponent test function  begin ');

    // const wrapper = mount(<App />);

    // expect(wrapper.find('.login_fade_in').children().length).toBe(8);

    console.log('App-mountComponent test function  stop  --success ');
});
