# Ornithopter

Written by Phil Linnell (@phil-linnell) and Arnau Siches (@arnau).

Ornithopter is a [PostCSS](https://github.com/postcss/postcss) plugin that
allows you to describe and reason about animations in an expressive way.


## Syntax

This syntax follows [MDN Value definition syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/Value_definition_syntax).

* `<identifier>`: A name identifying the animation set.  Follows the same rules expected by a `@keyframes` identifier.
* `<property>`: Any valid CSS property.
* `<value>`: A valid CSS value for the given property. If the value is a function (e.g. `transform` functions,) use a `<composed-function`.
* `<transform-function`: Restricted set from [transform function](https://developer.mozilla.org/en-US/docs/Web/CSS/transform#Syntax).
* `<function-value>` : A valid value for the given function.

```
@ornithopter <identifier> {
  <animation-unit>+
}

where
<identifier>       = IDENT
<animation-unit>   = <property> : <composed-value> ;
<composed-value>   = [<value>+ || <composed-function>] <duration>? <delay>? <timing-function>?
<composed-function = [translate || translateX || translateY || scale ||
                      scaleX || scaleY || rotate || skew || skewX || skewY ||
                      translate3d || translateZ || scale3d || scaleZ ||
                      rotate3d || <rotateX || <rotateY || rotateZ ||
                      perspective] ( <functon-value> [, <function-value>]+ )
```



## Roadmap

* converge animation / css semantics.
* maintainable, readable, and quicker to write multiple animations within _keyframes_.
* create keyframes from combined cubic bezier functions.
* create postcss plugin.


## License

Ornithopter is licensed under MIT. Check the [full license](./LICENSE)
