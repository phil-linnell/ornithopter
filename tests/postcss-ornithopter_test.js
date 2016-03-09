import fs from "fs";
import postcss from "postcss";
import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";

import ornithopter, {toComposedProperty} from "postcss-ornithopter";

chai.use(chaiAsPromised);

const processor = postcss([ornithopter]);

describe("postcss-ornithopter", function () {
  describe("scratchpad", function () {
    // ["linear-color-01"].forEach(refname => {
    //   it(`should transpile ${refname}`, function (done) {
    //     const from = `tests/reference/postcss/${refname}.postcss.css`;
    //     const to = `tests/reference/postcss/${refname}.css`;
    //
    //     const input = fs.readFileSync(from, "utf-8");
    //     const output = fs.readFileSync(to, "utf-8");
    //
    //     expect(processor.process(input, {from, to})
    //                     .then(result => result.css)).to.eventually
    //                                                 .eq(output)
    //                                                 .notify(done);
    //   });
    // });

      it(`should transpile linear-color-01`, function (done) {
        const from = `tests/reference/postcss/linear-color-01.postcss.css`;
        const to = `tests/reference/postcss/linear-color-01.css`;

        const input = fs.readFileSync(from, "utf-8");
        const output = "@keyframes animation-unit {0% {color: red\n}100% {color: green\n}\n}\n\ndiv {\n  animation: animation-unit 1s 1s infinite;\n}\n";

        expect(processor.process(input, {from, to})
                        .then(result => result.css)).to.eventually
                                                    .eq(output)
                                                    .notify(done);
      });
      it(`should transpile linear-multiple-01`, function (done) {
        const from = `tests/reference/postcss/linear-multiple-01.postcss.css`;
        const to = `tests/reference/postcss/linear-multiple-01.css`;

        const input = fs.readFileSync(from, "utf-8");
        const output = "@keyframes animation-unit {0% {color: red;transform: translateX(0)\n}100% {color: green;transform: translateX(100px)\n}\n}\n\ndiv {\n  animation: animation-unit 1s 1s infinite;\n}\n";

        expect(processor.process(input, {from, to})
                        .then(result => result.css)).to.eventually
                                                    .eq(output)
                                                    .notify(done);
      });
      it(`should transpile linear-transforms-02`, function (done) {
        const from = `tests/reference/postcss/linear-transforms-02.postcss.css`;
        const to = `tests/reference/postcss/linear-transforms-02.css`;

        const input = fs.readFileSync(from, "utf-8");
        const output = "@keyframes animation-unit {0% {transform: rotate(0deg)\n}100% {transform: rotate(360deg)\n}\n}\n\ndiv {\n  animation: animation-unit 1s 1s infinite;\n}\n";

        expect(processor.process(input, {from, to})
                        .then(result => result.css)).to.eventually
                                                    .eq(output)
                                                    .notify(done);
      });

  });

  it("should create the composed property data structure", function () {
    expect(toComposedProperty({prop: 'color',
                               value: 'red green'})).to.deep
                                                    .equal(['color',
                                                            ['red', 'green']]);
  });
});
