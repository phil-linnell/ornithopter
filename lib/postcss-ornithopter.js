import postcss from "postcss";
import {processMultiple} from "ornithopter";

export default postcss.plugin("postcss-ornithopter", () => {
  return (root, result) => {
    root.walkAtRules("ornithopter", ornirule => {
      const name = ornirule.params;
      const {nodes} = ornirule;

      if (name === undefined) {
        throw ornirule.error("@ornithopter rules must have a name");
      }

      const temp = nodes.map(createComposedProperty);
      const ruleSet = processMultiple(temp).map(toRule);
      const output = postcss.atRule({
        name: 'keyframes',
        params: name,
        nodes: ruleSet
      });

      root.prepend(output);
      ornirule.remove();
    })
  }
});

export function createComposedProperty({prop, value}) {
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
