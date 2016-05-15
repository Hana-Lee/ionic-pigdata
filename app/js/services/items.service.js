/**
 * @author Hana Lee
 * @since 2016-05-14 23:47
 */

var dummy_items = [{
  id : 1,
  name : '영어 단어 외우기',
  data : [{
    type : 2,
    count : 10,
    time : 1460254605573 - 86400000 * 4
  }, {
    type : 2,
    count : 14,
    time : 1460254605573 - 86400000 * 3
  }, {
    type : 2,
    count : 11,
    time : 1460254605573 - 86400000 * 2
  }, {
    type : 2,
    count : 9,
    time : 1460254605573 - 86400000
  }, {
    type : 2,
    count : 13,
    time : 1460254605573
  }]
}, {
  id : 2,
  name : '영어 문장 외우기',
  data : [{
    type : 2,
    count : 10,
    time : 1460254605573 - 86400000 * 4
  }, {
    type : 2,
    count : 14,
    time : 1460254605573 - 86400000 * 3
  }, {
    type : 2,
    count : 11,
    time : 1460254605573 - 86400000 * 2
  }, {
    type : 2,
    count : 9,
    time : 1460254605573 - 86400000
  }, {
    type : 2,
    count : 13,
    time : 1460254605573
  }]
}, {
  id : 3,
  name : '커피 마시기',
  data : [{
    type : 2,
    count : 10,
    time : 1460254605573 - 86400000 * 4
  }, {
    type : 2,
    count : 14,
    time : 1460254605573 - 86400000 * 3
  }, {
    type : 2,
    count : 11,
    time : 1460254605573 - 86400000 * 2
  }, {
    type : 2,
    count : 9,
    time : 1460254605573 - 86400000
  }, {
    type : 2,
    count : 13,
    time : 1460254605573
  }]
}, {
  id : 4,
  name : '물 마시기',
  data : [{
    type : 2,
    count : 10,
    time : 1460254605573 - 86400000 * 4
  }, {
    type : 2,
    count : 14,
    time : 1460254605573 - 86400000 * 3
  }, {
    type : 2,
    count : 11,
    time : 1460254605573 - 86400000 * 2
  }, {
    type : 2,
    count : 9,
    time : 1460254605573 - 86400000
  }, {
    type : 2,
    count : 13,
    time : 1460254605573
  }]
}, {
  id : 5,
  name : '화장실 가기',
  data : [{
    type : 2,
    count : 10,
    time : 1460254605573 - 86400000 * 4
  }, {
    type : 2,
    count : 14,
    time : 1460254605573 - 86400000 * 3
  }, {
    type : 2,
    count : 11,
    time : 1460254605573 - 86400000 * 2
  }, {
    type : 2,
    count : 9,
    time : 1460254605573 - 86400000
  }, {
    type : 2,
    count : 13,
    time : 1460254605573
  }]
}];

export class ItemService {
  constructor() {
  }

  all() {
    return dummy_items;
  }

  update(item) {
  }

  delete(item) {
  }

  create(item) {
  }

  get(itemId) {
    for (var i = 0; i < dummy_items.length; i++) {
      if (dummy_items[i].id === parseInt(itemId, 10)) {
        return dummy_items[i];
      }
    }
    return null;
  }
}
