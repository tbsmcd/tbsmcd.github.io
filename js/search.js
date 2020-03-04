Vue.component('mysearchbtn', {
	template:`<div>
    <input type="text" placeholder="type to search"
      v-model="search"
      @input="$emit('update:search', $event.target.value)" />
</div>`,
	props:['search']
})


Vue.component('mylist', {
	template:`<ul>
    <li v-for="item in list"><a v-bind:href="item.url">{{item.title}}</a></li>
</ul>`,
	props:['list']
})


new Vue({
	el:'#app',
	data(){
		return{
			original:[],
			list:[],
			search:'',
			resuls:[],
			searchIndex:null
		}
	},
	mounted(){
		axios.get('https://tbsmcd.net/index.json')
			.then(response => {
				this.original = response.data
				this.list = this.original
				this.buildIndex()
			})

		this.$watch('search', () => {
			this.resuls = this.searchIndex.search(`*${this.search}*`)

			this.list = []
			this.resuls.forEach(d => {
				this.original.forEach(p => {
					if(d.ref == p.id) this.list.push(p)
				})

			})
		})
	},
	methods:{
		buildIndex(){
			var documents = this.original
			this.searchIndex = lunr(function () {
				this.use(lunr.ja)
				this.ref('id')
				this.field('body')
				this.field('title')

				documents.forEach(doc => {
					this.add(doc)
				})
			})
		}
	}
})
