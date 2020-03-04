---
title: "Search"
draft: false
---
{{< raw >}}
<div id="app">
  <mysearchbtn :search.sync="search"></mysearchbtn>
  <p>Number of results: {{list.length}}</p>
  <mylist :list="list"></mylist>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
<script src="/js/lunr.js"></script>
<script src="/js/lunr.stemmer.support.js"></script>
<script src="/js/tinyseg.js"></script>
<script src="/js/lunr.ja.js"></script>
<script src="/js/search.js"></script>

{{< /raw >}}
