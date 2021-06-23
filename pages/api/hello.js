const _ = require('lodash');

export default (req, res) => {
  res.statusCode = 200;
  let c = _.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 });
  res.json({ name: JSON.stringify(c) });
}
