import { getCurrentInstance, ComponentInternalInstance } from 'vue';

/**
 * 获取对应 name 的父级
 * @param name
 * @param parent
 */
export function findParentByName(name: string, parent?: ComponentInternalInstance | null): ComponentInternalInstance | null {
  const instance = parent ?? getCurrentInstance();
  if (instance !== null) {
    let parent = instance.parent;
    if (parent === null) {
      return null;
    }
    while (parent) {
      if (parent.type.name === name) {
        return parent;
      }
      parent = parent.parent;
    }
  }
  return null;
}

interface TypeMap {
  '[object Boolean]'  : 'boolean',
  '[object Number]'   : 'number',
  '[object String]'   : 'string',
  '[object Function]' : 'function',
  '[object Array]'    : 'array',
  '[object Date]'     : 'date',
  '[object RegExp]'   : 'regExp',
  '[object Undefined]': 'undefined',
  '[object Null]'     : 'null',
  '[object Object]'   : 'object'
}

/**
 * 类型判断
 * @param obj
 */
export function typeOf(obj: unknown): TypeMap[keyof TypeMap] {
  const map: TypeMap = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  const type = Object.prototype.toString.call(obj)
  return map[type as keyof TypeMap];
}

/**
 * 深拷贝
 * @param obj 需要深拷贝的数据
 * @param keys 保留指定 key 的属性，其他的过滤掉，不指定该字段全部返回。
 */
export function deepClone(obj: any, keys?: string[]): any {
  const type = typeOf(obj);
  let result;
  if (type === 'object') {
    result = {};
  } else if (type === 'array') {
    result = [];
  } else {
    return obj;
  }

  if (type === 'array') {
    for (let i = 0, len = obj.length; i < len; i += 1) {
      (result as any[]).push(deepClone(obj[i], keys));
    }
  }
  if (type === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if ((keys && keys.includes(key)) || !keys) {
          (result as {[key: string]: any})[key] = deepClone(obj[key], keys);
        }
      }
    }
  }
  return result;
}
