---
title: "Search"
draft: false
---
{{< raw >}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.28/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/lunr.js"></script>
<script src="/js/lunr.stemmer.support.js"></script>
<script src="/js/tinyseg.js"></script>
<script src="/js/lunr.ja.js"></script>
<script src="/js/lunr.multi.js"></script>
<script src="/js/search.js"></script>

<div id="app">
  <mysearchbtn :search.sync="search"></mysearchbtn>
  <p>Number of results: {{list.length}}</p>
  <mylist :list="list"></mylist>
</div>

{{< /raw >}}
