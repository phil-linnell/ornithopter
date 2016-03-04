import postcss from "postcss";
import {processMultiple} from "ornithopter";

export default postcss.plugin("postcss-ornithopter", () => {
  return (root, result) => {
    root.walkAtRules("ornithopter", ornirule => {
      const {params: name, nodes} = ornirule;

      if (name === undefined) {
        throw ornirule.error("@ornithopter rules must have a name");
      }

      const keyframeAtRule = postcss.atRule({
        name: 'keyframes',
        params: name,
        nodes: keyframes(nodes).map(toRule)
      });

      root.prepend(keyframeAtRule);
      ornirule.remove();
    })
  }
});

export function toComposedProperty({prop, value}) {
  const composedValue = postcss.list.space(value);
  return [prop, composedValue];
};

function toDecl({property, value}) {
  return postcss.decl({prop: property, value});
};

function toRule({step, properties}) {
  return postcss.rule({
    selector: `${step}%`,
    nodes: properties.map(toDecl)
  });
};

function keyframes(nodes) {
  return processMultiple(nodes.map(toComposedProperty));
};
