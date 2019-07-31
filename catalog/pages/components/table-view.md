

``` react
state: {
  value: ''
}
---
<TableView
    items={data}
    filterBy={[ { label: 'Genre', 'dataKey': 'genre' }, { label: 'Rating', 'dataKey': 'rating' }]}
    columns={[ { label: 'Title', dataKey: 'title' }, { label: 'Genre', dataKey: 'genre' }, { label: 'Rating from 10', dataKey: 'rating' } ]}
/>
```