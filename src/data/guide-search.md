# Add search to Gridsome

To add search functionality to your Gridsome project, you can use the [FlexSearch plugin](/plugins/gridsome-plugin-flexsearch):

```
npm i gridsome-plugin-flexsearch

# or

# yarn add gridsome-plugin-flexsearch
```

Then add the search plugin to your `gridsome.config.js` configuration file, at the root of your project:

```js
// gridsome.config.js

module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-flexsearch',
      options: {
        searchFields: ['title', 'description'],
        collections: [
          {
            typeName: 'Post',
            indexName: 'Post',
            fields: ['title', 'date', 'path']
          }
        ]
      }
    }
  ]
}
```

In the example above, the search plugin has been configured to index (allow searching of) the `title` and `description` fields of all items in the `Posts` collection, and to return the `title`,  `date` and `path` fields in our search results.

Once the plugin has been configured, you can use the provided mixin to offer search functionality for your site. One of the easiest ways of doing this is to create a search component:

```vue
<!-- /src/components/Search.vue -->
<template>
  <Fixed>
    <input id="search" v-model="searchTerm" class="input" type="text" placeholder="Search">
    <g-link v-for="result in searchResults" :key="result.id" :to="result.path" class="navbar-item">
      {{result.title}}
    </g-link>
  </Fixed>
</template>

<script>
  import Search from 'gridsome-plugin-flexsearch/SearchMixin';
  export default {
    mixins: [Search],
    data: () => ({
      searchTerm: '',
      items: [],
      focus: false,
    }),
  };
</script>
```

This component, if for example saved to `/src/components/Search.vue`, can then be loaded in the layout file for your website (e.g. `/src/layouts/Default.vue`):

```vue
<!-- /src/layouts/Default.vue -->

<template>
  <header>
    <search style="float: right;" />
    <h1><g-link to="/">{{$static.metadata.siteName}}</g-link></h1>
  </header>
  <section>
    <slot />
  </section>
  <footer>
    Copyright &copy; 2020
  </footer>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>

<script>
  import Search from '@/components/Search.vue';
  export default {
    components: {Search, SiteMenu},
    props: ['title'],
  }
</script>

```

For more details of how FlexSearch works, check out the [plugin page](/plugins/gridsome-plugin-flexsearch) on this site.
