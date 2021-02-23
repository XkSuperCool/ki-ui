import { getCurrentInstance, ComponentInternalInstance } from 'vue';

/**
 * 获取对应 name 的父级
 * @param name
 * @param parent
 */
export default function findParentByName(name: string, parent?: ComponentInternalInstance | null): ComponentInternalInstance | null {
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
};
