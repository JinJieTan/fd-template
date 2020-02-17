import App from '../src/routers/login';
import { mount, shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json'; //做快照
test('login test', async () => {
    console.log('App-mountComponent test function  begin ');

    const wrapper = shallow(<App Name="Peter Hello" changeShowContent={() => {}} />);
    // toJson(wrapper, {
    //     noKey: false,
    //     mode: 'deep',
    // });
    expect(wrapper).toMatchSnapshot()

    console.log('App-mountComponent test function  stop  --success ');
});
