

``` react
state: {
  value: ''
}
---
<TableView
    items={data}
    filterBy={[ { 'label': 'Genre', 'dataKey': 'genre' }, { 'label': 'Rating', 'dataKey': 'rating' }]}
/>
```