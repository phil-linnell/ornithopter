import postcss from "postcss";
import {processMultiple} from "ornithopter";
import {parseTransformValue} from "utils/value";
import {isTime} from "utils/time";

export default postcss.plugin("postcss-ornithopter", () => {
  return (root, result) => {
    root.walkAtRules("ornithopter", ornirule => {
      const {params: name, nodes} = ornirule;

      if (name === undefined) {
        throw ornirule.error("@ornithopter rules must have a name");
      }

      let totalDuration = [];
      root.walkDecls("animation", decl => {
        const animationValue = postcss.list.space(decl.value);
        totalDuration.push(animationValue.find(values => isTime(values)));
      });

      const keyframeAtRule = postcss.atRule({
        name: 'keyframes',
        params: name,
        nodes: keyframes(nodes, totalDuration[0]).map(toRule)
      });

      root.prepend(keyframeAtRule);
      ornirule.remove();
    })
  }
});

export function toComposedProperty({prop, value}) {
  if (prop === 'transform') {
    return parseTransform(prop, value);
  }

  return {property: prop, value: postcss.list.space(value)};
};

function parseTransform(property, value) {
  const [fn, first, last] = parseTransformValue(value);

  return {property, value: [first, last], fn};
}

function toDecl({property, value}) {
  return postcss.decl({prop: property, value,
                       raws: {before: "\n    "}});
};

function toRule({step, properties}) {
  return postcss.rule({
    selector: `${step}%`,
    nodes: properties.map(toDecl),
    raws: {before: "\n  ", after: "\n  ", semicolon: true}
  });
};

function keyframes(nodes, totalDuration) {
  return processMultiple(nodes.map(toComposedProperty), totalDuration);
};
