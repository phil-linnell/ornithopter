import postcss from "postcss";
import {processMultiple} from "ornithopter";

export default postcss.plugin("postcss-ornithopter", () => {
  return (root, result) => {
    root.walkAtRules("ornithopter", rule => {
      const name = rule.params;
      const {nodes} = rule;

      if (name === undefined) {
        throw rule.error("@ornithopter rules must have a name");
      }

      const temp = nodes.map(createComposedProperty);

      console.dir(processMultiple(temp));

      // TODO: Magic happens in keyframes()
      // root.prepend(keyframes);

      rule.remove();
    })
  }
});

export function createComposedProperty(node) {
  const {prop, value} = node;
  const composedValue = value.split(' ');

  return [prop, composedValue];
};
