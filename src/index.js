import Gallery from 'components/Gallery'

import 'styles/index.scss'

const gallery = new Gallery({
  elem: '#app',
  keyword: 'pizza',
})

gallery.init()
