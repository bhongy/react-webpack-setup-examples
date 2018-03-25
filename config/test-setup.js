const enzyme = require('enzyme');
const ReactAdapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new ReactAdapter() });
