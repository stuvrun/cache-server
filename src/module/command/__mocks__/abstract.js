/* globals jest */
const abstract = jest.genMockFromModule('../abstract');
const Record = require('../../../model/Record');
const DataStorage = require('../../DataStorage');
const exptime = Date.now() + (120 * 1000);

abstract.createRecord = (params) => {
  const record = new Record();
  record.flags = Number(params[0][2]);
  record.exptime = Number(params[0][3]);
  record.bytes = Number(params[0][4]);
  record.data = params[1];

  return record;
};

abstract._storage = new DataStorage();

const f01 = new Record();
f01.flags = 1;
f01.exptime = exptime;
f01.bytes = 3;
f01.data = 'f01';
abstract._storage.set('f01', f01);

const f02 = new Record();
f02.flags = 1;
f02.exptime = exptime;
f02.bytes = 3;
f02.data = 'f02';
abstract._storage.set('f02', f02);

const f03 = new Record();
f03.flags = 1;
f03.exptime = exptime;
f03.bytes = 3;
f03.data = 'f03';
abstract._storage.set('f03', f03);

const f04 = new Record();
f04.flags = 1;
f04.exptime = exptime;
f04.bytes = 3;
f04.data = 'f04';
abstract._storage.set('f04', f04);

module.exports = abstract;
