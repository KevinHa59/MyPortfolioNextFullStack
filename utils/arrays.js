import _ from "lodash";

class ArrayUtils {
  groupByKey(data, key) {
    let copy = _.cloneDeep(data);
    copy = copy.sort((a, b) =>
      a[key]?.toLowerCase().localeCompare(b[key]?.toLowerCase())
    );
    const result = copy.reduce((res, cur) => {
      let _key = cur[key];
      if (_key === null) _key = "ungrouped";
      if (res[_key] === undefined) {
        res[_key] = [];
      }
      res[_key].push(cur);
      return res;
    }, {});

    return result;
  }
  UniqueKey(data, key) {
    const copy = _.cloneDeep(data);
    const res = [...new Set(copy.map((item) => item[key]))];
    return res;
  }
}

export default new ArrayUtils();
