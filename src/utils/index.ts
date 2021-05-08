import {getCurrentInstance, createApp, ComponentPublicInstance, Component} from 'vue';
import type { ComponentInternalInstance } from 'vue';
import type { Props } from 'types/common';

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

/**
 * 将组件挂载到 body 上
 * @param component
 */
export function mountBody<T>(component: Component) {
  const container = document.createElement('div');
  const instance = createApp(component).mount(container) as ComponentPublicInstance & T;
  const message = instance.$el;
  document.body.appendChild(message);

  return instance;
}

const TypeMap = {
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

/**
 * 类型判断
 * @param obj
 */
export function typeOf(obj: unknown): typeof TypeMap[keyof typeof TypeMap] {
  const type = Object.prototype.toString.call(obj)
  return TypeMap[type as keyof typeof TypeMap];
}

/**
 * 深拷贝
 * @param obj 需要深拷贝的数据
 * @param keys 保留指定 key 的属性，其他的过滤掉，不指定该字段全部返回。
 * @param hook
 */
export function deepClone(obj: any, keys?: string[], hook?: (obj: any) => any): any {
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
      (result as any[]).push(deepClone(obj[i], keys, hook));
    }
  }
  if (type === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if ((keys && keys.includes(key)) || !keys) {
          (result as {[key: string]: any})[key] = deepClone(obj[key], keys, hook);
        }
      }
      if (hook && typeOf(hook) === 'function') {
        result = { ...result, ...hook(obj) };
      }
    }
  }
  return result;
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(fn: T, interval: number) {
  let prev = 0;
  return function(this: any, ...args: Props<typeof fn>) {
    const now = Date.now();
    const context = this;
    if (now - prev >= interval) {
      prev = now;
      fn.apply(context, args);
    }
  }
}

