import fs from "fs";
import postcss from "postcss";
import chai, {expect} from "chai";
import chaiAsPromised from "chai-as-promised";

import ornithopter, {createComposedProperty} from "postcss-ornithopter";

chai.use(chaiAsPromised);

const processor = postcss([ornithopter]);

describe("postcss-ornithopter", function () {
  describe("scratchpad", function () {
    ["linear-color"].forEach(refname => {
      it(`should transpile ${refname}`, function (done) {
        const from = `tests/reference/postcss/${refname}.postcss.css`;
        const to = `tests/reference/postcss/${refname}.css`;

        const input = fs.readFileSync(from, "utf-8");
        const output = fs.readFileSync(to, "utf-8");

        expect(processor.process(input, {from, to})
                        .then(result => result.css)).to.eventually
                                                    .eq(output)
                                                    .notify(done);
      });
    });
  });

  it("should create the composed property data structure", function () {
    expect(createComposedProperty({prop: 'color',
                                   value: 'red green'})).to.deep
                                                        .equal(['color',
                                                                ['red', 'green']]);
  });
});
