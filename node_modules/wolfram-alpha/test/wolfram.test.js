var  wolfram = require(process.env.WOLFRAM_COV ? '../wolfram-cov' : '../');

exports.maths = function (t) {
  var client = wolfram.createClient(process.env.WOLFRAM_APPID);

  client.query("integrate 2x", function (err, result) {
    t.equal(err, null, "no error");
    t.ok(Array.isArray(result), "result is an array");
    t.equal(result.length, 2, "with 2 result pods");
    t.equal(result[0].primary, true, "first pod should be primary");
    t.ok(Array.isArray(result[0].subpods), "subpods present");
    t.ok(result[0].subpods[0].text.indexOf('x^2+constant') >= 0, 'answer');
    t.ok(result[0].subpods[0].image, "image answer");
    t.done();
  });
};

exports.simple = function (t) {
  var client = wolfram.createClient(process.env.WOLFRAM_APPID);
  client.query("1+1", function (err, result) {
    t.equal(err, null, "no error");
    t.ok(Array.isArray(result), "result is an array");
    t.equal(result.length, 6, "with 6 result pods");
    t.ok(!result[0].primary, "first pod not primary");
    t.equal(result[0].subpods[0].text, '1+1', 'interpretation in pod 1');
    t.ok(result[1].primary, 'second pod primary');
    t.equal(result[1].subpods[0].text, '2', 'answer in pod 2');
    t.done();
  });
};

exports.noanswer = function (t) {
  var client = wolfram.createClient(process.env.WOLFRAM_APPID);
  client.query("adh89u8n0eudhdah", function (err, result) {
    t.ok(!err, "err should be null");
    t.ok(Array.isArray(result), "result is an array");
    t.equal(result.length, 0, 'but no pods found');
    t.done();
  });
};

exports.missingAppId = function(t) {
  var client = wolfram.createClient();

  client.query("integrate 2x", function (err, result) {
    t.ok(err, "error present");
    t.ok(/key not set/.test(err), "error contains reason");
    t.equals(result, null, "result should be null");
    t.done();
  });
};

exports.badAppId = function(t) {
  var client = wolfram.createClient("bogus-trololoo");

  client.query("integrate 2x", function (err, result) {
    t.equal(typeof err, "string", "error should be a string describing the message");
    t.ok(!result, "result should be null");
    t.done();
  });
};
