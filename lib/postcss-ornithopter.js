import postcss from "postcss";

export default postcss.plugin("postcss-ornithopter", () => {
  return (root, result) => {
    root.walkAtRules("ornithopter", rule => {
      const {name} = rule;

      if (name === undefined) {
        throw rule.error("@ornithopter rules must have a name");
      }

      // TODO: Magic happens in keyframes()
      // root.prepend(keyframes);

      rule.remove();
    })
  }
});
