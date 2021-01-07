import { getCurrentInstance, ComponentInternalInstance } from 'vue';

/**
 * 获取对应 name 的父级
 * @param name
 * @param parent
 */
export default function useFindParent(name: string, parent?: ComponentInternalInstance | null): ComponentInternalInstance | null {
  const instance = parent ?? getCurrentInstance();
  if (instance !== null) {
    const parent = instance.parent;
    if (parent === null) {
      return null;
    }

    if (parent.type.name === name) {
      return parent;
    }
    return useFindParent(name, parent);
  }
  return null;
};
