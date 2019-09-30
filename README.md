# d3-bullet v4

This is a horizontal progress bar allowing the comparison of several values brought to the
same scale (100%), for the needs of Compet Vet Suivi project.
See also https://github.com/mthh/d3-es6-rollup-boilerplate for the project structure.


## Installing

`npm install d3v4-progress`.

## API Reference

![The graph](sample.png?raw=true "Graph")

Data is composed from two objects: the results with a label and
the markers.

The values are between 0 and 1 only (percentage).

``
{
  "results": [
    {
      "label": "Connaissances",
      "value": 0.5
    },
    {
      "label": "Capacité",
      "value": 0.8
    }
  ],
  "markers": [
    {
      "label": "1",
      "value": 0.1,
      "active": false
    },
    {
      "label": "2",
      "value": 0.25,
      "active": false
    },
    {
      "label": "4",
      "value": 0.5,
      "active": true
    }
  ]
}
``
